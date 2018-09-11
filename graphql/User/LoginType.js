const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt
} = require("graphql");
const GraphQLJSON = require("graphql-type-json");

// Nomination Type
module.exports = Type = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    ok: { type: GraphQLBoolean },
    token: { type: GraphQLString },
    refToken: { type: GraphQLString },
    exp: { type: GraphQLInt },
    errors: { type: GraphQLJSON }
  })
});
