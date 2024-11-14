<template>
  <div :class="[
    'min-h-screen transition-colors duration-300',
    isDark ? 'bg-deep-blue text-blue-100' : 'bg-gray-50 text-gray-900'
  ]">
    <!-- Background effects -->
    <div class="grid-background">
      <div class="grid-overlay"></div>
    </div>

    <!-- Navigation -->
    <Navigation />
    
    <!-- Page content -->
    <slot />
  </div>
</template>

<script setup>
const { isDark } = useTheme()
</script>