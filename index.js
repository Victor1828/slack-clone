import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import db from './models'
import path from 'path'
import { loadFilesSync, mergeTypeDefs, mergeResolvers } from 'graphql-tools'

const typesArray = loadFilesSync(path.join(__dirname, './types'))
const typeDefs = mergeTypeDefs(typesArray, { all: true })

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));
const resolvers = mergeResolvers(resolversArray);

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models: db.sequelize.models,
    user: { id: 1 }
  }
})

server.applyMiddleware({ app });

db.sequelize.sync().then(() => {
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}).catch(err => console.error(err))
