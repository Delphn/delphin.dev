<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
/* Base styles */
:root {
  color-scheme: light dark;
  overflow-y: scroll;
  background: var(--page-bg);
}

html {
  scroll-behavior: smooth;
  background: var(--page-bg);
}

body {
  background: var(--page-bg);
}

/* Theme variables */
:root {
  --page-bg: #fff;
}

:root.dark {
  --page-bg: #020420;
}

.grid-background {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: 
    linear-gradient(to right, rgba(147, 51, 234, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(147, 51, 234, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(147, 51, 234, 0.05) 0%,
    rgba(147, 51, 234, 0.03) 50%,
    transparent 100%
  );
}

.grid-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  animation: flashingDots 4s infinite;
}

@keyframes flashingDots {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.15; }
}

.bg-deep-blue {
  background: linear-gradient(to bottom, #020420, #0a1930);
}

:root {
  --primary: rgb(59, 130, 246);
}

.dark {
  --primary: rgb(96, 165, 250);
}

/* Overscroll behavior */
@supports (-webkit-touch-callout: none) {
  /* iOS devices */
  body {
    overscroll-behavior-y: none;
  }
}

/* For browsers that support overscroll-behavior */
@supports (overscroll-behavior-y: contain) {
  html {
    overscroll-behavior-y: contain;
  }
}
</style>

<script setup>
// Set initial theme class
onMounted(() => {
  const isDark = useState('dark').value
  document.documentElement.classList.toggle('dark', isDark)
})

// Watch for theme changes
watch(() => useState('dark').value, (isDark) => {
  document.documentElement.classList.toggle('dark', isDark)
})
</script>