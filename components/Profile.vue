<template>
  <div class="profile-container">
    <div class="ambient-glow"></div>
    <div ref="container" class="model-container">
      <!-- Loading state -->
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <div class="loading-text">Initializing Model...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const container = ref(null)
const isLoading = ref(true)
let scene, camera, renderer, mesh, controls
let animationFrameId

const init = () => {
  // Scene setup
  scene = new THREE.Scene()
  
  // Camera setup
  camera = new THREE.PerspectiveCamera(
    45,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 4)
  
  // Renderer setup
  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
  })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  container.value.appendChild(renderer.domElement)
  
  // Enhanced lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  
  const mainLight = new THREE.DirectionalLight(0x9333ea, 2)
  mainLight.position.set(5, 5, 5)
  scene.add(mainLight)
  
  const purpleLight = new THREE.PointLight(0x9333ea, 2)
  purpleLight.position.set(-5, 3, 0)
  scene.add(purpleLight)
  
  // Create futuristic mesh
  createFuturisticMesh()
  
  // Controls setup
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enableZoom = false
  controls.autoRotate = true
  controls.autoRotateSpeed = 1.5
  controls.minPolarAngle = Math.PI / 3
  controls.maxPolarAngle = Math.PI / 1.8
  
  isLoading.value = false
  
  window.addEventListener('resize', onResize)
  animate()
}

const createFuturisticMesh = () => {
  // Create a complex geometry by combining multiple shapes
  const geometry = new THREE.IcosahedronGeometry(1, 1)
  
  // Add detail to the geometry
  const positionAttribute = geometry.attributes.position
  const vertices = []
  
  for (let i = 0; i < positionAttribute.count; i++) {
    const vertex = new THREE.Vector3()
    vertex.fromBufferAttribute(positionAttribute, i)
    
    // Add some noise to vertices
    const noise = 0.2 * Math.sin(vertex.x * 5) * Math.cos(vertex.y * 5)
    vertex.multiplyScalar(1 + noise)
    
    vertices.push(vertex.x, vertex.y, vertex.z)
  }
  
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  
  // Create wireframe geometry
  const wireframe = new THREE.WireframeGeometry(geometry)
  const wireMaterial = new THREE.LineBasicMaterial({
    color: 0x9333ea,
    transparent: true,
    opacity: 0.3
  })
  const wireframeMesh = new THREE.LineSegments(wireframe, wireMaterial)
  scene.add(wireframeMesh)
  
  // Create main mesh with custom shader material
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(0x9333ea) }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        float pulse = sin(time * 2.0) * 0.5 + 0.5;
        float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
        vec3 glow = color * (fresnel * pulse);
        gl_FragColor = vec4(glow, 0.3);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  })
  
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}

const animate = (time) => {
  animationFrameId = requestAnimationFrame(animate)
  
  if (mesh?.material.uniforms) {
    mesh.material.uniforms.time.value = time * 0.001
  }
  
  if (controls) {
    controls.update()
  }
  
  renderer.render(scene, camera)
}

const onResize = () => {
  if (!container.value || !camera || !renderer) return
  
  camera.aspect = container.value.clientWidth / container.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  
  if (renderer) {
    renderer.dispose()
  }
  
  if (controls) {
    controls.dispose()
  }
  
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.profile-container {
  width: min(100%, 400px);
  aspect-ratio: 1;
  margin: 0 auto;
}

.model-container {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 10;
}

.ambient-glow {
  position: absolute;
  inset: -40px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(147, 51, 234, 0.3) 0%,
    rgba(147, 51, 234, 0.2) 40%,
    rgba(147, 51, 234, 0.1) 60%,
    transparent 100%
  );
  filter: blur(30px);
  opacity: 0.8;
  pointer-events: none;
}

.loading-state {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(147, 51, 234, 0.1);
  border-top-color: rgba(147, 51, 234, 0.8);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 1rem;
  font-family: monospace;
  color: rgba(147, 51, 234, 0.8);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Mobile responsiveness fixes */
@media (max-width: 879px) {
  .profile-container {
    width: min(100%, 300px);
  }
}
</style>