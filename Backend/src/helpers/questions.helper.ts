import Joi, { ref } from 'joi'

export const questionSchema = Joi.object({
 title: Joi.string().required().
 messages({
  'string.empty':'Please add a title'
 }),
 description: Joi.string().required().
  messages({
   'string.empty': 'Please add a description'
  }),
 code: Joi.string().required().
  messages({
   'string.empty': 'Please add a code'
  }),
  tagName: Joi.string().required().
    messages({
      'string.empty': 'Please add a tagName'
    })
 
})

export const updateQestionSchema = Joi.object({
 title: Joi.string().required().
  messages({
   'string.empty': 'Please add a title'
  }),
 description: Joi.string().required().
  messages({
   'string.empty': 'Please add a description'
  }),
 code: Joi.string().required().
  messages({
   'string.empty': 'Please add a code'
  })

})