const { GraphQLNonNull, GraphQLString } = require("graphql");
const GraphQLJSON = require("graphql-type-json");
const BigInt = require("graphql-bigint");
const Type = require("../Type");
const Model = require("../Model");

module.exports = addCar = {
  type: Type,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(BigInt) },
    voteResult: { type: new GraphQLNonNull(GraphQLJSON) }
  },
  resolve(parentValue, params) {
    const nModel = new Model(params);
    const addNew = nModel.save();
    if (!addNew) {
      throw new Error("Error");
    }
    return addNew;
  }
};
