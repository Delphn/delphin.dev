<template>
  <div :class="[
    'min-h-screen w-full transition-colors duration-300 overflow-x-hidden',
    isDark ? 'bg-deep-blue text-blue-100' : 'bg-gray-50 text-gray-900'
  ]">
    <!-- Background effects -->
    <div class="grid-background">
      <div class="grid-overlay"></div>
    </div>

    <!-- Navigation -->
    <Navigation />
    
    <!-- Page content -->
    <div class="relative w-full">
      <slot />
    </div>

    <!-- Scroll to top button -->
    <ScrollToTop />
  </div>
</template>

<script setup>
import ScrollToTop from '~/components/ScrollToTop.vue'
const { isDark } = useTheme()
</script>

<style scoped>
/* Mobile responsiveness fixes */
@media (max-width: 879px) {
  div {
    max-width: 100vw;
    overflow-x: hidden;
  }
}
</style>