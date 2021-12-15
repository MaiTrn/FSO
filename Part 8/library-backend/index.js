const { ApolloServer } = require("apollo-server-express");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const cors = require("cors");

const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const { MONGODB_URI, JWT_SECRET, PORT } = require("./config");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB: ", error.message);
  });
(async () => {
  const app = express();
  const httpServer = createServer(app);

  app.use(cors());

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const subServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    { server: httpServer, path: "/graphql" }
  );

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
    },
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subServer.close();
            },
          };
        },
      },
    ],
  });
  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
    console.log(`Subscriptions ready at  ws://localhost:${PORT}/graphql`);
  });
})();
