import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

export const debugModelPath = async (path) => {
  try {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const text = await response.text()
    console.log('Model file found:', {
      path,
      size: text.length,
      preview: text.slice(0, 100)
    })
    return true
  } catch (error) {
    console.error('Error checking model path:', error)
    return false
  }
}

export const createModelLoader = (onProgress) => {
  const loader = new OBJLoader()
  
  loader.onProgress = (url, loaded, total) => {
    console.log(`Loading model: ${Math.round((loaded / total) * 100)}%`)
    onProgress?.(loaded / total)
  }

  return loader
}