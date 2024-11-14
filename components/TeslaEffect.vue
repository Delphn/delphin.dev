<template>
  <div class="tesla-effect-container">
    <canvas ref="canvas" class="tesla-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx = null
let animationFrame = null
let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
let lastBoltTime = 0
const boltInterval = 80
let activeArcs = []

// Refined lightning parameters
const maxArcs = 2
const segmentLength = 10 // Shorter segments for more detail
const branchProbability = 0.4 // Increased branch probability
const maxBranchDepth = 4 // More branch levels
const arcLifetime = 600 // Longer lifetime for better visibility
const maxBranchAngle = Math.PI / 3 // Maximum branch angle

class Arc {
  constructor(startX, startY, endX, endY, depth = 0, lifetime = arcLifetime, parentAngle = null) {
    this.start = { x: startX, y: startY }
    this.end = { x: endX, y: endY }
    this.depth = depth
    this.lifetime = lifetime
    this.birth = performance.now()
    this.parentAngle = parentAngle
    this.points = this.generatePoints()
    this.branches = []
    this.generateBranches()
  }

  generatePoints() {
    const points = [this.start]
    const dx = this.end.x - this.start.x
    const dy = this.end.y - this.start.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const segments = Math.max(4, Math.floor(distance / segmentLength))
    const baseAngle = Math.atan2(dy, dx)
    
    let prevDeviation = 0
    
    for (let i = 1; i < segments; i++) {
      const ratio = i / segments
      const baseX = this.start.x + dx * ratio
      const baseY = this.start.y + dy * ratio
      
      // Create smooth deviation
      const maxOffset = Math.min(distance * 0.15, 30) / (this.depth + 1)
      const deviation = prevDeviation + (Math.random() - 0.5) * 0.5
      prevDeviation = deviation
      
      // Add upward bias and smooth curves
      const perpX = Math.cos(baseAngle + Math.PI/2)
      const perpY = Math.sin(baseAngle + Math.PI/2)
      
      points.push({
        x: baseX + perpX * deviation * maxOffset,
        y: baseY + perpY * deviation * maxOffset - (Math.random() * 5) // Slight upward bias
      })
    }
    
    points.push(this.end)
    return points
  }

  generateBranches() {
    if (this.depth >= maxBranchDepth) return

    const numBranches = Math.floor(Math.random() * 2) + 1
    const mainDirection = Math.atan2(
      this.end.y - this.start.y,
      this.end.x - this.start.x
    )

    for (let i = 1; i < this.points.length - 1; i++) {
      if (Math.random() < branchProbability / (this.depth + 1) && this.branches.length < numBranches) {
        const start = this.points[i]
        
        // Calculate branch angle relative to main direction
        const branchAngle = mainDirection + 
          (Math.random() * maxBranchAngle * (Math.random() < 0.5 ? 1 : -1))
        
        const length = segmentLength * (maxBranchDepth - this.depth) * (0.3 + Math.random() * 0.4)
        
        const endX = start.x + Math.cos(branchAngle) * length
        const endY = start.y + Math.sin(branchAngle) * length
        
        this.branches.push(new Arc(
          start.x, start.y,
          endX, endY,
          this.depth + 1,
          this.lifetime * 0.6,
          branchAngle
        ))
      }
    }
  }

  draw(ctx, time) {
    const age = time - this.birth
    if (age > this.lifetime) return false

    const alpha = Math.max(0, 1 - (age / this.lifetime))
    this.drawPath(ctx, alpha)
    
    this.branches.forEach(branch => branch.draw(ctx, time))
    return true
  }

  drawPath(ctx, alpha) {
    ctx.beginPath()
    ctx.moveTo(this.points[0].x, this.points[0].y)
    
    for (let i = 1; i < this.points.length; i++) {
      const point = this.points[i]
      const prev = this.points[i - 1]
      const xc = (prev.x + point.x) / 2
      const yc = (prev.y + point.y) / 2
      ctx.quadraticCurveTo(prev.x, prev.y, xc, yc)
    }

    // Thinner core with intense white center
    const gradient = ctx.createLinearGradient(
      this.start.x, this.start.y,
      this.end.x, this.end.y
    )
    gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
    gradient.addColorStop(0.1, `rgba(238, 130, 238, ${0.9 * alpha})`)
    gradient.addColorStop(0.5, `rgba(147, 51, 234, ${0.8 * alpha})`)
    gradient.addColorStop(1, `rgba(147, 51, 234, ${0.7 * alpha})`)
    
    // Main bolt - thinner
    ctx.strokeStyle = gradient
    ctx.lineWidth = 2 - this.depth * 0.3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()

    // Inner glow
    ctx.strokeStyle = `rgba(238, 130, 238, ${0.3 * alpha})`
    ctx.lineWidth = 4 - this.depth * 0.5
    ctx.stroke()
    
    // Outer glow
    ctx.strokeStyle = `rgba(147, 51, 234, ${0.15 * alpha})`
    ctx.lineWidth = 8 - this.depth * 0.7
    ctx.stroke()
  }
}

const init = () => {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d', { alpha: true })
  resizeCanvas()
  
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', resizeCanvas)
  
  animate()
}

const resizeCanvas = () => {
  if (!canvas.value || !ctx) return
  canvas.value.width = window.innerWidth * 2
  canvas.value.height = window.innerHeight * 2
  ctx.scale(2, 2)
}

const handleMouseMove = (e) => {
  mousePos = {
    x: e.clientX,
    y: e.clientY
  }
}

const createNewArc = () => {
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  
  // Start from behind the profile picture
  const startRadius = 60 // Reduced radius to start closer to center
  const startAngle = Math.random() * Math.PI * 2
  const startX = centerX + Math.cos(startAngle) * startRadius
  const startY = centerY + Math.sin(startAngle) * startRadius

  // End near the mouse with subtle variation
  const endX = mousePos.x + (Math.random() - 0.5) * 60
  const endY = mousePos.y + (Math.random() - 0.5) * 60

  return new Arc(startX, startY, endX, endY)
}

const animate = (timestamp) => {
  if (!ctx || !canvas.value) return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  
  // Enhanced base glow around the profile
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  
  ctx.globalCompositeOperation = 'screen'
  const baseGlow = ctx.createRadialGradient(
    centerX, centerY, 0,
    centerX, centerY, 200
  )
  baseGlow.addColorStop(0, 'rgba(147, 51, 234, 0.3)')
  baseGlow.addColorStop(0.5, 'rgba(147, 51, 234, 0.1)')
  baseGlow.addColorStop(1, 'rgba(147, 51, 234, 0)')
  
  ctx.fillStyle = baseGlow
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  if (timestamp - lastBoltTime > boltInterval && activeArcs.length < maxArcs) {
    activeArcs.push(createNewArc())
    lastBoltTime = timestamp
  }

  activeArcs = activeArcs.filter(arc => arc.draw(ctx, timestamp))
  
  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
.tesla-effect-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.tesla-canvas {
  width: 100%;
  height: 100%;
}
</style>