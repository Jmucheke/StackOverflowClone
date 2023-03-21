import Joi, { ref } from 'joi'

export const commentSchema = Joi.object({
 comment: Joi.string().required().
  messages({
   'string.empty': 'Please add a comment'
  }),
 answerId: Joi.string().required().
  messages({
   'string.empty': 'Please add the answerId'
  })

})

export const updateCommentSchema = Joi.object({
 comment: Joi.string().required().
  messages({
   'string.empty': 'Please add a comment'
  }),

})