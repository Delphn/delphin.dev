<template>
  <section id="experience"
           class="py-20 relative overflow-hidden">
    <!-- Neural network background effect -->
    <div class="absolute inset-0"
         :class="isDark ? 'bg-gray-900/90' : 'bg-gray-50/90'"></div>
    <div class="absolute inset-0 neural-grid"></div>

    <!-- Content -->
    <div class="max-w-6xl mx-auto px-4 relative z-10">
      <div class="text-center mb-16 space-y-2">
        <h2 class="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r"
            :class="isDark ? 'from-purple-400 via-pink-500 to-purple-400' : 'from-purple-600 via-pink-600 to-purple-600'">
          Tech Odyssey
        </h2>
        <p class="text-lg"
           :class="isDark ? 'text-purple-300' : 'text-purple-700'">
          // Executing career.compile() ...
        </p>
      </div>

      <div class="grid gap-8">
        <div v-for="(job, index) in experience"
             :key="index"
             class="relative">
          <!-- Holographic card -->
          <div class="p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300"
               :class="isDark ?
                'bg-purple-900/10 hover:bg-purple-900/20 border-purple-500/20 hover:border-purple-500/40' :
                'bg-white/70 hover:bg-white/90 border-purple-200 hover:border-purple-300'">

            <!-- Tech frame -->
            <div class="absolute inset-px rounded-2xl overflow-hidden">
              <div class="absolute inset-0 tech-lines"></div>
            </div>

            <!-- Content -->
            <div class="relative z-10">
              <!-- Header with tech-inspired design -->
              <div class="flex flex-col gap-4 mb-8">
                <div class="flex items-center gap-4">
                  <div class="h-3 w-3 rounded-full animate-pulse"
                       :class="isDark ? 'bg-purple-400' : 'bg-purple-600'"></div>
                  <div class="font-mono text-sm tracking-wider"
                       :class="isDark ? 'text-purple-400' : 'text-purple-700'">
                    {{ job.period }}
                  </div>
                </div>

                <div class="space-y-1">
                  <h3 class="text-2xl font-bold tracking-tight"
                      :class="isDark ? 'text-white' : 'text-gray-900'">
                    {{ job.title }}
                  </h3>
                  <div class="font-mono text-lg"
                       :class="isDark ? 'text-purple-300' : 'text-purple-700'">
                    @{{ job.company }}
                  </div>
                </div>
              </div>

              <!-- Context -->
              <div v-if="job.context"
                   class="mb-8 p-6 rounded-lg leading-relaxed"
                   :class="isDark ?
                    'bg-purple-900/30 text-gray-200' :
                    'bg-purple-50/80 text-gray-700'">
                <div class="font-mono text-sm mb-3"
                     :class="isDark ? 'text-purple-400' : 'text-purple-700'">
                  // Project Context
                </div>
                <p class="whitespace-pre-line text-base max-w-3xl space-y-4">
                  {{ job.context.split('\n').filter(line => line.trim()).join('\n\n') }}
                </p>
              </div>

              <!-- Achievement matrix -->
              <div class="space-y-4 mb-8">
                <div v-for="(achievement, i) in job.achievements"
                     :key="i"
                     class="flex gap-4 p-4 rounded-lg transition-colors duration-300"
                     :class="isDark ?
                      'bg-purple-900/30 hover:bg-purple-900/40' :
                      'bg-purple-50/80 hover:bg-purple-50/90'">
                  <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-1">
                    <div class="w-1.5 h-1.5 rounded-full"
                         :class="isDark ? 'bg-purple-400' : 'bg-purple-600'"></div>
                  </div>
                  <p class="text-base leading-relaxed"
                     :class="isDark ? 'text-gray-200' : 'text-gray-700'">
                    {{ achievement }}
                  </p>
                </div>
              </div>

              <!-- Tech stack chips -->
              <div class="flex flex-wrap gap-2">
                <div v-for="skill in job.skills"
                     :key="skill"
                     class="px-4 py-1.5 rounded-full font-mono text-sm transition-all duration-300"
                     :class="isDark ?
                      'bg-purple-400/10 text-purple-300 border border-purple-500/20 hover:border-purple-500/40' :
                      'bg-purple-50 text-purple-700 border border-purple-200 hover:border-purple-300'">
                  {{ skill }}
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
const { isDark } = useTheme()

