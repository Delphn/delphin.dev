import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Only run on client-side
  if (process.server) return

  const firebaseConfig = {
    apiKey: 'AIzaSyDzIraAjVO8L9LdnmxtqHaz53FB7qZrFXI',
    authDomain: 'delphin-website.firebaseapp.com',
    databaseURL: 'https://delphin-website.firebaseio.com',
    projectId: 'delphin-website',
    storageBucket: 'delphin-website.firebasestorage.app',
    messagingSenderId: '220371650817',
    appId: '1:220371650817:web:f935600fb87532c4117300',
    measurementId: 'G-1SMPBDHVT3'
  }

  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)

  // Track initial page view
  logEvent(analytics, 'page_view')

  // Provide analytics instance
  return {
    provide: {
      analytics: {
        logEvent: (eventName: string, eventParams = {}) => {
          logEvent(analytics, eventName, eventParams)
        }
      }
    }
  }
})
