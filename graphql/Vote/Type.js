const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const BigInt = require("graphql-bigint");

module.exports = VoteType = new GraphQLObjectType({
  name: "Vote",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(BigInt) },
    voteResult: { type: GraphQLJSON },
    date: { type: GraphQLString }
  })
});
