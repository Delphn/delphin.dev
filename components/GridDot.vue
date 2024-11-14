<template>
  <div 
    class="grid-dot"
    :style="{
      left: `${position.x}px`,
      top: `${position.y}px`,
      opacity: isVisible ? 1 : 0,
      transform: `translate(${transition.x}px, ${transition.y}px)`
    }"
  >
    <div class="dot-inner"></div>
    <div class="dot-outer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const position = ref({ x: 0, y: 0 })
const transition = ref({ x: 0, y: 0 })
const isVisible = ref(false)
let timer

const BREATH_CYCLE = 16000 // 6s inhale + 4s hold + 6s exhale
const SAFE_DISTANCE = 200 // Minimum distance from center
const GRID_SIZE = 50

const isValidPosition = (x, y) => {
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2 + window.scrollY
  const distance = Math.sqrt(
    Math.pow(x - centerX, 2) + 
    Math.pow(y - (centerY - window.scrollY), 2)
  )
  return distance > SAFE_DISTANCE
}

const getNewPosition = () => {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const scrollY = window.scrollY
  
  // Calculate grid boundaries within current viewport
  const maxX = Math.floor(viewportWidth / GRID_SIZE) * GRID_SIZE
  const maxY = Math.floor(viewportHeight / GRID_SIZE) * GRID_SIZE
  
  let newX, newY
  do {
    newX = Math.floor(Math.random() * maxX / GRID_SIZE) * GRID_SIZE
    newY = Math.floor(Math.random() * maxY / GRID_SIZE) * GRID_SIZE + scrollY
  } while (!isValidPosition(newX, newY))
  
  return { x: newX, y: newY }
}

const updatePosition = () => {
  // Store old position
  const oldX = position.value.x
  const oldY = position.value.y
  
  // Get new valid position
  const newPos = getNewPosition()
  position.value = newPos
  
  // Reset transition
  transition.value = { 
    x: oldX - newPos.x, 
    y: oldY - newPos.y 
  }
  
  // Trigger smooth transition
  requestAnimationFrame(() => {
    transition.value = { x: 0, y: 0 }
  })
  
  isVisible.value = true
  
  // Complete one full breath cycle before fading
  setTimeout(() => {
    isVisible.value = false
  }, BREATH_CYCLE - 1000)
}

onMounted(() => {
  updatePosition()
  timer = setInterval(updatePosition, BREATH_CYCLE)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.grid-dot {
  position: absolute;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  pointer-events: none;
  transition: opacity 2s ease, transform 2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.dot-inner {
  position: absolute;
  inset: 50px;
  background: rgba(147, 51, 234, 0.3);
  border-radius: 50%;
  filter: blur(8px);
  animation: breatheCycle 16s ease-in-out infinite;
}

.dot-outer {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(147, 51, 234, 0.2) 0%,
    rgba(147, 51, 234, 0.1) 30%,
    rgba(147, 51, 234, 0.05) 60%,
    transparent 100%
  );
  animation: breatheCycle 16s ease-in-out infinite;
  transform-origin: center;
  transform: scale(1.2);
}

@keyframes breatheCycle {
  /* Inhale - 6 seconds */
  0% {
    transform: scale(0.8);
    opacity: 0.2;
  }
  37.5% { /* 6/16 seconds */
    transform: scale(1.3);
    opacity: 0.6;
  }
  
  /* Hold - 4 seconds */
  37.5%, 62.5% { /* (6/16) to (10/16) seconds */
    transform: scale(1.3);
    opacity: 0.6;
  }
  
  /* Exhale - 6 seconds */
  62.5% {
    transform: scale(1.3);
    opacity: 0.6;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.2;
  }
}
</style>