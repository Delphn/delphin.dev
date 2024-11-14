<template>
  <section id="contact" class="py-20 relative overflow-hidden">
    <!-- Quantum field background -->
    <div class="absolute inset-0" :class="isDark ? 'bg-gray-900/90' : 'bg-gray-50/90'"></div>
    <div class="absolute inset-0 quantum-mesh"></div>
    
    <div class="max-w-5xl mx-auto px-4 relative z-10">
      <!-- Section header -->
      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r"
            :class="isDark ? 'from-emerald-400 via-teal-500 to-emerald-400' : 'from-emerald-600 via-teal-600 to-emerald-600'">
          Quantum Connect
        </h2>
        <p class="mt-4 text-lg" :class="isDark ? 'text-emerald-300' : 'text-emerald-700'">
          // Initializing communication protocols...
        </p>
      </div>

      <!-- Connection portals -->
      <div class="grid md:grid-cols-3 gap-8">
        <a v-for="portal in portals" :key="portal.name"
           :href="portal.link"
           target="_blank"
           class="portal-card group relative"
           @mousemove="handlePortalHover"
           @mouseleave="handlePortalLeave">
          <!-- Holographic container -->
          <div class="card-content relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 h-full"
               :class="isDark ? 
                 'bg-emerald-900/10 border-emerald-500/20 hover:border-emerald-500/40' : 
                 'bg-white/50 border-emerald-200 hover:border-emerald-300'">
            
            <!-- Portal frame -->
            <div class="absolute -inset-px rounded-2xl portal-frame"></div>

            <!-- Content -->
            <div class="relative z-10 flex flex-col items-center text-center space-y-4">
              <!-- Icon -->
              <div class="w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-300"
                   :class="isDark ? 
                     'bg-emerald-400/10 text-emerald-300' : 
                     'bg-emerald-50 text-emerald-700'">
                <component :is="portal.icon" class="w-8 h-8" />
              </div>

              <!-- Portal info -->
              <div class="space-y-2">
                <h3 class="text-xl font-bold"
                    :class="isDark ? 'text-emerald-300' : 'text-emerald-700'">
                  {{ portal.name }}
                </h3>
                <p class="text-sm" :class="isDark ? 'text-emerald-400' : 'text-emerald-600'">
                  {{ portal.description }}
                </p>
              </div>

              <!-- Connection status -->
              <div class="font-mono text-sm tracking-wider"
                   :class="isDark ? 'text-emerald-400' : 'text-emerald-600'">
                <span class="inline-block w-2 h-2 rounded-full animate-pulse mr-2 align-middle"
                      :class="isDark ? 'bg-emerald-400' : 'bg-emerald-600'"></span>
                READY_TO_CONNECT
              </div>
            </div>
          </div>
        </a>
      </div>

      <!-- Quick connect -->
      <div class="mt-16 text-center">
        <div class="inline-block p-4 rounded-xl backdrop-blur-sm border transition-all duration-300"
             :class="isDark ? 
               'bg-emerald-900/10 border-emerald-500/20' : 
               'bg-white/50 border-emerald-200'">
          <p class="font-mono text-sm"
             :class="isDark ? 'text-emerald-300' : 'text-emerald-700'">
            <span class="inline-block w-2 h-2 rounded-full animate-ping mr-2 align-middle"
                  :class="isDark ? 'bg-emerald-400' : 'bg-emerald-600'"></span>
            Available for new opportunities
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const { isDark } = useTheme()

const handlePortalHover = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * -5
  const rotateY = ((x - centerX) / centerX) * 5
  
  const content = card.querySelector('.card-content')
  content.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale3d(1.02, 1.02, 1.02)
  `
}

const handlePortalLeave = (e) => {
  const content = e.currentTarget.querySelector('.card-content')
  content.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
}

const portals = [
  {
    name: 'LinkedIn Nexus',
    description: 'Connect professionally and explore opportunities',
    link: 'https://linkedin.com/in/johndoe',
    icon: 'div',
  },
  {
    name: 'GitHub Matrix',
    description: 'Explore my code and contributions',
    link: 'https://github.com/johndoe',
    icon: 'div',
  },
  {
    name: 'Direct Transmission',
    description: 'john.doe@example.com',
    link: 'mailto:john.doe@example.com',
    icon: 'div',
  }
]
</script>

<style scoped>
.quantum-mesh {
  background-image: 
    linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
}

.portal-frame {
  background: linear-gradient(
    45deg,
    transparent,
    rgba(16, 185, 129, 0.2),
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portal-card:hover .portal-frame {
  opacity: 1;
}

.card-content {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
  will-change: transform;
}

@keyframes glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
</style>