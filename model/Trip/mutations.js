const {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');
const { validate, ValidationError } = require('validator-fluent');
const type = require('./type').schema;
const common_fields = require('./type').common_fields;
const TripFunction = require('./function');
const GraphQLJSON = require('graphql-type-json').GraphQLJSON;
const { errorName } = require('../../middleware/errorContant');
module.exports = {
  createtripstepone: {
    type,
    description: 'Create Trip or say offer ride step one',
    args: {
      driver_id: { type: GraphQLID },
      no_of_seat: { type: GraphQLID },
      from_location: { type: GraphQLString },
      from_lat: { type: GraphQLString },
      from_lng: { type: GraphQLString },
      destination_address: { type: GraphQLString },
      destination_lat: { type: GraphQLString },
      destination_lng: { type: GraphQLString },
      stop: { type: GraphQLJSON },
    },
    resolve: async (parent, args, { verifiedUser }) => {
      if (!verifiedUser) {
        var err = new Error(errorName.UNAUTHRIZED);
        throw err;
      } else {
        const [data, errors] = validate(args, (value) => ({
          driver_id: value('driver_id').notEmpty(),
          no_of_seat: value('no_of_seat').notEmpty(),
          from_location: value('from_location').notEmpty(),
          from_lat: value('from_lat').notEmpty(),
          from_lng: value('from_lng').notEmpty(),
          destination_address: value('destination_address').notEmpty(),
          destination_lat: value('destination_lat').notEmpty(),
          destination_lng: value('destination_lng').notEmpty(),
        }));

        if (Object.keys(errors).length > 0) {
          throw new ValidationError(errors);
        } else {
          args.token_user_id = verifiedUser.user_id;
          return TripFunction.createtripstepone(args);
        }
      }
    },
  },
  createtripsteptwo: {
    type,
    description: 'Create Trip or say offer ride step two',
    args: {
      driver_id: { type: GraphQLID },
      trip_id: { type: GraphQLID },
      trip_type: { type: GraphQLString },
      departure_date_time: { type: GraphQLString },
      return_date_time: { type: GraphQLString },
      trip_schedule: { type: GraphQLString },
      recurring: { type: GraphQLJSON },
    },
    resolve: async (parent, args, { verifiedUser }) => {
      if (!verifiedUser) {
        var err = new Error(errorName.UNAUTHRIZED);
        throw err;
      } else {
        const [data, errors] = validate(args, (value) => ({
          driver_id: value('driver_id').notEmpty(),
          trip_id: value('trip_id').notEmpty(),
          trip_type: value('trip_type').notEmpty(),
          departure_date_time: value('departure_date_time').notEmpty(),
        }));

        if (Object.keys(errors).length > 0) {
          throw new ValidationError(errors);
        } else {
          args.token_user_id = verifiedUser.user_id;
          return TripFunction.createtripsteptwo(args);
        }
      }
    },
  },
  createtripstepfinal: {
    type,
    description: 'Create Trip or say offer ride step four and final',
    args: {
      driver_id: { type: GraphQLID },
      trip_id: { type: GraphQLString },
      luggage_type: { type: GraphQLString },
      back_side_seat_for_two_only: { type: GraphQLString },
      smoking_allow: { type: GraphQLString },
      drinking_allow: { type: GraphQLString },
      pets_allow: { type: GraphQLString },
      reach_on_time: { type: GraphQLString },
      wear_face_mask: { type: GraphQLString },
    },
    resolve: async (parent, args, { verifiedUser }) => {
      if (!verifiedUser) {
        var err = new Error(errorName.UNAUTHRIZED);
        throw err;
      } else {
        const [data, errors] = validate(args, (value) => ({
          driver_id: value('driver_id').notEmpty(),
          trip_id: value('trip_id').notEmpty(),
          //   trip_type: value("trip_type").notEmpty(),
          //   departure_date_time: value("departure_date_time").notEmpty(),
        }));

        if (Object.keys(errors).length > 0) {
          throw new ValidationError(errors);
        } else {
          args.token_user_id = verifiedUser.user_id;
          return TripFunction.createtripstepfinal(args);
        }
      }
    },
  },
  updatetrip: {
    type,
    description: 'update trip',
    args: {
      driver_id: { type: GraphQLID },
      trip_id: { type: GraphQLID },
      vehicle_id: { type: GraphQLID },
      no_of_seat: { type: GraphQLID },
      from_location: { type: GraphQLString },
      from_lat: { type: GraphQLString },
      from_lng: { type: GraphQLString },
      destination_address: { type: GraphQLString },
      destination_lat: { type: GraphQLString },
      destination_lng: { type: GraphQLString },
      departure_date_time: { type: GraphQLString },
    },
    resolve: async (parent, args, { verifiedUser }) => {
      // console.log("req args", args);
      if (!verifiedUser) {
        var err = new Error(errorName.UNAUTHRIZED);
        throw err;
      } else {
        const [data, errors] = validate(args, (value) => ({
          driver_id: value('driver_id').notEmpty(),
          trip_id: value('trip_id').notEmpty(),
        }));

        if (Object.keys(errors).length > 0) {
          throw new ValidationError(errors);
        } else {
          args.token_user_id = verifiedUser.user_id;
          return TripFunction.updatetrip(args);
        }
      }
    },
  },
  requestforbooking: {
    type,
    description: 'Submit booking request',
    args: {
      trip_id: { type: GraphQLInt },
      user_id: { type: GraphQLInt },
      booked_seat: { type: GraphQLInt },
      from_location: { type: GraphQLString },
      from_lat: { type: GraphQLString },
      from_lng: { type: GraphQLString },
      destination_address: { type: GraphQLString },
      destination_lat: { type: GraphQLString },
      destination_lng: { type: GraphQLString },
      base_fare: { type: GraphQLInt },
      extra_amount: { type: GraphQLInt },
      total_fare: { type: GraphQLInt },
      discount_amount: { type: GraphQLInt },
      coupon_id: { type: GraphQLInt },
      coupon_code: { type: GraphQLString },
    },
    resolve: async (parent, args, { verifiedUser }) => {
      if (!verifiedUser) {
        var err = new Error(errorName.UNAUTHRIZED);
        throw err;
      } else {
        const [data, errors] = validate(args, (value) => ({
          user_id: value('user_id').notEmpty(),
          trip_id: value('trip_id').notEmpty(),
          booked_seat: value('booked_seat').notEmpty(),
          from_location: value('from_location').notEmpty(),
          from_lat: value('from_lat').notEmpty(),
          from_lng: value('from_lng').notEmpty(),
          destination_address: value('destination_address').notEmpty(),
          destination_lat: value('destination_lat').notEmpty(),
        }));

        if (Object.keys(errors).length > 0) {
          throw new ValidationError(errors);
        } else {
          args.token_user_id = verifiedUser.user_id;
          return TripFunction.requestforbooking(args);
        }
      }
    },
  },
};
