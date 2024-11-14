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
                <svg v-if="portal.name === 'LinkedIn Nexus'" class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <svg v-else-if="portal.name === 'GitHub Matrix'" class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <svg v-else-if="portal.name === 'Direct Transmission'" class="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
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
    link: 'https://www.linkedin.com/in/delphn',
    icon: 'div',
  },
  {
    name: 'GitHub Matrix',
    description: 'Explore my code and contributions',
    link: 'https://github.com/Delphn',
    icon: 'div',
  },
  {
    name: 'Direct Transmission',
    description: 'delphinruk@gmail.com',
    link: 'mailto:delphinruk@gmail.com',
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