import { parse } from 'yaml'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      yaml: {
        parse: (content: string) => parse(content)
      }
    }
  }
})