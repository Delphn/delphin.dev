<template>
    <Transition name="fade">
      <button v-show="isVisible"
              @click="scrollToTop"
              class="fixed bottom-6 right-6 z-50 p-3 rounded-lg shadow-lg transition-all duration-300 backdrop-blur-sm border"
              :class="isDark ? 
                'bg-purple-400/10 hover:bg-purple-400/20 border-purple-500/30 text-purple-300' : 
                'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700'">
        <div class="w-5 h-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </button>
    </Transition>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  const { isDark } = useTheme()
  
  const isVisible = ref(false)
  const scrollThreshold = 500
  let ticking = false
  
  const checkScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        isVisible.value = window.scrollY > scrollThreshold
        ticking = false
      })
      ticking = true
    }
  }
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  onMounted(() => {
    window.addEventListener('scroll', checkScroll, { passive: true })
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll)
  })
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>