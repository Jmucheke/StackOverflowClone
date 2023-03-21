import Joi, { ref } from 'joi'

export const voteSchema = Joi.object({
 votes: Joi.string().required().
  messages({
   'string.empty': 'Please add a vote'
  }),
 questionId: Joi.string().required().
  messages({
   'string.empty': 'Please add a userId'
  })

})

export const updateVoteSchema = Joi.object({
 votes: Joi.string().required().
  messages({
   'string.empty': 'Please add a vote'
  })

})