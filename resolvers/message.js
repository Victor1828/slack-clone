export default {
  Mutation: {
    createMessage: (parent, args, { models, user }, info) => models.Message.create({ ...args, UserId: user.id })
  }
}
