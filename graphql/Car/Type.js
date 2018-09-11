const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = require("graphql");

// Nomination Type
module.exports = CarType = new GraphQLObjectType({
  name: "Car",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    mark: { type: new GraphQLNonNull(GraphQLString) },
    model: { type: new GraphQLNonNull(GraphQLString) },
    nominations: { type: new GraphQLList(GraphQLString) },
    imageUrl: { type: GraphQLString },
    premium: { type: new GraphQLNonNull(GraphQLBoolean) },
    votes: { type: new GraphQLNonNull(GraphQLInt) },
    date: { type: GraphQLString }
  })
});
