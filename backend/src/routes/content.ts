import express from 'express'
import { Content, Tags } from '../db/schema'
import { UserMiddleWare } from '../utils/middleware'
import { ResponseCode } from '../utils/utils'
import { handleTagId } from '../utils/handleTags'

export const contentRouter = express.Router()

contentRouter.post('/', UserMiddleWare, async (req, res) => {
   const { type, link, title, tags } = req.body
   const userId = req.userId

   try {
      // This function return tagIds
      const handleTag = await handleTagId(tags)

      const addContent = await Content.create({
         type: type,
         link: link,
         title: title,
         tags: handleTag,
      })

      res.status(ResponseCode.Success).json({
         msg: 'Added content successfully',
      })
   } catch (error) {
      console.error(error)
   }
})
contentRouter.get('/', (req, res) => {})
contentRouter.delete('/', (req, res) => {})
