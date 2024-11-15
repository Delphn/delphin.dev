<template>
  <section class="min-h-screen relative w-full overflow-hidden">
    <!-- Navigation -->
    <Navigation />

    <!-- Hero Content -->
    <div class="relative z-10 min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-8rem)] flex items-center w-full px-4 md:px-14 pt-24 md:pt-32">
      <div class="w-full max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <!-- Left side: Text content -->
          <div class="space-y-6 md:space-y-8">
            <div class="space-y-4">
              <div class="quantum-badge inline-flex items-center space-x-2 px-3 py-1 rounded-full"
                   :class="isDark ? 'bg-purple-400/10 text-purple-300' : 'bg-purple-50 text-purple-700'">
                <span class="inline-block w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
                <span class="font-mono text-sm">STATUS: ONLINE</span>
              </div>
              
              <h1 class="quantum-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold break-words">
                <div class="flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-1">
                  <div class="glitch-container">
                    <span class="glitch-text" data-text="Delphin">Delphin</span>
                  </div>
                  <div class="glitch-container">
                    <span class="glitch-text" data-text="Rukundo">Rukundo</span>
                  </div>
                </div>
              </h1>
              
              <p class="text-base sm:text-lg md:text-xl max-w-xl" :class="isDark ? 'text-purple-200/80' : 'text-purple-900/80'">
                Crafting exceptional digital experiences with cutting-edge technologies.
              </p>
            </div>

            <div class="flex flex-wrap gap-3 md:gap-4">
              <a href="#contact" 
                 class="quantum-button px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-300 backdrop-blur-sm text-sm md:text-base"
                 :class="isDark ? 
                   'bg-purple-400/20 border border-purple-500/30 text-purple-300 hover:bg-purple-400/30' : 
                   'bg-purple-500/10 border border-purple-500/20 text-purple-700 hover:bg-purple-500/20'">
                INITIALIZE_CONTACT()
              </a>
              <a href="#projects"
                 class="quantum-button px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-300 backdrop-blur-sm text-sm md:text-base"
                 :class="isDark ? 
                   'bg-purple-400/10 border border-purple-500/20 text-purple-300 hover:bg-purple-400/20' : 
                   'bg-purple-500/5 border border-purple-500/10 text-purple-700 hover:bg-purple-500/10'">
                VIEW_PROJECTS()
              </a>
            </div>
          </div>

          <!-- Right side: Profile -->
          <div class="relative w-full flex justify-center md:justify-end">
            <Profile />
          </div>
        </div>
      </div>
    </div>

    <!-- Ambient Grid -->
    <GridDot />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Profile from './Profile.vue'
import GridDot from './GridDot.vue'
import Navigation from './Navigation.vue'

const { isDark } = useTheme()
</script>

<style scoped>
.quantum-heading {
  position: relative;
  width: 100%;
  overflow-x: hidden;
}

.glitch-container {
  position: relative;
  display: inline-block;
}

.glitch-text {
  position: relative;
  display: inline-block;
  background: linear-gradient(
    to right,
    rgb(147, 51, 234),
    rgb(168, 85, 247),
    rgb(147, 51, 234)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% auto;
  animation: shine 6s linear infinite;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.glitch-text::before {
  left: 2px;
  text-shadow: -2px 0 rgba(147, 51, 234, 0.7);
  animation: glitch-1 3s infinite linear alternate-reverse;
}

.glitch-text::after {
  left: -2px;
  text-shadow: 2px 0 rgba(168, 85, 247, 0.7);
  animation: glitch-2 2s infinite linear alternate-reverse;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}

@keyframes glitch-1 {
  0% { clip-path: inset(40% 0 61% 0); }
  20% { clip-path: inset(92% 0 1% 0); }
  40% { clip-path: inset(43% 0 1% 0); }
  60% { clip-path: inset(25% 0 58% 0); }
  80% { clip-path: inset(54% 0 7% 0); }
  100% { clip-path: inset(58% 0 43% 0); }
}

@keyframes glitch-2 {
  0% { clip-path: inset(24% 0 29% 0); }
  20% { clip-path: inset(54% 0 21% 0); }
  40% { clip-path: inset(73% 0 86% 0); }
  60% { clip-path: inset(46% 0 3% 0); }
  80% { clip-path: inset(28% 0 13% 0); }
  100% { clip-path: inset(64% 0 34% 0); }
}

/* Mobile responsiveness fixes */
@media (max-width: 879px) {
  .quantum-heading {
    font-size: clamp(2rem, 5vw, 3rem);
    word-break: break-word;
  }
  
  .glitch-container {
    width: 100%;
    max-width: 100%;
  }

  section {
    padding-top: 5rem;
  }

  .quantum-button {
    width: 100%;
    text-align: center;
  }
}

/* Prevent text overflow on small screens */
@media (max-width: 380px) {
  .quantum-heading {
    font-size: 1.75rem;
  }
}
</style>