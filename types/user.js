import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    createdAt: String!
    teams: [Team!]!
  }

  type Query {
    getUser(id: Int!): User!
    getAllUsers: [User!]!
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): User!
  }
`
