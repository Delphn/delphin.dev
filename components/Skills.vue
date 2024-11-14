<template>
  <section id="skills"
           class="py-20 relative overflow-hidden">
    <!-- Cyberpunk background -->
    <div class="absolute inset-0"
         :class="isDark ? 'bg-gray-900/90' : 'bg-gray-50/90'"></div>
    <div class="absolute inset-0 matrix-grid"></div>

    <div class="max-w-6xl mx-auto px-4 relative z-10">
      <!-- Section header -->
      <div class="text-center mb-16">
        <div class="glitch-container">
          <h2 class="text-5xl md:text-6xl font-bold glitch-text"
              :class="isDark ? 'text-cyan-400' : 'text-cyan-600'"
              data-text="Tech Arsenal">
            Tech Arsenal
          </h2>
        </div>
        <div class="mt-4 font-mono text-sm tracking-wider"
             :class="isDark ? 'text-cyan-300' : 'text-cyan-700'">
          &lt;system.skills.initialize /&gt;
        </div>
      </div>

      <!-- Skills grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(category, index) in skills"
             :key="index"
             class="skill-card"
             @mousemove="handleMouseMove"
             @mouseleave="handleMouseLeave"
             ref="cards">
          <!-- Holographic container -->
          <div class="card-content relative p-6 rounded-xl border backdrop-blur-sm transition-all duration-300"
               :class="isDark ?
                'bg-cyan-900/10 border-cyan-500/20 hover:border-cyan-500/40' :
                'bg-white/50 border-cyan-200 hover:border-cyan-300'">

            <!-- Cyber frame -->
            <div class="absolute -inset-0.5 rounded-xl cyber-frame"
                 :class="isDark ? 'opacity-20' : 'opacity-10'">
            </div>

            <!-- Category header -->
            <div class="relative">
              <div class="flex items-center gap-3 mb-6">
                <div class="h-2 w-2 rounded-full animate-pulse"
                     :class="isDark ? 'bg-cyan-400' : 'bg-cyan-600'"></div>
                <h3 class="text-xl font-bold tracking-wide font-mono"
                    :class="isDark ? 'text-cyan-300' : 'text-cyan-700'">
                  {{ category.name }}
                </h3>
              </div>

              <!-- Skills list -->
              <div class="space-y-4">
                <div v-for="skill in category.items"
                     :key="skill.name"
                     class="skill-item">
                  <!-- Skill header -->
                  <div class="flex justify-between items-center mb-2">
                    <span class="font-mono text-sm"
                          :class="isDark ? 'text-cyan-300' : 'text-cyan-700'">
                      {{ skill.name }}
                    </span>
                    <span class="cyber-chip"
                          :class="isDark ? 'text-cyan-400' : 'text-cyan-600'">
                      {{ skill.level }}%
                    </span>
                  </div>

                  <!-- Progress bar -->
                  <div class="h-1.5 rounded-full overflow-hidden relative bg-black/10">
                    <!-- Background line pattern -->
                    <div class="absolute inset-0 cyber-lines"></div>

                    <!-- Progress -->
                    <div class="relative h-full rounded-full transition-all duration-500 cyber-gradient"
                         :style="{ width: `${skill.level}%` }"
                         :class="isDark ? 'opacity-80' : 'opacity-70'">
                      <!-- Scanning effect -->
                      <div class="absolute inset-0 scan-line"></div>
                    </div>
                  </div>

                  <!-- Skill tags -->
                  <div class="mt-2 flex flex-wrap gap-2">
                    <span v-for="tag in skill.tags"
                          :key="tag"
                          class="text-xs px-2 py-1 rounded font-mono transition-colors duration-300"
                          :class="isDark ?
                            'bg-cyan-400/10 text-cyan-300' :
                            'bg-cyan-50 text-cyan-700'">
                      #{{ tag }}
                    </span>
                  </div>
                </div>
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
const { isDark } = useTheme()
const cards = ref([])

