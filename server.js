import { ApolloServer, gql } from "apollo-server";

const tweets = [
  {
    id: "1",
    text: "first one",
  },
  {
    id: "2",
    text: "second one",
  },
  {
    id: "3",
    text: "third one",
  },
];
const typeDefs = gql`
  type User {
    id: ID!
    userbane: String!
    firstName: String!
    lastName: String!
  }
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  type Query {
    allTweets: [Tweet!]
    tweet(id: ID!): Tweet
    ping: String
  }
  type mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    tweet(root, args) {
      const id = args.id;

      console.log(root);
      console.log(args);
      return tweets.find((x) => x.id === id);
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Running on ${url}`));
