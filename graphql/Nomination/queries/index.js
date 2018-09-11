const { GraphQLList, GraphQLID, GraphQLNonNull } = require("graphql");
const Type = require("../Type");
const Model = require("../Model");

// Query
module.exports = nomQuery = {
  nomination: {
    type: Type,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(parentValue, params) {
      const nomination = Model.findById(params.id).exec();
      if (!nomination) {
        throw new Error("Error");
      }
      return nomination;
    }
  },
  nominations: {
    type: new GraphQLList(Type),
    resolve(parentValue, params) {
      const nominations = Model.find().exec();
      if (!nominations) {
        throw new Error("Error");
      }
      return nominations;
    }
  }
};
