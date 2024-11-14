<template>
  <nav class="fixed top-0 left-0 w-full z-50 px-6 py-4 transition-transform duration-300"
       :class="{ '-translate-y-full': !isVisible && !isMenuOpen && !isHashNavigation }">
    <div class="max-w-7xl mx-auto">
      <div class="backdrop-blur-sm bg-black/10 rounded-2xl border border-purple-500/20 p-2">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <NuxtLink to="/" class="quantum-text text-2xl font-bold" @click="handleLogoClick">
            DR_<span class="text-purple-400">@void</span>
          </NuxtLink>

          <!-- Navigation Links and Theme Toggle -->
          <div class="hidden min-[880px]:flex items-center space-x-1">
            <template v-for="link in navLinks" :key="link.href">
              <NuxtLink v-if="link.internal"
                        :to="{ path: link.path, hash: link.hash }" 
                        class="nav-link px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300"
                        :class="[
                          isDark ? 
                            'text-purple-300 hover:bg-purple-400/10' : 
                            'text-purple-700 hover:bg-purple-400/10'
                        ]"
                        @click="handleNavClick">
                {{ link.label }}
              </NuxtLink>
              <a v-else
                 :href="link.href" 
                 class="nav-link px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300"
                 :class="[
                   isDark ? 
                     'text-purple-300 hover:bg-purple-400/10' : 
                     'text-purple-700 hover:bg-purple-400/10'
                 ]">
                {{ link.label }}
              </a>
            </template>

            <!-- Theme Toggle -->
            <button @click="toggleTheme"
                    class="quantum-button ml-2 p-2 rounded-lg transition-all duration-300"
                    :class="isDark ? 
                      'bg-purple-400/10 hover:bg-purple-400/20' : 
                      'bg-purple-50 hover:bg-purple-100'">
              <div class="w-5 h-5" :class="isDark ? 'text-purple-300' : 'text-purple-700'">
                <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="toggleMobileMenu"
                  class="min-[880px]:hidden quantum-button p-2 rounded-lg">
            <div class="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span class="block w-full h-0.5 bg-purple-400 transform transition-all duration-300"
                    :class="{ 'rotate-45 translate-y-2': isMenuOpen }"></span>
              <span class="block w-full h-0.5 bg-purple-400 transition-opacity duration-300"
                    :class="{ 'opacity-0': isMenuOpen }"></span>
              <span class="block w-full h-0.5 bg-purple-400 transform transition-all duration-300"
                    :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"></span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen"
         class="min-[880px]:hidden fixed inset-0 top-20 z-40 backdrop-blur-md bg-black/20"
         @click="closeMobileMenu">
      <div class="max-w-7xl mx-auto p-4">
        <div class="bg-black/30 rounded-2xl border border-purple-500/20 p-4">
          <div class="space-y-2">
            <template v-for="link in navLinks" :key="link.href">
              <NuxtLink v-if="link.internal"
                        :to="{ path: link.path, hash: link.hash }" 
                        class="block px-4 py-3 rounded-lg font-mono text-sm transition-all duration-300"
                        :class="isDark ? 'text-purple-300 hover:bg-purple-400/10' : 'text-purple-700 hover:bg-purple-400/10'"
                        @click="handleNavClick">
                {{ link.label }}
              </NuxtLink>
              <a v-else
                 :href="link.href"
                 class="block px-4 py-3 rounded-lg font-mono text-sm transition-all duration-300"
                 :class="isDark ? 'text-purple-300 hover:bg-purple-400/10' : 'text-purple-700 hover:bg-purple-400/10'">
                {{ link.label }}
              </a>
            </template>
            
            <!-- Mobile Theme Toggle -->
            <button @click="toggleTheme"
                    class="w-full flex items-center px-4 py-3 rounded-lg font-mono text-sm transition-all duration-300"
                    :class="isDark ? 'text-purple-300 hover:bg-purple-400/10' : 'text-purple-700 hover:bg-purple-400/10'">
              <span class="mr-2">{{ isDark ? 'LIGHT_MODE()' : 'DARK_MODE()' }}</span>
              <div class="w-5 h-5" :class="isDark ? 'text-purple-300' : 'text-purple-700'">
                <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { isDark, toggleTheme } = useTheme()
const isMenuOpen = ref(false)
const isVisible = ref(true)
const lastScrollY = ref(0)
const isHashNavigation = ref(false)
let scrollTimeout = null

const navLinks = [
  { label: 'EXPERIENCE()', path: '/', hash: '#experience', internal: true },
  { label: 'SKILLS()', path: '/', hash: '#skills', internal: true },
  { label: 'PROJECTS()', path: '/', hash: '#projects', internal: true },
  { label: 'CONTACT()', path: '/', hash: '#contact', internal: true },
  { label: 'BOOKS()', path: '/books', hash: '', internal: true },
  { label: 'BLOG()', path: '/blog', hash: '', internal: true }
]

// Reset navigation state on route change
watch(() => route.path, () => {
  resetNavigationState()
})

// Watch for hash changes to detect hash navigation
watch(() => route.hash, (newHash) => {
  if (newHash) {
    isHashNavigation.value = true
    // Reset after animation completes
    setTimeout(() => {
      isHashNavigation.value = false
    }, 1000)
  }
})

const resetNavigationState = () => {
  isVisible.value = true
  isMenuOpen.value = false
  isHashNavigation.value = false
  lastScrollY.value = window.scrollY
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
    scrollTimeout = null
  }
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  // Only hide menu after scrolling past threshold
  if (currentScrollY > 200) {
    isVisible.value = currentScrollY < lastScrollY.value
  } else {
    isVisible.value = true
  }

  lastScrollY.value = currentScrollY
}

const handleNavClick = () => {
  closeMobileMenu()
  resetNavigationState()
}

const handleLogoClick = () => {
  resetNavigationState()
}

const toggleMobileMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    isVisible.value = true
  }
}

const closeMobileMenu = () => {
  isMenuOpen.value = false
}

// Throttle scroll handler
let ticking = false
const onScroll = () => {
  if (!ticking && !isHashNavigation.value) {
    window.requestAnimationFrame(() => {
      handleScroll()
      ticking = false
    })
    ticking = true
  }
}

// Clean up function
const cleanup = () => {
  window.removeEventListener('scroll', onScroll)
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
}

onMounted(() => {
  lastScrollY.value = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  cleanup()
})
</script>

<style scoped>
.nav-link {
  position: relative;
  overflow: hidden;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 80%;
}

.quantum-button {
  position: relative;
  overflow: hidden;
}

.quantum-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(147, 51, 234, 0.2),
    transparent
  );
  transition: 0.5s;
}

.quantum-button:hover::before {
  left: 100%;
}
</style>