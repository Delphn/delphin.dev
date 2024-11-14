<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Cyberpunk grid background -->
    <div class="absolute inset-0 cyber-grid"></div>

    <!-- Glitch overlay -->
    <div class="absolute inset-0 glitch-overlay"></div>

    <!-- Main content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center">
      <div class="text-center space-y-8 p-8">
        <!-- Glitch text effect -->
        <h1 class="text-7xl md:text-9xl font-bold glitch-text"
            data-text="CORE_MATRIX">
          CORE_MATRIX
        </h1>

        <!-- Status text -->
        <div class="space-y-4">
          <div class="inline-flex items-center space-x-2 px-4 py-2 rounded-lg backdrop-blur-sm"
               :class="isDark ? 'bg-purple-500/10' : 'bg-purple-50/50'">
            <span class="block w-3 h-3 rounded-full bg-purple-500 animate-ping"></span>
            <span class="font-mono tracking-wider"
                  :class="isDark ? 'text-purple-300' : 'text-purple-700'">
                  BOOTING_HYPERLINKS
            </span>
          </div>

          <!-- Progress bar -->
          <div class="max-w-md mx-auto">
            <div class="h-1 rounded-full overflow-hidden bg-purple-900/20">
              <div class="h-full rounded-full cyber-gradient loading-progress"></div>
            </div>
          </div>

          <!-- Binary rain effect -->
          <div class="binary-rain">
            <template v-for="i in 10"
                      :key="i">
              <div class="binary-column"
                   :style="{
                    '--delay': `${i * 0.3}s`,
                    left: `${i * 10}%`
                  }">
                {{ binaryStrings[i % binaryStrings.length] }}
              </div>
            </template>
          </div>

          <!-- Coming soon text -->
          <div class="space-y-4 mt-8">
            <p class="text-xl md:text-2xl font-mono typing-text"
               :class="isDark ? 'text-purple-300' : 'text-purple-700'">
              COMING SOON . . . . . .
            </p>
            <p class="text-base md:text-lg font-mono mt-4"
               :class="isDark ? 'text-purple-400/60' : 'text-purple-600/60'">
              ETA: EXCEEDING_QUANTUM_LIMIT
            </p>
          </div>
        </div>

        <!-- Return link -->
        <NuxtLink to="/"
                  class="inline-block mt-8 px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 border"
                  :class="isDark ?
                    'bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20' :
                    'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'">
          RETURN_HOME()
        </NuxtLink>
      </div>
    </div>

    <!-- Floating particles -->
    <div class="particles">
      <template v-for="i in 50"
                :key="i">
        <div class="particle"
             :style="{
              '--size': `${Math.random() * 4 + 1}px`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--duration': `${Math.random() * 20 + 10}s`,
              '--delay': `${Math.random() * -20}s`
            }">
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
const { isDark } = useTheme()

// Pre-generated binary strings for better performance
const binaryStrings = [
  '101010110101',
  '110011001100',
  '001111001111',
  '101101011010',
  '110110001101',
  '001100110011',
  '111000111000',
  '000111000111',
  '101011010101',
  '110101101010'
]
</script>

<style scoped>
.cyber-grid {
  background-image:
    linear-gradient(to right, rgba(147, 51, 234, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(147, 51, 234, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
}

.glitch-overlay::before,
.glitch-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent, rgba(147, 51, 234, 0.2), transparent);
  animation: glitch 8s infinite;
}

.glitch-overlay::after {
  animation-delay: -4s;
}

.glitch-text {
  position: relative;
  color: transparent;
  background: linear-gradient(45deg,
      rgba(147, 51, 234, 1),
      rgba(168, 85, 247, 1),
      rgba(147, 51, 234, 1));
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  animation: shine 8s linear infinite;
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
  background-clip: text;
  -webkit-background-clip: text;
}

.glitch-text::before {
  left: 2px;
  text-shadow: -2px 0 rgba(147, 51, 234, 0.7);
  animation: glitch-1 6s infinite linear alternate-reverse;
}

.glitch-text::after {
  left: -2px;
  text-shadow: 2px 0 rgba(168, 85, 247, 0.7);
  animation: glitch-2 4s infinite linear alternate-reverse;
}

.cyber-gradient {
  background: linear-gradient(90deg,
      rgba(147, 51, 234, 0.5),
      rgba(168, 85, 247, 0.8),
      rgba(147, 51, 234, 0.5));
}

.loading-progress {
  width: 0;
  animation: loading 6s ease-in-out infinite;
}

.binary-rain {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.binary-column {
  position: absolute;
  top: -20px;
  font-family: monospace;
  color: rgba(147, 51, 234, 0.3);
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
  animation: rain 20s linear infinite;
  animation-delay: var(--delay);
}

.typing-text {
  border-right: 2px solid rgba(147, 51, 234, 0.7);
  white-space: nowrap;
  overflow: hidden;
  animation: typing 6s steps(40) infinite;
}

.particles {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: rgba(147, 51, 234, 0.5);
  border-radius: 50%;
  left: var(--x);
  top: var(--y);
  animation: float var(--duration) linear infinite;
  animation-delay: var(--delay);
}

@keyframes glitch {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(100%);
  }
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}

@keyframes glitch-1 {
  0% {
    clip-path: inset(40% 0 61% 0);
  }

  20% {
    clip-path: inset(92% 0 1% 0);
  }

  40% {
    clip-path: inset(43% 0 1% 0);
  }

  60% {
    clip-path: inset(25% 0 58% 0);
  }

  80% {
    clip-path: inset(54% 0 7% 0);
  }

  100% {
    clip-path: inset(58% 0 43% 0);
  }
}

@keyframes glitch-2 {
  0% {
    clip-path: inset(24% 0 29% 0);
  }

  20% {
    clip-path: inset(54% 0 21% 0);
  }

  40% {
    clip-path: inset(73% 0 86% 0);
  }

  60% {
    clip-path: inset(46% 0 3% 0);
  }

  80% {
    clip-path: inset(28% 0 13% 0);
  }

  100% {
    clip-path: inset(64% 0 34% 0);
  }
}

@keyframes loading {
  0% {
    width: 0;
  }

  50% {
    width: 100%;
  }

  100% {
    width: 0;
  }
}

@keyframes rain {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(100vh);
  }
}

@keyframes typing {

  0%,
  100% {
    width: 0;
  }

  50% {
    width: 100%;
  }
}

@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0;
  }

  25% {
    opacity: 0.7;
  }

  75% {
    opacity: 0.7;
  }

  100% {
    transform: translate(100px, -100px) scale(0);
    opacity: 0;
  }
}
</style>