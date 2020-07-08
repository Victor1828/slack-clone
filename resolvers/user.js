import crypto from 'crypto'
import { login } from '../auth'

const formatErrors = error => {
  if (error.name) {
    return error.errors.map(error => ({path: error.path, message: error.message}))
  }

  return [{ path: 'unkown', message: 'Something went wrong' }]
}

export default {
  Query: {
    getUser: (parent, { id }, { models }, info) => models.User.findOne({ where: { id } }),
    getAllUsers: (parent, args, { models }, info) => models.User.findAll()
  },
  Mutation: {
    login: (parent, { email, password }, { models }, info) => login(email, password, models),
    registerUser: async (parent, { ...otherArgs, password }, { models }, info) => {
      const salt = crypto.randomBytes(16).toString('hex')
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
      try {
        const user = await models.User.create({ ...otherArgs, password: hashedPassword, salt })
        return {
          success: true,
          user
        }
      } catch (error) {
        let errors = formatErrors(error)
        if (password.length < 8 || password.length > 100) {
          errors = [...errors, { path: 'password', message: 'Password must be between 8 and 100 characters long' }]
        }
        return {
          success: false,
          errors
        }
      }
    }
  }
}
