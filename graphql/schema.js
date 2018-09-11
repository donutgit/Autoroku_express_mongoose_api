const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema } = graphql;

const Queries = {
  ...require("./Nomination/queries"),
  ...require("./Car/queries"),
  ...require("./Vote/queries"),
  ...require("./User/queries")
};
const Mutations = {
  ...require("./Nomination/mutations"),
  ...require("./Car/mutations"),
  ...require("./Vote/mutations"),
  ...require("./User/mutations")
};

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: Queries
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: Mutations
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
