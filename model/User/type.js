let {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
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
  first_name: { type: new GraphQLNonNull(GraphQLString) },
  last_name: { type: new GraphQLNonNull(GraphQLString) },
  mobile_no: { type: new GraphQLNonNull(GraphQLString) },
  country_code: { type: GraphQLString },
  email: { type: new GraphQLNonNull(GraphQLString) },
  dob: { type: GraphQLString }, // mm/dd/yyyy
  people_driven: { type: GraphQLInt },
  rides_taken: { type: GraphQLInt },
  km_shared: { type: GraphQLInt },
  login_method: { type: GraphQLString },
  social_id: { type: GraphQLString },
  profile_pic: { type: GraphQLString },
  gender: { type: GraphQLString },
  userRole: { type: GraphQLInt },
  about: { type: GraphQLString },
  location: { type: GraphQLString },
  smoking: { type: GraphQLBoolean },
  chattingess: { type: GraphQLString },
  message: { type: GraphQLString },
  statusCode: { type: GraphQLInt },
  token: { type: GraphQLString },
  password: { type: GraphQLString },
  is_driver: { type: GraphQLBoolean },
  driver_id_verified: { type: GraphQLBoolean },
};
const c_schema = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: common_fields,
});
const verification_schema = new GraphQLObjectType({
  name: 'UserVerification',
  description: 'User Verification doc',
  fields: {
    id: { type: GraphQLID },
    user_id: { type: GraphQLID },
    first_name_as_id: { type: GraphQLString },
    last_name_as_id: { type: GraphQLString },
    photo_id_image: { type: GraphQLString },
    doc_type: { type: GraphQLString },
    remark: { type: GraphQLString },
    status: { type: GraphQLInt },
  },
});
module.exports = {
  schema: c_schema,
  verification_schema: verification_schema,
  auth_data: auth_data,
  common_fields: common_fields,
};
