const { GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } = require("graphql");
const Type = require("../Type");
const Model = require("../Model");

// Query
module.exports = RootQuery = {
  car: {
    type: Type,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parentValue, params) {
      const car = Model.findById(params.id).exec();
      if (!car) {
        throw new Error("Error");
      }
      return car;
    }
  },
  cars: {
    type: new GraphQLList(Type),
    resolve() {
      const cars = Model.find().exec();
      if (!cars) {
        throw new Error("Error");
      }
      return cars;
    }
  }
};
