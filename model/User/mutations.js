const {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');
const { validate, ValidationError } = require('validator-fluent');
// import { validate, ValidationError } from "validator-fluent";
const type = require('./type').schema;
const verification_schema = require('./type').verification_schema;
const common_fields = require('./type').common_fields;
const UserFunction = require('./function');
const { errorName } = require('../../middleware/errorContant');

module.exports = {
  register: {
    type,
    description: 'Register new user',
    args: {
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      mobile: { type: GraphQLString },
      password: { type: GraphQLString },
      country_code: { type: GraphQLString },
      email: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      const [data, errors] = validate(args, (value) => ({
        first_name: value('first_name')
          .notEmpty()
          .isLength({ min: 3, max: 25 }),
        last_name: value('last_name').notEmpty().isLength({ min: 3, max: 25 }),
        email: value('email').isEmail(),
        mobile: value('mobile').isMobilePhone(),
        country_code: value('country_code').isLength({ min: 2, max: 5 }),
        password: value('password').notEmpty().isLength({ min: 8, max: 12 }),
      }));

      if (Object.keys(errors).length > 0) {
        throw new ValidationError(errors);
      } else {
        return UserFunction.register(args);
      }
    },
  },
  login: {
    type,
    description: 'Login user',
    args: {
      email: { type: GraphQLString },
      mobile: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      var go_ahead = true;
      if (args.mobile) {
        const [data, errors] = validate(args, (value) => ({
          mobile: value('mobile').notEmpty().isMobilePhone(),
        }));
        if (Object.keys(errors).length > 0) {
          throw new ValidationError(errors);
        } else {
          return UserFunction.login(args);
        }
      } else if (args.email) {
        const [data, errors] = validate(args, (value) => ({
          email: value('email').notEmpty().isEmail(),
          password: value('password').notEmpty().isLength({ min: 8, max: 12 }),
        }));
        if (Object.keys(errors).length > 0) {
          throw new ValidationError(errors);
        } else {
          return UserFunction.login(args);
        }
      }
    },
  },
  socialogin: {
    type,
    description: 'Social new user',
    args: {
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      mobile: { type: GraphQLString },
      profile_pic: { type: GraphQLString },
      social_plateform: { type: GraphQLString },
      social_id: { type: new GraphQLNonNull(GraphQLString) },
      country_code: { type: GraphQLString },
      email: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      const [data, errors] = validate(args, (value) => ({
        social_id: value('social_id').notEmpty().isLength({ min: 3, max: 25 }),
        first_name: value('first_name').isLength({ min: 3, max: 25 }),
        // last_name: value("last_name").isLength({ min: 3, max: 25 }),
        email: value('email').isEmail(),
        mobile: value('mobile').isMobilePhone(),
      }));

      if (Object.keys(errors).length > 0) {
        throw new ValidationError(errors);
      } else {
        return UserFunction.socialogin(args);
      }
    },
  },
  forgotpassword: {
    type: GraphQLBoolean,
    description: 'Forgot Password',
    args: {
      email: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      const [data, errors] = validate(args, (value) => ({
        email: value('email').notEmpty().isEmail(),
      }));

      if (Object.keys(errors).length > 0) {
        throw new ValidationError(errors);
      } else {
        return UserFunction.forgotpassword(args);
      }
    },
  },
  usercheck: {
    type: GraphQLBoolean,
    description: 'Check user email ,mobile no',
    args: {
      email: { type: GraphQLString },
      mobile: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      const [data, errors] = validate(args, (value) => ({
        email: value('email').isEmail(),
        mobile: value('mobile').isMobilePhone(),
      }));

      if (Object.keys(errors).length > 0) {
        throw new ValidationError(errors);
      } else {
        return UserFunction.usercheck(args);
      }
    },
  },
  resetpassword: {
    type: GraphQLBoolean,
    description: 'update password',
    args: {
      email: { type: GraphQLString },
      forgotpassword_code: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
      const [data, errors] = validate(args, (value) => ({
        email: value('email').notEmpty().isEmail(),
        forgotpassword_code: value('forgotpassword_code')
          .notEmpty()
          .isLength({ min: 6, max: 6 }),
        password: value('password').notEmpty().isLength({ min: 8, max: 12 }),
      }));

      if (Object.keys(errors).length > 0) {
        throw new ValidationError(errors);
      } else {
        return UserFunction.resetpassword(args);
      }
    },
  },
  updateuser: {
    type,
    description: 'update user',
    args: {
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      mobile: { type: GraphQLString },
      password: { type: GraphQLString },
      country_code: { type: GraphQLString },
      email: { type: GraphQLString },
      profile_pic: { type: GraphQLString },
      gender: { type: GraphQLString },
      location: { type: GraphQLString },
      about: { type: GraphQLString },
      is_driver: { type: GraphQLBoolean },
      smoking: { type: GraphQLBoolean },
      chattingess: { type: GraphQLString },
    },
    resolve: async (parent, args, { verifiedUser }) => {
      // console.log("req args", args);
      if (!verifiedUser) {
        var err = new Error(errorName.UNAUTHRIZED);
        throw err;
      } else {
        const [data, errors] = validate(args, (value) => ({
          first_name: value('first_name').isLength({ min: 3, max: 25 }),
          last_name: value('last_name').isLength({ min: 3, max: 25 }),
          email: value('email').isEmail(),
          mobile: value('mobile').isMobilePhone(),
          country_code: value('country_code').isLength({ min: 2, max: 5 }),
          password: value('password').isLength({ min: 8, max: 12 }),
          about: value('about').isLength({ min: 5, max: 25 }),
        }));

        if (Object.keys(errors).length > 0) {
          throw new ValidationError(errors);
        } else {
          args.user_id = verifiedUser.user_id;
          return UserFunction.updateuser(args);
        }
      }
    },
  },
  submitidverification: {
    type: verification_schema,
    description: 'update Doc for id verification',
    args: {
      first_name_as_id: { type: GraphQLString },
      last_name_as_id: { type: GraphQLString },
      photo_id_image: { type: GraphQLString },
      doc_type: { type: GraphQLString },
      remark: { type: GraphQLString },
    },
    resolve: async (parent, args, { verifiedUser }) => {
      // console.log("req args", args);
      if (!verifiedUser) {
        var err = new Error(errorName.UNAUTHRIZED);
        throw err;
      } else {
        const [data, errors] = validate(args, (value) => ({
          first_name: value('first_name_as_id')
            .notEmpty()
            .isLength({ min: 3, max: 25 }),

          last_name: value('last_name_as_id')
            .notEmpty()
            .isLength({ min: 3, max: 25 }),
          photo_id_image: value('photo_id_image').notEmpty(),
          doc_type: value('doc_type').notEmpty().isLength({ min: 2, max: 25 }),
        }));

        if (Object.keys(errors).length > 0) {
          throw new ValidationError(errors);
        } else {
          args.user_id = verifiedUser.user_id;
          // console.log("user id", args.id);
          return UserFunction.submitidverification(args);
        }
      }
    },
  },
};
