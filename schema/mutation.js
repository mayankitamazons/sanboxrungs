const { GraphQLObjectType } = require('graphql');
const UserMutation = require('../model/User/mutations');
const TripMutation = require('../model/Trip/mutations');
// const CategoryMutation = require("../model/Category/mutations");
// const CollectionMutation = require("../model/Collection/mutations");
// const LikeMutation = require("../model/Likes/mutations");
module.exports = new GraphQLObjectType({
  name: 'RootMutationsType',
  fields: {
    register: UserMutation.register,
    login: UserMutation.login,
    socialogin: UserMutation.socialogin,
    forgotpassword: UserMutation.forgotpassword,
    resetpassword: UserMutation.resetpassword,
    usercheck: UserMutation.usercheck,
    updateuser: UserMutation.updateuser,
    submitidverification: UserMutation.submitidverification,
    createtripstepone: TripMutation.createtripstepone,
    createtripstetwo: TripMutation.createtripsteptwo,
    // createtripstepthree: TripMutation.createtripstepthree,
    createtripstepfinal: TripMutation.createtripstepfinal,
    updatetrip: TripMutation.updatetrip,
    requestforbooking: TripMutation.requestforbooking,
    // addcategory: CategoryMutation.addcategory,
    // updatecategory: CategoryMutation.updatecategory,
    // addcollection: CollectionMutation.addcollection,
    // updatecollection: CollectionMutation.updatecollection,
    // increaseviewcount: CollectionMutation.increaseviewcount,
    // addlike: LikeMutation.addlike,
  },
});
