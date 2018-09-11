const { GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const BigInt = require("graphql-bigint");
const Type = require("../Type");
const Model = require("../Model");

module.exports = updateNomination = {
  type: Type,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: BigInt },
    voteResult: { type: GraphQLJSON }
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
