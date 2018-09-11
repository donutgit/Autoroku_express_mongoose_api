const { GraphQLNonNull, GraphQLString } = require("graphql");
const Type = require("../Type");
const Model = require("../Model");

module.exports = register = {
  type: Type,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parentValue, params) {
    const nModel = new Model(params);
    console.log("[register] ", params);
    const newUser = nModel.save();
    if (!newUser) {
      console.log("[REG ERROR]");
      throw new Error("Error");
    }
    return newUser;
  }
};
