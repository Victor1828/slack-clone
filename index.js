import express from 'express'
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers'
import db from './models';

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

db.sequelize.sync().then(() => {
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}).catch(err => console.error(err))
