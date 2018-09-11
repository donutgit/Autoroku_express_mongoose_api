const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLBoolean } = require("graphql");
const Type = require("../Type");
const Model = require("../Model");

module.exports = updateCar = {
  type: Type,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    mark: { type: GraphQLString },
    model: { type: GraphQLString },
    nominations: { type: new GraphQLList(GraphQLString) },
    imageUrl: { type: GraphQLString },
    premium: { type: GraphQLBoolean },
    votes: { type: GraphQLInt }
  },
  resolve(parentValue, params) {
    return Model.findByIdAndUpdate(
      params.id,
      { $set: params },
      {
        new: true
      }
    ).catch(err => new Error(err));
  }
};