const handleMouseMove = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const cardCenterX = rect.left + rect.width / 2
  const cardCenterY = rect.top + rect.height / 2

  // Calculate distance from center
  const mouseX = e.clientX - cardCenterX
  const mouseY = e.clientY - cardCenterY

  // Calculate rotation angles (max 15 degrees)
  const maxRotation = 15
  const rotateY = (mouseX / (rect.width / 2)) * maxRotation
  const rotateX = -(mouseY / (rect.height / 2)) * maxRotation

  // Apply smooth transform
  const content = card.querySelector('.card-content')
  content.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale3d(1.05, 1.05, 1.05)
  `
}

const handleMouseLeave = (e) => {
  const content = e.currentTarget.querySelector('.card-content')
  content.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
}
const skills = [
  {
    name: 'Interface Protocols',
    items: [
      {
        name: 'Vue.js/Nuxt.js',
        level: 95,
        tags: ['components', 'composition-api', 'ssr']
      },
      {
        name: 'React',
        level: 90,
        tags: ['hooks', 'context', 'next.js']
      },
      {
        name: 'TypeScript',
        level: 85,
        tags: ['types', 'generics', 'decorators']
      }
    ]
  },
  {
    name: 'Server Core',
    items: [
      {
        name: 'Node.js',
        level: 90,
        tags: ['express', 'nest.js', 'graphql']
      },
      {
        name: 'Python',
        level: 85,
        tags: ['django', 'fastapi', 'async']
      },
      {
        name: 'SQL',
        level: 80,
        tags: ['postgres', 'orm', 'optimization']
      }
    ]
  },
  {
    name: 'DevOps Core',
    items: [
      {
        name: 'Docker',
        level: 85,
        tags: ['compose', 'swarm', 'k8s']
      },
      {
        name: 'AWS',
        level: 80,
        tags: ['lambda', 's3', 'ec2']
      },
      {
        name: 'CI/CD',
        level: 85,
        tags: ['github', 'gitlab', 'jenkins']
      }
    ]
  },
  {
    name: 'Framework Kernel',
    items: [
      {
        name: 'Architecture',
        level: 95,
        tags: ['micro', 'patterns', 'scale']
      },
      {
        name: 'Testing',
        level: 85,
        tags: ['unit', 'e2e', 'tdd']
      },
      {
        name: 'Security',
        level: 90,
        tags: ['auth', 'oauth', 'jwt']
      }
    ]
  },
  {
    name: 'AI & Machine Learning',
    items: [
      {
        name: 'Computer Vision',
        level: 80,
        tags: ['yolo', 'vggnet', 'tensorflow']
      },
      {
        name: 'Multimodal Data Processing',
        level: 75,
        tags: ['radar', 'sensor-fusion', 'image-data']
      },
      {
        name: 'Model Optimization',
        level: 85,
        tags: ['resource-efficiency', 'gcp', 'gpu']
      }
    ]
  },
  {
    name: 'Data Engineering & Big Data',
    items: [
      {
        name: 'Data Pipelines',
        level: 80,
        tags: ['etl', 'transformation', 'streaming']
      },
      {
        name: 'Database Optimization',
        level: 85,
        tags: ['query-tuning', 'indexing', 'elasticsearch']
      }
    ]
  },
  {
    name: 'Project Management & Agile',
    items: [
      {
        name: 'Agile Methodologies',
        level: 90,
        tags: ['scrum', 'sprint-planning', 'retrospectives']
      },
      {
        name: 'Collaboration Tools',
        level: 85,
        tags: ['jira', 'confluence', 'trello']
      }
    ]
  }
]
</script>

<style scoped>
.matrix-grid {
  background-image:
    repeating-linear-gradient(90deg, rgba(6, 182, 212, 0.05) 0px, rgba(6, 182, 212, 0.05) 1px, transparent 1px, transparent 50px),
    repeating-linear-gradient(0deg, rgba(6, 182, 212, 0.05) 0px, rgba(6, 182, 212, 0.05) 1px, transparent 1px, transparent 50px);
  mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
}

.cyber-frame {
  background: repeating-linear-gradient(45deg,
      rgba(6, 182, 212, 0.1),
      rgba(6, 182, 212, 0.1) 2px,
      transparent 2px,
      transparent 4px);
}

.cyber-lines {
  background-image:
    repeating-linear-gradient(90deg, rgba(6, 182, 212, 0.1) 0px, rgba(6, 182, 212, 0.1) 1px, transparent 1px, transparent 5px);
}

.cyber-gradient {
  background: linear-gradient(90deg,
      rgba(6, 182, 212, 0.8),
      rgba(8, 145, 178, 0.8));
}

.scan-line {
  background: linear-gradient(90deg,
      transparent,
      rgba(6, 182, 212, 0.5),
      transparent);
  width: 100%;
  animation: scan 2s linear infinite;
}

.glitch-text {
  position: relative;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip: rect(0, 0, 0, 0);
}

.glitch-text::before {
  left: -2px;
  text-shadow: 2px 0 rgba(6, 182, 212, 0.7);
  animation: glitch-1 2s infinite linear alternate-reverse;
}

.glitch-text::after {
  left: 2px;
  text-shadow: -2px 0 rgba(8, 145, 178, 0.7);
  animation: glitch-2 3s infinite linear alternate-reverse;
}

@keyframes scan {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

@keyframes glitch-1 {
  0% {
    clip: rect(20px, 1000px, 51px, 0);
  }

  5% {
    clip: rect(83px, 1000px, 102px, 0);
  }

  10% {
    clip: rect(46px, 1000px, 24px, 0);
  }

  15% {
    clip: rect(35px, 1000px, 56px, 0);
  }

  20% {
    clip: rect(92px, 1000px, 78px, 0);
  }

  25% {
    clip: rect(20px, 1000px, 51px, 0);
  }

  100% {
    clip: rect(20px, 1000px, 51px, 0);
  }
}

@keyframes glitch-2 {
  0% {
    clip: rect(25px, 1000px, 40px, 0);
  }

  5% {
    clip: rect(92px, 1000px, 29px, 0);
  }

  10% {
    clip: rect(53px, 1000px, 84px, 0);
  }

  15% {
    clip: rect(16px, 1000px, 96px, 0);
  }

  20% {
    clip: rect(38px, 1000px, 13px, 0);
  }

  25% {
    clip: rect(25px, 1000px, 40px, 0);
  }

  100% {
    clip: rect(25px, 1000px, 40px, 0);
  }
}

.skill-card {
  perspective: 1000px;
}

.card-content {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
  will-change: transform;
}

.cyber-chip {
  font-family: monospace;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.2);
}
</style>