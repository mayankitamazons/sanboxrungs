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
const verification_schema = require('./type').verification_schema;
const { validate, ValidationError } = require('validator-fluent');
const { errorName } = require('../../middleware/errorContant');

const UserFunction = require('./function');

// Defines the queries
var c_fields = {
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
  // users: {
  //   type: new GraphQLList(type),
  //   description: 'Retrieves list of users',
  //   resolve(parent, args) {
  //     return UserFunction.find();
  //   },
  // },
  user: {
    type,
    description: 'Retrieves one user',
    args: { user_id: { type: GraphQLID } },
    resolve: async (parent, args, { verifiedUser }) => {
      // resolve(parent, args) {
      if (!verifiedUser) {
        var err = new Error(errorName.UNAUTHRIZED);
        throw err;
        // throw new Error("Unauthenticated");
      } else {
        const [data, errors] = validate(args, (value) => ({
          user_id: value('user_id').notEmpty(),
        }));
        if (Object.keys(errors).length > 0) {
          throw new ValidationError(errors);
        } else {
          args.token_user_id = verifiedUser.user_id;
          return UserFunction.userdetail(args);
        }
      }
    },
  },
  verificationdetail: {
    type: verification_schema,
    description: 'Verification Doc detail',
    args: {
      user_id: { type: GraphQLID },
      doc_type: { type: GraphQLString },
    },
    resolve: async (parent, args, { verifiedUser }) => {
      // resolve(parent, args) {
      if (!verifiedUser) {
        var err = new Error(errorName.UNAUTHRIZED);
        throw err;
        // throw new Error("Unauthenticated");
      } else {
        const [data, errors] = validate(args, (value) => ({
          user_id: value('user_id').notEmpty(),
        }));
        if (Object.keys(errors).length > 0) {
          throw new ValidationError(errors);
        } else {
          args.token_user_id = verifiedUser.user_id;
          return UserFunction.verificationdetail(args);
        }
      }
    },
  },
  // versioncheck: {
  //   type: home_schema,
  //   args: {
  //     partner_id: {
  //       type: GraphQLInt,
  //     },
  //     app_ver: {
  //       type: new GraphQLNonNull(GraphQLInt),
  //     },
  //   },
  //   resolve: async (parent, args) => {
  //     var is_force = true;
  //     var live_ver = 2;
  //     var app_ver = args.app_ver;
  //     if (is_force == true && live_ver > app_ver) {
  //       var ver_message =
  //         "Dear User,To Continue using app you have to upgrade it to latest version";
  //       return { statusCode: 201, message: ver_message };
  //     } else if (live_ver > app_ver) {
  //       var ver_message =
  //         "Dear User,We have added few cool features . To experience them, we request you to kindly update your app";
  //       return { statusCode: 202, message: ver_message };
  //     } else {
  //       return { statusCode: 200, message: "No New Version" };
  //     }
  //   },
  // },
};
