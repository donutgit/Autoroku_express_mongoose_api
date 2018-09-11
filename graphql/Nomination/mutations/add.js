const { GraphQLNonNull, GraphQLString } = require("graphql");
const Type = require("../Type");
const Model = require("../Model");

module.exports = addNomination = {
  type: Type,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parentValue, params) {
    const nModel = new Model(params);
    const newNom = nModel.save();
    if (!newNom) {
      throw new Error("Error");
    }
    return newNom;
  }
};
