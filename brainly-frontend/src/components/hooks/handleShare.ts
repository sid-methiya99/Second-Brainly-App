import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../../config'
import { token } from './handleFormSubmission'
import type { CardProps } from '../Card'
import { handleBrainLink } from './handleBrainLink'
export const handleShare = async () => {
   const [contents, setContents] = useState<CardProps[]>([])
   const hash = await handleBrainLink(true)

   const createUrl = `${BACKEND_URL}`
}
