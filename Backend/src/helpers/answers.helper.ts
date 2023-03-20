import Joi, { ref } from 'joi'

export const answerSchema = Joi.object({
 description: Joi.string().required().
  messages({
   'string.empty': 'Please add a description'
  }),
 code: Joi.string().required().
  messages({
   'string.empty': 'Please add a code'
  }),
 userId: Joi.string().required().
  messages({
   'string.empty': 'Please add a userId'
  }),
  questionId: Joi.string().required().
  messages({
   'string.empty': 'Please add a userId'
  })

})

export const updateAnswerSchema = Joi.object({
 description: Joi.string().required().
  messages({
   'string.empty': 'Please add a description'
  }),
 code: Joi.string().required().
  messages({
   'string.empty': 'Please add a code'
  })

})