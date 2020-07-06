import crypto from 'crypto'

export default {
  Query: {
    getUser: (parent, { id }, { models }, info) => models.User.findOne({ where: { id } }),
    getAllUsers: (parent, args, { models }, info) => models.User.findAll()
  },
  Mutation: {
    registerUser: (parent, { ...otherArgs, password }, { models }, info) => {
      const salt = crypto.randomBytes(16).toString('hex')
      const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
      return models.User.create({ ...otherArgs, password: hashedPassword, salt })
    }
  }
}
