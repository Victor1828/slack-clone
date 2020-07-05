export default {
  Mutation: {
    createTeam: (parent, args, { models, user }, info) => {
      return models.Team.create({ ...args, owner: user.id })
    }
  }
}
