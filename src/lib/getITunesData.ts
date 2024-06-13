import { cache } from "react";

const url = (path: string) => {
  const baseURL = 'https://itunes.apple.com'

  return path.startsWith('/')
    ? baseURL.concat(path)
    : baseURL.concat('/', path)
}

const originUrl = 
  process.env.NODE_ENV === 'production'
    ? 'https://musicall-project.vercel.app'
    : 'http://localhost:3000'

interface getDataFromSearchParams {
  term: string;
  entity: string;
  limit: number;
}
export const getDataFromSearch = cache(async ({
  term, entity, limit
}: getDataFromSearchParams): Promise<any | null> => {

  const params = new URLSearchParams({
    term,
    entity,
    limit: limit.toString()
  })
  
  try {
    const response = await fetch(
      url(`/search?${params}`),
      {
        method: 'GET',
        headers: {
          'Origin': originUrl
        }
      }
    )
    const data = await response.json()
  
    return data
  } catch (error) {
    console.error(error)
    return null
  }
})


interface getDataFromLookupParams {
  id?: number;
  amgArtistId?: number;
  entity?: string;
  limit?: number;
}
export const getDataFromLookup = cache(async ({
  id,
  amgArtistId,
  entity,
  limit 
}: getDataFromLookupParams): Promise<any | null> => {
  
  const params = new URLSearchParams({
    id: id?.toString() || '',
    amgArtistId: amgArtistId?.toString() || '',
    entity: entity?.toString() || '',
    limit: limit?.toString() || '',
  })
    
  try {
    const response = await fetch(
      url(`/lookup?${params}`),
      {
        method: 'GET',
        headers: {
          'Origin': originUrl
        }
      }
      )
    const data = await response.json()
  
    return data
  } catch (error) {
    console.error(error)
    return null
  }
})