const experience = [
  {
    title: 'Full Stack Engineer',
    company: 'Daveo',
    period: 'May 2024 - Oct 2024 (6mos)',
    context: 'Developed comprehensive service management solution for Norauto Europe, streamlining customer journey from product selection to service completion.',
    achievements: [
      'Implemented SAP purchase order delivery date system for optimized shipment management',
      'Enhanced cart system with global indications and item-specific data management',
      'Developed complementary services feature for product-service bundling',
      'Migrated frontend app from Vue 2 to Vue 3 with robust test coverage'
    ],
    skills: ['Vue 3', 'Pinia', 'Nest.js', 'Node.js', 'GraphQL', 'Vitest', 'Jest', 'TypeScript']
  },
  {
    title: 'Full Stack Engineer',
    company: 'Claranet',
    period: 'Feb 2023 - May 2024 (1yr 4mos)',
    context: 'Built and maintained internal applications focusing on security, communication, and project management.',
    achievements: [
      'Architected secure secrets management microservice',
      'Developed AI-powered communication platform with multi-platform integration',
      'Migrated company-wide project management platform from Vue 2 to Vue 3',
      'Integrated OpenAI capabilities across internal and client products'
    ],
    skills: ['Vue 3', 'Nuxt 3', 'Angular', 'TypeScript', 'MongoDB', 'PostgreSQL', 'MySQL', 'Drizzle ORM', 'gRPC', 'AI']
  },
  {
    title: 'Full Stack Engineer',
    company: 'Pictime Groupe',
    period: 'Mar 2021 - Feb 2023 (2yrs)',
    context: 'Contributed to the development of Electro Dépôt e-commerce platform across France, Belgium, and Spain.',
    achievements: [
      'Integrated multiple payment solutions including PayPal, Google Pay, and Gift Cards',
      'Implemented smart delivery time estimation system',
      'Developed advanced product comparison feature',
      'Optimized site performance and stability across three countries'
    ],
    skills: ['Vue.js', 'Magento', 'MySQL', 'NodeJS', 'ElasticSearch']
  },
  {
    title: 'Artificial Intelligence Apprentice',
    company: 'UNIVERTPROPRE',
    period: 'Sep 2019 - Sep 2020 (1yr 1mo)',
    context: 'Developed AI-powered autonomous waste sorting system with mobile app integration.',
    achievements: [
      'Built multimodal ML model combining image, radar, and sensor data',
      'Created interactive waste sorting kiosk with autonomous capabilities',
      'Developed Kotlin mobile app for machine interaction and impact tracking',
      'Implemented real-time waste classification system'
    ],
    skills: ['PyTorch', 'TensorFlow', 'C', 'Vue.js', 'Vuetify', 'Electron.js', 'Express.js', 'Firebase', 'Kotlin']
  },
  {
    title: 'Artificial Intelligence Intern',
    company: 'UNIVERTPROPRE',
    period: 'Apr 2019 - Aug 2019 (5mos)',
    context: 'Trained ML models for automated household waste classification.',
    achievements: [
      'Built comprehensive dataset for recyclable materials classification',
      'Optimized deep learning models (Yolo V3, VGGNet) for real-time inference',
      'Configured high-performance training environment with 8 NVIDIA Tesla V100 GPUs',
      'Achieved 95% accuracy in waste classification'
    ],
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Yolo V3', 'Weka', 'C', 'GCP']
  }
]
</script>

<style scoped>
.neural-grid {
  background-image: radial-gradient(circle at 1px 1px, rgba(147, 51, 234, 0.15) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
}

.tech-lines {
  background-image:
    linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px),
    linear-gradient(0deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  mask-image: radial-gradient(circle at center, transparent 30%, black 70%);
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}
</style>