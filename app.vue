<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue'

// Initialize analytics tracking
const { trackEvent } = useAnalytics()

onMounted(() => {
  // Track page view on initial load
  trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname
  })
})

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

<style>
/* Base styles */
:root {
  color-scheme: light dark;
  overflow-x: hidden;
  background: var(--page-bg);
  width: 100%;
}

html {
  scroll-behavior: smooth;
  background: var(--page-bg);
  overflow-x: hidden;
  width: 100%;
  -webkit-text-size-adjust: 100%;
  touch-action: manipulation;
}

body {
  background: var(--page-bg);
  overflow-x: hidden;
  width: 100%;
  position: relative;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  background: radial-gradient(circle at 50% 50%,
      rgba(147, 51, 234, 0.05) 0%,
      rgba(147, 51, 234, 0.03) 50%,
      transparent 100%);
}

.grid-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  animation: flashingDots 4s infinite;
}

@keyframes flashingDots {

  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 0.15;
  }
}

.bg-deep-blue {
  background: linear-gradient(to bottom, #020420, #0a1930);
}

:root {
  --primary: rgb(59, 130, 246);
  --page-bg: #fff;
}

.dark {
  --primary: rgb(96, 165, 250);
  --page-bg: #020420;
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

/* Mobile responsiveness fixes */
@media (max-width: 879px) {
  .container {
    width: 100%;
    max-width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .grid {
    margin-left: 0;
    margin-right: 0;
  }

  /* Prevent horizontal scrolling */
  html, body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  /* Fix iOS Safari 100vh issue */
  .min-h-screen {
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
}

/* iOS Safari viewport height fix */
@supports (-webkit-touch-callout: none) {
  .min-h-screen {
    min-height: -webkit-fill-available;
  }
}
</style>