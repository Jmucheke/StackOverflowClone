import Joi, { ref } from 'joi'

export const commentSchema = Joi.object({
 comment: Joi.string().required().
  messages({
   'string.empty': 'Please add a comment'
  }),
 answerId: Joi.string().required().
  messages({
   'string.empty': 'Please add the answerId'
  }),
 userId: Joi.string().required().
  messages({
   'string.empty': 'Please add a userId'
  })

})

export const updateCommentSchema = Joi.object({
 comment: Joi.string().required().
  messages({
   'string.empty': 'Please add a comment'
  }),

})