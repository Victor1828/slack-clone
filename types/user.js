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

  type RegisterResponse {
    success: Boolean!
    user: User
    errors: [Error!]
  }

  type LoginResponse {
    success: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }
`
