export const useAnalytics = () => {
  const { $analytics } = useNuxtApp()

  const trackEvent = (eventName: string, eventParams = {}) => {
    if (process.client && $analytics) {
      $analytics.logEvent(eventName, eventParams)
    }
  }

  return {
    trackEvent
  }
}