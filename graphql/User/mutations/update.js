const { GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");
const Type = require("../Type");
const Model = require("../Model");

module.exports = updateNomination = {
  type: Type,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parentValue, params) {
    return Model.findByIdAndUpdate(
      params.id,
      { $set: { name: params.name } },
      {
        new: true
      }
    ).catch(err => new Error(err));
  }
};
