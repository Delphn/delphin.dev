<template>
  <section id="projects" class="py-20 relative overflow-hidden">
    <!-- Quantum field background -->
    <div class="absolute inset-0" :class="isDark ? 'bg-gray-900/90' : 'bg-gray-50/90'"></div>
    <div class="absolute inset-0 quantum-grid"></div>
    
    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <!-- Section header -->
      <div class="text-center mb-16">
        <h2 class="quantum-text text-5xl md:text-6xl font-bold"
            :class="isDark ? 'text-orange-400' : 'text-orange-600'">
          Digital Forge
        </h2>
        <div class="mt-4 font-mono text-sm tracking-wider"
             :class="isDark ? 'text-orange-300' : 'text-orange-700'">
          &lt;quantum.projects.initialize /&gt;
        </div>
      </div>

      <!-- Project cards -->
      <div class="grid lg:grid-cols-3 gap-12">
        <div v-for="(project, index) in projects" :key="index"
             class="project-card group"
             @mousemove="handleMouseMove"
             @mouseleave="handleMouseLeave">
          <!-- Holographic container -->
          <div class="card-content relative rounded-2xl transition-all duration-500"
               :class="isDark ? 'bg-black/20' : 'bg-white/50'">
            <!-- Ambient frame -->
            <div class="absolute -inset-px rounded-2xl ambient-frame"></div>
            
            <!-- Project image with gentle overlay -->
            <div class="relative h-48 rounded-t-2xl overflow-hidden">
              <div class="absolute inset-0 ambient-overlay"></div>
              <img :src="project.image" :alt="project.title" 
                   class="w-full h-full object-cover" />
              <!-- Soft glow effect -->
              <div class="ambient-glow"></div>
              
              <!-- Status badge for upcoming projects -->
              <div v-if="project.status"
                   class="absolute top-4 right-4 px-3 py-1.5 rounded-full font-mono text-sm backdrop-blur-sm border animate-pulse"
                   :class="isDark ? 
                     'bg-orange-400/20 border-orange-500/30 text-orange-300' : 
                     'bg-orange-100/80 border-orange-200 text-orange-700'">
                {{ project.status }}
              </div>
            </div>

            <!-- Project info -->
            <div class="p-6 space-y-4">
              <!-- Title with subtle glow -->
              <h3 class="text-2xl font-bold"
                  :class="isDark ? 'text-orange-300' : 'text-orange-700'">
                {{ project.title }}
              </h3>

              <!-- Description -->
              <p :class="isDark ? 'text-gray-300' : 'text-gray-700'">
                {{ project.description }}
              </p>

              <!-- Tech stack -->
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in project.technologies" :key="tech"
                      class="px-3 py-1 text-sm rounded-full font-mono transition-colors duration-300"
                      :class="isDark ? 
                        'bg-orange-400/10 text-orange-300 border border-orange-500/30' :
                        'bg-orange-50 text-orange-700 border border-orange-200'">
                  {{ tech }}
                </span>
              </div>

              <!-- Action buttons -->
              <div class="flex gap-4 pt-4">
                <a :href="project.demo" target="_blank"
                   class="ambient-button flex-1 text-center py-2 rounded-lg font-mono text-sm transition-all duration-300"
                   :class="[
                     isDark ? 
                       'bg-orange-400/20 hover:bg-orange-400/30 text-orange-300' : 
                       'bg-orange-100 hover:bg-orange-200 text-orange-700',
                     project.status ? 'cursor-not-allowed opacity-50' : ''
                   ]">
                  <span>{{ project.status ? 'PENDING' : 'LAUNCH_DEMO' }}</span>
                </a>
                <a :href="project.github" target="_blank"
                   class="ambient-button flex-1 text-center py-2 rounded-lg font-mono text-sm transition-all duration-300"
                   :class="[
                     isDark ? 
                       'bg-orange-400/10 hover:bg-orange-400/20 text-orange-300' : 
                       'bg-orange-50 hover:bg-orange-100 text-orange-700',
                     project.status ? 'cursor-not-allowed opacity-50' : ''
                   ]">
                  <span>{{ project.status ? 'INITIALIZING' : 'VIEW_SOURCE' }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import ZambeziFarmer from '~/assets/images/zambezi-farmer.png'

const { isDark } = useTheme()

const handleMouseMove = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  // Calculate rotation based on mouse position
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * -10
  const rotateY = ((x - centerX) / centerX) * 10
  
  // Apply transform
  const content = card.querySelector('.card-content')
  content.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale3d(1.02, 1.02, 1.02)
  `
  
  // Update ambient glow
  const glow = card.querySelector('.ambient-glow')
  glow.style.setProperty('--mouse-x', `${x}px`)
  glow.style.setProperty('--mouse-y', `${y}px`)
}

const handleMouseLeave = (e) => {
  const content = e.currentTarget.querySelector('.card-content')
  content.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
}

const projects = [
  {
    title: 'Zambezi Farmer',
    description: 'Award-winning agricultural platform empowering Zambian farmers. Winner of Most Innovative Start-up in Zambia 2024. Features include crop management, market access, and real-time agricultural insights.',
    image: ZambeziFarmer,
    technologies: ['Vue.js', 'Vuex', 'Vuetify', 'Capacitor', 'Firebase'],
    demo: 'https://zambezifarmer.com/',
    github: '#'
  },
  {
    title: 'SyncNote',
    description: 'A revolutionary note-taking app that synchronizes with your brain waves... just kidding! But it will be awesome.',
    image: 'https://picsum.photos/seed/2/800/400',
    technologies: ['React', 'Neural.js', 'Coming', 'Soon'],
    demo: '#',
    github: '#',
    status: 'APPROACHING DEPLOYMENT'
  },
  {
    title: 'LittleByLittle',
    description: 'An app that helps you achieve your goals, one small step at a time. Building something special here...',
    image: 'https://picsum.photos/seed/3/800/400',
    technologies: ['Mystery', 'Stack', 'Loading', '...'],
    demo: '#',
    github: '#',
    status: 'IN DEVELOPMENT'
  }
]
</script>

<style scoped>
.quantum-grid {
  background-image: 
    radial-gradient(circle at center, rgba(249, 115, 22, 0.05) 1px, transparent 1px),
    radial-gradient(circle at center, rgba(249, 115, 22, 0.03) 1px, transparent 1px);
  background-size: 40px 40px, 20px 20px;
  background-position: 0 0, 20px 20px;
  animation: breathe 8s ease-in-out infinite;
}

.ambient-frame {
  background: linear-gradient(
    to right,
    transparent,
    rgba(249, 115, 22, 0.2),
    transparent
  );
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.project-card:hover .ambient-frame {
  opacity: 0.8;
}

.ambient-overlay {
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(249, 115, 22, 0.1) 0%,
    transparent 70%
  );
  transition: opacity 0.3s ease;
}

.ambient-glow {
  position: absolute;
  inset: 0;
  opacity: 0.4;
  background-image: 
    radial-gradient(
      circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(249, 115, 22, 0.2) 0%,
      transparent 50%
    );
  filter: blur(10px);
  mix-blend-mode: screen;
  transition: opacity 0.3s ease;
}

.project-card:hover .ambient-glow {
  opacity: 0.6;
}

.ambient-button {
  position: relative;
  overflow: hidden;
}

.ambient-button::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    transparent,
    rgba(249, 115, 22, 0.1),
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.ambient-button:hover::after {
  opacity: 1;
}

@keyframes breathe {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
}

.project-card {
  perspective: 1000px;
}

.card-content {
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  will-change: transform;
}

@keyframes pulse {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.4; }
}
</style>