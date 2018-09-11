const { GraphQLList, GraphQLID, GraphQLNonNull } = require("graphql");
const Type = require("../Type");
const Model = require("../Model");

// Query
module.exports = userQuery = {
  user: {
    type: Type,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(parentValue, params) {
      const user = Model.findById(params.id).exec();
      if (!user) {
        throw new Error("Error");
      }
      return user;
    }
  },
  users: {
    type: new GraphQLList(Type),
    resolve(parentValue, params) {
      const users = Model.find().exec();
      if (!users) {
        throw new Error("Error");
      }
      return users;
    }
  }
};
