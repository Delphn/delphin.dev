import { ref, computed } from 'vue'

export const useBooks = () => {
  // Initialize with empty array to ensure it's always an array
  const books = ref([
    {
      title: "Quantum Computing: A Gentle Introduction",
      author: "Eleanor G. Rieffel & Wolfgang H. Polak",
      cover: "https://picsum.photos/seed/quantum/400/600",
      category: "Computer Science",
      rating: 4.8,
      tags: ["quantum", "computing", "future"],
      description: "Dive into the fascinating world of quantum computing. This book bridges the gap between theoretical physics and practical applications in computer science.",
      impact: "Transforms your understanding of computation possibilities",
      quote: "The future is not just coming; it's already being computed."
    },
    {
      title: "The Pattern Language of Programming",
      author: "Richard P. Gabriel",
      cover: "https://picsum.photos/seed/pattern/400/600",
      category: "Software Design",
      rating: 4.9,
      tags: ["patterns", "architecture", "design"],
      description: "A masterpiece that reveals the hidden patterns in software design, showing how great architectures emerge from understanding fundamental patterns.",
      impact: "Changes how you think about software architecture",
      quote: "Every line of code tells a story; make it a masterpiece."
    },
    {
      title: "Neural Networks and Deep Learning",
      author: "Michael Nielsen",
      cover: "https://picsum.photos/seed/neural/400/600",
      category: "Artificial Intelligence",
      rating: 4.7,
      tags: ["AI", "machine-learning", "future"],
      description: "An in-depth exploration of neural networks and deep learning, making complex concepts accessible while maintaining technical depth.",
      impact: "Opens your mind to AI's true potential",
      quote: "The future belongs to those who understand how machines learn."
    },
    {
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      author: "Robert C. Martin",
      cover: "https://picsum.photos/seed/clean/400/600",
      category: "Software Engineering",
      rating: 4.9,
      tags: ["coding", "best-practices", "craftsmanship"],
      description: "The definitive guide to writing code that's a joy to read and maintain. Learn the principles that separate good code from great code.",
      impact: "Elevates your coding standards forever",
      quote: "Code is like poetry; it should be elegant and efficient."
    }
  ])
  
  const selectedCategories = ref([])

  const uniqueCategories = computed(() => {
    return [...new Set(books.value.map(book => book.category))]
  })

  const filteredBooks = computed(() => {
    if (selectedCategories.value.length === 0) return books.value
    return books.value.filter(book => selectedCategories.value.includes(book.category))
  })

  const toggleCategory = (category: string) => {
    const index = selectedCategories.value.indexOf(category)
    if (index === -1) {
      selectedCategories.value.push(category)
    } else {
      selectedCategories.value.splice(index, 1)
    }
  }

  return {
    books,
    selectedCategories,
    uniqueCategories,
    filteredBooks,
    toggleCategory
  }
}