import axios from 'axios'

export default async({ prefix, endpoint, isLimit }) => {
   const url = `${prefix}/${endpoint}${isLimit ? `?page=${isLimit?.times}&limit=${isLimit?.itemsPerFetch}` : ''}`
   const response = await axios.get(url)
   return response?.data
}

export const fetchAll = async(urls) => {
   const response = await axios.all(urls.map(url => axios.get(url))) 
   return response.map(res => res?.data)
}