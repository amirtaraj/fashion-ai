import axios from 'axios'
import { BASE_URL } from './endpoints'

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

// Text search
export async function searchText(query) {
  try {
    const res = await client.post('/search/text', { query })
    return res.data
  } catch (err) {
    console.warn('searchText failed', err.message)
    const { mockResults } = await import('../data/mockData')
    return { results: mockResults, recommendations: mockResults.slice(0,3) }
  }
}

// Image search (multipart)
export async function searchImage(file) {
  try {
    const fd = new FormData()
    fd.append('file', file)
    const res = await axios.post((BASE_URL || '') + 'search/image', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return res.data
  } catch (err) {
    console.warn('searchImage failed', err.message)
    const { mockResults } = await import('../data/mockData')
    return { results: mockResults, recommendations: mockResults.slice(0,3) }
  }
}

// Chat
export async function chat(query) {
  try {
    const res = await client.post('/chat', { query })
    return res.data
  } catch (err) {
    console.warn('chat failed', err.message)
    return { answer: 'Chat unavailable — mock reply.', products: [] }
  }
}

// Inventory fetch
export async function getInventory(product_id) {
  try {
    const res = await client.get(`/inventory/${product_id}`)
    return res.data
  } catch (err) {
    console.warn('getInventory failed', err.message)
    return null
  }
}

// (BASE_URL is exported from ./endpoints.js)
