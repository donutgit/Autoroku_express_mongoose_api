const { GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean } = require("graphql");
const Type = require("../Type");
const Model = require("../Model");

module.exports = addCar = {
  type: Type,
  args: {
    mark: { type: new GraphQLNonNull(GraphQLString) },
    model: { type: new GraphQLNonNull(GraphQLString) },
    nominations: { type: new GraphQLList(GraphQLString) },
    imageUrl: { type: GraphQLString },
    premium: { type: new GraphQLNonNull(GraphQLBoolean) },
    votes: { type: new GraphQLNonNull(GraphQLInt) }
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
