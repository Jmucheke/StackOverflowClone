import Joi, { ref } from 'joi'


export const RegistrationSchema = Joi.object({
 Name: Joi.string().required(),
 Email: Joi.string().required().email().messages({
  'string.empty': ' Please add an Email',
  'string.email': 'Not a Valid Email'
 }),
 Password: Joi.string().required().pattern(new
  RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')),

 ConfirmPassword: Joi.equal(ref('Password'))
})

export const LoginSchema = Joi.object({
 Email: Joi.string().required().email().messages({
  'string.empty': ' Please add an Email',
  'string.email': 'Not a Valid Email'
 }),
 Password: Joi.string().required(),

})

export const UpdateSchema = Joi.object({
 name: Joi.string().required(),
 email: Joi.string().required().email().messages({
  'string.empty': ' Please add an Email',
  'string.email': 'Not a Valid Email'
 }),
 password: Joi.string().required().pattern(new
  RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')),

 confirmPassword: Joi.equal(ref('password'))
})
