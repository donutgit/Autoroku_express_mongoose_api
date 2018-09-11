const { GraphQLNonNull, GraphQLID } = require("graphql");
const Type = require("../Type");
const Model = require("../Model");

module.exports = removeNomination = {
  type: Type,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve(parentValue, params) {
    const removeNom = Model.findByIdAndRemove(params.id).exec();
    if (!removeNom) {
      throw new Error("Error");
    }
    return removeNom;
  }
};
