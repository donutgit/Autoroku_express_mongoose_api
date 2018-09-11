const { GraphQLNonNull, GraphQLString } = require("graphql");
const Type = require("../LoginType");
const { tryLogin } = require("../../../auth");

module.exports = login = {
  type: Type,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parent, { email, password }, { SECRET, SECRET2 }) {
    return tryLogin(email, password, SECRET, SECRET2);
  }
};
