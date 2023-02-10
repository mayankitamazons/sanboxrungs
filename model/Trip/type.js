let {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
} = require('graphql');

var auth_data = {
  userId: {
    type: GraphQLString,
  },
  token: {
    type: GraphQLString,
  },
  tokenExpiration: {
    type: GraphQLInt,
  },
};
const common_fields = {
  id: { type: GraphQLID },
  driver_id: { type: new GraphQLNonNull(GraphQLInt) },
  vehicle_id: { type: GraphQLInt },
  from_location: { type: new GraphQLNonNull(GraphQLString) },
  from_lat: { type: new GraphQLNonNull(GraphQLString) },
  from_lng: { type: new GraphQLNonNull(GraphQLString) },
  destination_address: { type: new GraphQLNonNull(GraphQLString) },
  destination_lat: { type: new GraphQLNonNull(GraphQLString) },
  destination_lng: { type: new GraphQLNonNull(GraphQLString) },
  no_of_seat: { type: GraphQLInt },
  trip_type: { type: GraphQLString, default: '1' },
  departure_date_time: { type: new GraphQLNonNull(GraphQLString) },
  return_date_time: { type: new GraphQLNonNull(GraphQLString) },
  price: { type: GraphQLInt },
  parent_id: { type: GraphQLInt },
  status: { type: GraphQLString, default: '1' },
};
const c_schema = new GraphQLObjectType({
  name: 'Trip',
  description: 'trip type',
  fields: common_fields,
});
module.exports = {
  schema: c_schema,
  auth_data: auth_data,
  common_fields: common_fields,
};
