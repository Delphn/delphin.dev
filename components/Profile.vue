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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const container = ref(null)
const isLoading = ref(true)
let scene, camera, renderer, model, controls, mixer
let animationFrameId

const init = () => {
  scene = new THREE.Scene()
  
  camera = new THREE.PerspectiveCamera(
    45,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 1.5, 4)
  
  renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
  })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  container.value.appendChild(renderer.domElement)
  
  // Enhanced lighting setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  
  const mainLight = new THREE.DirectionalLight(0xffffff, 2)
  mainLight.position.set(5, 5, 5)
  scene.add(mainLight)
  
  const purpleLight = new THREE.PointLight(0x9333ea, 2)
  purpleLight.position.set(-5, 3, 0)
  scene.add(purpleLight)
  
  // Improved controls
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enableZoom = false
  controls.autoRotate = true
  controls.autoRotateSpeed = 1.5
  controls.minPolarAngle = Math.PI / 3
  controls.maxPolarAngle = Math.PI / 1.8
  
  // Load model - using a reliable public model
  const loader = new GLTFLoader()
  loader.load(
  //'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf',
   'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models/2.0/Avocado/glTF/Avocado.gltf',
    (gltf) => {
      model = gltf.scene
      
      // Center and scale model
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2 / maxDim
      model.scale.setScalar(scale)
      
      model.position.sub(center.multiplyScalar(scale))
      model.position.y -= 0.5
      
      scene.add(model)
      isLoading.value = false

      // Handle animations if present
      if (gltf.animations && gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model)
        const action = mixer.clipAction(gltf.animations[0])
        action.play()
      }
    },
    // Loading progress
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    // Error handling
    (error) => {
      console.error('Error loading model:', error)
      isLoading.value = false
    }
  )
  
  window.addEventListener('resize', onResize)
  animate()
}

const animate = () => {
  animationFrameId = requestAnimationFrame(animate)
  
  if (mixer) {
    mixer.update(0.016)
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
  position: relative;
  width: 400px;
  height: 400px;
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
</style>