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
         userId: userId,
      })

      res.status(ResponseCode.Success).json({
         msg: 'Added content successfully',
      })
   } catch (error) {
      console.error(error)
   }
})

contentRouter.get('/', UserMiddleWare, async (req, res) => {
   const userId = req.userId

   try {
      const fetchContent = await Content.find({
         userId: userId,
      }).populate('userId', 'username')

      res.status(ResponseCode.Success).json({
         fetchContent,
      })
   } catch (error) {
      console.error(error)
   }
})

contentRouter.delete('/', UserMiddleWare, async (req, res) => {
   const contentId = req.body.contentId
   const userId = req.userId

   try {
      const deleteContent = await Content.findByIdAndDelete({
         _id: contentId,
         userId: userId,
      })

      if (!deleteContent) {
         return res.status(ResponseCode.NotFound).json({
            msg: 'Content not found',
         })
      }

      res.status(ResponseCode.Success).json({
         msg: 'Content deleted successfully',
      })
   } catch (error) {
      console.error(error)
   }
})
