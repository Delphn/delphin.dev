<template>
  <nav class="fixed w-full z-50 bg-deep-blue/80 backdrop-blur-sm border-b border-blue-500/20">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
          JD_
        </NuxtLink>
        <div class="flex items-center space-x-6">
          <button @click="toggleTheme" 
                  class="p-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 transition-colors">
            <div v-if="isDark" class="w-5 h-5 text-blue-400">🌙</div>
            <div v-else class="w-5 h-5 text-blue-400">☀️</div>
          </button>
          <nav class="hidden md:flex space-x-8">
            <NuxtLink v-for="item in navItems" :key="item.href" :to="item.href"
              class="text-blue-300 hover:text-blue-100 transition-colors">
              {{ item.name }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const isDark = ref(true)
const navItems = [
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
]

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
</script>