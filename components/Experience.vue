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
          Neural Timeline
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
                'bg-white/50 hover:bg-white/80 border-purple-200 hover:border-purple-300'">

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

              <!-- Achievement matrix -->
              <div class="space-y-4 mb-8">
                <div v-for="(achievement, i) in job.achievements"
                     :key="i"
                     class="flex gap-4 p-3 rounded-lg transition-colors duration-300"
                     :class="isDark ?
                      'bg-purple-900/20 hover:bg-purple-900/30' :
                      'bg-purple-50/50 hover:bg-purple-50/80'">
                  <div class="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <div class="w-1.5 h-1.5 rounded-full"
                         :class="isDark ? 'bg-purple-400' : 'bg-purple-600'"></div>
                  </div>
                  <p :class="isDark ? 'text-gray-300' : 'text-gray-700'">
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
    context: 'Development of a new solution for Norauto Europe, focusing on streamlining customer interactions across multiple stages of a service process, from product catalog selection to the return of keys after service completion. The project delivers a comprehensive solution for customer-facing operations in automotive service centers, covering key areas such as product/service catalogs, key drop-off systems, quote generation, and service orders. The platform focuses on efficiency by integrating sales assistants, product scans, filters, and opt-in features. It also enables seamless conversion of quotes into orders and supports B2C and B2B operations, ensuring a smooth customer journey with 360° client/vehicle vision and multi-site management capabilities.',
    achievements: [
      'Collaborated with Norauto and Auto5 teams to enhance the shopping cart functionality',
      'Implemented a feature allowing Norauto employees to enter a delivery date for each item in SAP purchase orders. This streamlined the order finalization process by making availability dates directly exploitable for shipment and order management',
      'Enhanced cart functionality: Implemented the ability to add and modify global indications for both the cart and individual items, such as client details, vehicle information, and item-specific data, improving communication between sales and workshop teams and ensuring more accurate order processing.',
      'Redesigned and refactored the product listing to improve product visibility and align with new design mockups.',
      'Developed a feature allowing users to add, modify, or remove complementary services associated with products in the cart, enhancing flexibility in managing additional services directly from the cart interface.',
      'Upgraded legacy Vue 2 to Vue 3 and added unit tests to ensure stability and improve code coverage.',
    ],
    skills: ['Vue 3', 'Pinia', 'Nest.js', 'Node.js', 'GraphQL', 'Vitest', 'Jest', 'TypeScript']
  },
  {
    title: 'Full Stack Engineer',
    company: 'Claranet',
    period: 'Feb 2023 - May 2024 (1yr 4mos)',
    context: 'Design, develop and maintain the company\'s internal applications and products. Work closely with Product Owners to understand clients needs and requirements, ensuring design and implementation while guaranteeing a high level of quality.',
    achievements: [
      'Designed and developed a new micro-service for managing and sharing secrets',
      'Created an internal communication tool featuring email list management, AI-powered WYSIWYG editor, and multi-platform integration (Slack, Teams)',
      'Led migration from Vue 2 to Vue 3 for internal platform managing company portfolios, project monitoring, and ticket management',
      'Integrated OpenAI API into internal and client products to enhance performance and automate interactions, implementing features like chat exchanges and prompt-based request generation'
    ],
    skills: ['Vue 3', 'Nuxt 3', 'Angular', 'TypeScript', 'MongoDB', 'PostgreSQL', 'MySQL', 'Drizzle ORM', 'gRPC', 'AI']
  },
  {
    title: 'Full Stack Engineer',
    company: 'Pictime Groupe',
    period: 'Mar 2021 - Feb 2023 (2yrs)',
    context: `Development, maintenance, and hosting of the e-commerce site for Electro Dépôt (France, Belgium, and Spain).
              This is a project for Électro Dépôt, an e-commerce website operating in France, Belgium and Spain.
              The aim of the project is to provide an efficient solution for the development of new functionalities, maintenance and hosting of the site in order to offer an optimal experience to customers.
              The project is built with Magento/PHP for the backend and Vue.js for the frontend. The Build, RUN and Testing teams manage the project to ensure optimal operation and continuous upgrades.`,
    achievements: [
      'Integrated multiple payment methods including PayPal, Google Pay, and Gift Card functionality',
      'Implemented product estimated delivery time feature to enhance customer experience',
      'Developed product comparison functionality for category pages',
      'Maintained website stability through bug fixes and performance improvements',
      'Collaborated with Build, RUN and Testing teams to ensure efficient development and comprehensive testing'
    ],
    skills: ['Vue.js', 'Magento', 'MySQL', 'NodeJS', 'ElasticSearch']
  },
  {
    title: 'Artificial Intelligence Apprentice',
    company: 'UNIVERTPROPRE',
    period: 'Sep 2019 - Sep 2020 (1yr 1mo)',
    context: `Autonomous waste sorting machine and Mobile App
              Training of a model using a multimodal learning approach capable of taking as input image data as well as 60GHz radar and sensor data (capacitive and inductive) enabling the development of advanced detection systems capable of understanding and analyzing complex scenarios beyond the capabilities of single-modality models.
              Development of an interactive waste sorting kiosk with features such as autonomous sorting of bulk packaging, separation of recyclable and non-recyclable waste, simultaneous use by two people, collection of batteries, caps, and corks, separation of packaging and food waste.
              Development of a mobile application with Kotlin, enabling users to connect to the machine via an integrated QR scanner and receive discount vouchers, as well as enabling them to track their environmental impact.`,
    achievements: [
      'Designed and trained a multimodal learning model to simultaneously analyze image data, 60GHz radar signals, and capacitive and inductive sensor readouts',
      'Designed and developed an interactive kiosk for smart waste sorting machine, integrated features for autonomous separation of packaging and waste, and selective sorting',
      'Developed a mobile application in Kotlin allowing users to connect to the machine via a QR code scanner, receive discount vouchers and track their environmental impact'
    ],
    skills: ['PyTorch', 'TensorFlow', 'C', 'Vue.js', 'Vuetify', 'Electron.js', 'Express.js', 'Firebase', 'Kotlin']
  },
  {
    title: 'Artificial Intelligence Intern',
    company: 'UNIVERTPROPRE',
    period: 'Apr 2019 - Aug 2019 (5mos)',
    context: `Autonomous waste sorting machine
              Training of a model capable of categorizing the majority of recyclable household packaging`,
    achievements: [
      'Collected and categorized diverse datasets of household packaging materials to create comprehensive training sets',
      'Performed data preprocessing, augmentation, and labeling for machine learning model training',
      'Benchmarked deep learning models (Yolo V3, VGGNet) to optimize accuracy, speed, and resource efficiency',
      'Configured high-performance training environment using GCP Compute Engine with 8 NVIDIA Tesla V100 GPUs',
      'Set up local environment for efficient inference of the pre-trained model'
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