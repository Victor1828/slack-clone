import { gql } from 'apollo-server-express'

export default gql`
  type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel!
    createdAt: String!
  }

  type Mutation {
    createMessage(text: String!, ChannelId: Int!): Message!
  }
`
