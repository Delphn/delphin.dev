<template>
  <div class="min-h-screen relative"
       :class="isDark ? 'bg-gray-900' : 'bg-gray-50'">
    <!-- Neural network background -->
    <div class="fixed inset-0 neural-grid"></div>

    <!-- Main content -->
    <main class="relative pt-32 pb-20 px-4">
      <!-- Header -->
      <div class="max-w-7xl mx-auto text-center mb-16">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 quantum-text"
            :class="isDark ? 'text-white' : 'text-gray-900'">
          Neural Archive
        </h1>
        <p class="text-xl max-w-2xl mx-auto"
           :class="isDark ? 'text-gray-300' : 'text-gray-600'">
          Access curated matrices for data enlightenment
        </p>
      </div>

      <!-- Books grid -->
      <div class="max-w-7xl mx-auto">
        <!-- Category filters -->
        <div class="flex flex-wrap gap-4 mb-12 justify-center">
          <button v-for="category in uniqueCategories"
                  :key="category"
                  @click="toggleCategory(category)"
                  class="px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300"
                  :class="[
                    selectedCategories.includes(category) ?
                      (isDark ? 'bg-purple-500/30 text-purple-300' : 'bg-purple-100 text-purple-700') :
                      (isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600')
                  ]">
            {{ category }}
          </button>
        </div>

        <!-- Books list -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="book in filteredBooks"
               :key="book.title"
               class="book-card group"
               @mousemove="handleMouseMove"
               @mouseleave="handleMouseLeave">
            <!-- Card container -->
            <div class="card-content relative rounded-2xl overflow-hidden transition-all duration-500 transform-gpu"
                 :class="isDark ? 'bg-black/30' : 'bg-white/80'">
              <!-- Holographic frame -->
              <div class="absolute -inset-px rounded-2xl holo-frame"></div>

              <!-- Book cover -->
              <div class="relative aspect-[2/3] overflow-hidden">
                <img :src="book.cover"
                     :alt="book.title"
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <!-- Rating -->
                <div class="absolute top-4 right-4 px-3 py-1 rounded-full font-mono text-sm backdrop-blur-sm"
                     :class="isDark ? 'bg-purple-400/20 text-purple-300' : 'bg-purple-100 text-purple-700'">
                  ★ {{ book.rating }}
                </div>
              </div>

              <!-- Book info -->
              <div class="p-6 space-y-4">
                <div class="space-y-2">
                  <h3 class="text-xl font-bold leading-tight"
                      :class="isDark ? 'text-white' : 'text-gray-900'">
                    {{ book.title }}
                  </h3>
                  <p class="font-mono text-sm"
                     :class="isDark ? 'text-purple-300' : 'text-purple-700'">
                    by {{ book.author }}
                  </p>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2">
                  <span v-for="tag in book.tags"
                        :key="tag"
                        class="px-2 py-1 rounded-full text-xs font-mono"
                        :class="isDark ?
                          'bg-purple-400/10 text-purple-300' :
                          'bg-purple-50 text-purple-700'">
                    #{{ tag }}
                  </span>
                </div>

                <!-- Description -->
                <p class="text-sm"
                   :class="isDark ? 'text-gray-300' : 'text-gray-600'">
                  {{ book.description }}
                </p>

                <!-- Impact -->
                <div class="p-4 rounded-lg font-mono text-sm"
                     :class="isDark ?
                      'bg-purple-400/10 text-purple-300' :
                      'bg-purple-50 text-purple-700'">
                  <span class="block mb-2">Knowledge Effect:</span>
                  "{{ book.impact }}"
                </div>

                <!-- Quote -->
                <div class="pt-4 border-t"
                     :class="isDark ? 'border-purple-500/20' : 'border-purple-100'">
                  <p class="italic text-sm"
                     :class="isDark ? 'text-purple-300' : 'text-purple-600'">
                    "{{ book.quote }}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const { isDark } = useTheme()
const { books, selectedCategories, uniqueCategories, filteredBooks, toggleCategory } = useBooks()

// Card animations
const handleMouseMove = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = ((y - centerY) / centerY) * -10
  const rotateY = ((x - centerX) / centerX) * 10

  const content = card.querySelector('.card-content')
  content.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale3d(1.02, 1.02, 1.02)
  `
}

const handleMouseLeave = (e) => {
  const content = e.currentTarget.querySelector('.card-content')
  content.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
}
</script>

<style scoped>
.neural-grid {
  background-image:
    radial-gradient(circle at center, rgba(147, 51, 234, 0.1) 0%, transparent 60%),
    linear-gradient(rgba(147, 51, 234, 0.05) 2px, transparent 2px),
    linear-gradient(90deg, rgba(147, 51, 234, 0.05) 2px, transparent 2px);
  background-size: 100% 100%, 50px 50px, 50px 50px;
  background-position: center, center, center;
  mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
}

.quantum-text {
  position: relative;
  background: linear-gradient(to right,
      rgb(147, 51, 234),
      rgb(168, 85, 247),
      rgb(147, 51, 234));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% auto;
  animation: shine 6s linear infinite;
}

.book-card {
  perspective: 1000px;
}

.card-content {
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  will-change: transform;
}

.holo-frame {
  background: linear-gradient(45deg,
      transparent,
      rgba(147, 51, 234, 0.2),
      transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.book-card:hover .holo-frame {
  opacity: 1;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>