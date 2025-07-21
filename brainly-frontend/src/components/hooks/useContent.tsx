import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../config'

export const useContent = () => {
   const [contents, setContents] = useState([])
   const token = localStorage.getItem('token')

   const res = async () => {
      try {
         const response = await axios.get(`${BACKEND_URL}api/v1/content/`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })

         setContents(response.data.fetchContent)
         console.log(response.data)
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      res()
   }, [])
   return { contents, res }
}
