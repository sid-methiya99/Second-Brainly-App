import express from 'express'
import { Content, Tags } from '../db/schema'
import { UserMiddleWare } from '../utils/middleware'
import { ResponseCode } from '../utils/utils'
import { handleTagId } from '../utils/handleTags'
import { ContentValidation } from '../utils/zodTypes'

export const contentRouter = express.Router()

contentRouter.post('/', UserMiddleWare, async (req, res) => {
   const { type, link, title, tags } = req.body
   const userId = req.userId

   const contentValidation = ContentValidation.safeParse({
      type,
      link,
      title,
      tags,
   })

   if (!contentValidation.success) {
      return res.status(ResponseCode.InputError).json({
         msg: 'Invalid inputs',
      })
   }

   try {
      // This function return tagIds
      const handleTag = await handleTagId(tags)
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      let month = currentDate.getMonth() + 1 // Months are 0-indexed, so add 1
      let day = currentDate.getDate()

      // Add leading zeros if month or day is less than 10
      if (month < 10) {
         month = parseInt('0' + month)
      }
      if (day < 10) {
         day = parseInt('0' + day)
      }

      const formattedDate = `${day}-${month}-${year}`
      const addContent = await Content.create({
         type: type,
         link: link,
         title: title,
         tags: handleTag,
         userId: userId,
         date: formattedDate,
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
