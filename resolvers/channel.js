export default {
  Mutation: {
    createChannel: (parent, args, { models }, info) => models.Channel.create(args)
  }
}
