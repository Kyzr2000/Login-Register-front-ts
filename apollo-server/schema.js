const { gql } = require("apollo-server");
const { MongoClient, ObjectId } = require("mongodb");
const resolvers = {
  Query: {
    async getUsers() {
      const client = await MongoClient.connect("mongodb://127.0.0.1:27017", {
        useNewUrlParser: true,
      });
      const db = client.db("kyzr-form");
      const users = await db.collection("users").find({}).toArray();
      await client.close();
      return users.map((user) => ({
        id: user._id,
        email: user.email,
        password: user.password,
        nickname: user.nickname,
        phone: user.phone,
        gender: user.gender,
      }));
    },
    async getUserByEmail(_, { email }) {
      const client = await MongoClient.connect("mongodb://127.0.0.1:27017", {
        useNewUrlParser: true,
      });
      const db = client.db("kyzr-form");
      const user = await db.collection("users").findOne({ email });
      await client.close();
      if (!user) {
        throw new Error(`User with email ${email} not found`);
      }
      return {
        id: user._id,
        email: user.email,
        password: user.password,
        nickname: user.nickname,
        phone: user.phone,
        gender: user.gender,
      };
    },
  },
  Mutation: {
    async addUser(_, { input }) {
      const client = await MongoClient.connect("mongodb://127.0.0.1:27017", {
        useNewUrlParser: true,
      });
      const db = client.db("kyzr-form");
      const result = await db.collection("users").insertOne(input);
      await client.close();
      return {
        email: input.email,
        password: input.password,
        nickname: input.nickname,
        phone: input.phone,
        gender: input.gender,
      };
    },
  },
};
const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    nickname: String!
    phone: String!
    gender: String!
  }
  type Query {
    getUsers: [User]!
    getUserByEmail(email: String!): User!
  }
  input NewUserInput {
    email: String!
    password: String!
    nickname: String!
    phone: String!
    gender: String!
  }

  type Mutation {
    addUser(input: NewUserInput!): User!
  }
`;

module.exports = { typeDefs, resolvers };
