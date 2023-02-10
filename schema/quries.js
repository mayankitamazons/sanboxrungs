const { GraphQLObjectType } = require('graphql');
const Userquires = require('../model/User/queries');
const Tripquires = require('../model/Trip/queries');
// const Categoryquires = require("../model/Category/queries");
// const Collectionquires = require("../model/Collection/queries");

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // users: Userquires.users,
    user: Userquires.user,
    verificationdetail: Userquires.verificationdetail,
    findtriplist: Tripquires.findtriplist,
    // categorylist: Categoryquires.categorylist,
    // getcategorydetail: Categoryquires.getcategorydetail,
    // usercollectionlist: Collectionquires.usercollectionlist,
    // collectionlist: Collectionquires.collectionlist,
    // collectionlistwithfilter: Collectionquires.collectionlistwithfilter,
    // searchcollection: Collectionquires.searchcollection,
    // getcollectiondetail: Collectionquires.getcollectiondetail,
  },
});
