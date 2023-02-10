const {
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLInt,
} = require('graphql');
const type = require('./type').schema;
const GraphQLJSON = require('graphql-type-json').GraphQLJSON;
const { errorName } = require('../../middleware/errorContant');
// const User = require("./model");
const TripFunction = require('./function');
// const User = require("./users");
// Defines the queries
var c_fields = {
  list: {
    type: GraphQLJSON,
  },
  statusCode: {
    type: GraphQLInt,
  },
  message: {
    type: GraphQLString,
  },
};
var home_schema = new GraphQLObjectType({
  name: 'BaseModel',
  description: 'Base model',
  fields: c_fields,
});
module.exports = {
  findtriplist: {
    type: home_schema,
    description: 'Retrieves Nearest trip list',
    args: {
      user_id: { type: GraphQLID },
      user_address: { type: GraphQLString },
      user_lat: { type: GraphQLString },
      user_lng: { type: GraphQLString },
      user_destination_address: { type: GraphQLString },
      user_destination_lat: { type: GraphQLString },
      user_destination_lng: { type: GraphQLString },
      user_departure_date_time: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      return TripFunction.findtriplist(args);
    },
  },
};
