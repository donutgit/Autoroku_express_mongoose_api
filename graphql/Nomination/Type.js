const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString
} = require("graphql");

// Nomination Type
module.exports = NominationType = new GraphQLObjectType({
  name: "Nomination",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString }
  })
});
