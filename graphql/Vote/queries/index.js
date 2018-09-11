const { GraphQLList, GraphQLID, GraphQLNonNull } = require("graphql");
const Type = require("../Type");
const Model = require("../Model");

// Query
module.exports = RootQuery = {
  vote: {
    type: Type,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(parentValue, params) {
      const vote = Model.findById(params.id).exec();
      if (!vote) {
        throw new Error("Error");
      }
      return vote;
    }
  },
  votes: {
    type: new GraphQLList(Type),
    resolve() {
      const votes = Model.find().exec();
      if (!votes) {
        throw new Error("Error");
      }
      return votes;
    }
  }
};
