const jwt = require('jsonwebtoken');
const moment = require('moment');
const Query = require('../../lib/query');
const { errorName } = require('../../middleware/errorContant');

exports.createtripstepone = async function (args) {
  if (args.driver_id == args.token_user_id) {
    var userdata = await Query.findsinglerecord('users', {
      id: args.token_user_id,
    });
    if (userdata) {
      // check driver profile is active or not
      if (userdata.status == '1') {
        if (userdata.driver_id_verified) {
          let tripData = {
            driver_id: args.driver_id,
            from_location: args.from_location,
            from_lat: args.from_lat,
            from_lng: args.from_lng,
            destination_address: args.destination_address,
            destination_lat: args.destination_lat,
            destination_lng: args.destination_lng,
            no_of_seat: args.no_of_seat,
          };
          let insertresult = await Query.insert('trips', {
            data: tripData,
          });

          if (insertresult.affectedRows > 0) {
            var stops = [];
            if (args.stop) {
              args.stop.forEach((stop) => {
                var stopList = {
                  trip_id: insertresult.insertId,
                  destination_address: stop.destination_address,
                  destination_lat: stop.destination_lat,
                  destination_lng: stop.destination_lng,
                  price: stop.price,
                  no_of_seat: args.no_of_seat,
                };
                stops.push(stopList);
              });
              if (stops.length > 0) {
                let bulkInsert = await Query.bulkInsert('trip_stops', {
                  data: stops,
                });
              }
            }
            var trip = await Query.findsinglerecord('trips', {
              id: insertresult.insertId,
            });
            return trip;
          } else {
            var err = new Error(errorName.WENT_WRONG);
            throw err;
          }
        } else {
          var err = new Error(errorName.DRIVER_ID_NOT_VERIFIED);
          throw err;
        }
      } else {
        var err = new Error(errorName.ACCOUNT_NOT_ACTIVE);
        throw err;
      }
    }
  } else {
    var err = new Error(errorName.UNAUTHRIZED);
    throw err;
  }
};
exports.createtripsteptwo = async function (args) {
  if (args.driver_id == args.token_user_id) {
    var trecord = await Query.findsinglerecord('trips', {
      driver_id: args.token_user_id,
      id: args.trip_id,
    });
    if (trecord) {
      let tripData = {
        trip_type: args.trip_type,
        trip_schedule: args.trip_schedule,
        departure_date_time: args.departure_date_time,
        return_date_time: args.return_date_time,
      };
      var updatetrip = await Query.update('trips', {
        data: tripData,
        id: args.trip_id,
      });
      if (updatetrip.affectedRows > 0) {
        var recurrings = [];
        if (args.recurring) {
          args.recurring.forEach((recurring) => {
            var recurringList = {
              trip_id: args.trip_id,
              trip_date: recurring.trip_date,
            };
            recurrings.push(recurringList);
          });
          if (recurrings.length > 0) {
            let bulkInsert = await Query.bulkInsert('recurring_trips', {
              data: recurrings,
            });
          }
        }
        var trip = await Query.findsinglerecord('trips', {
          id: args.trip_id,
        });
        return trip;
      } else {
        var err = new Error(errorName.WENT_WRONG);
        throw err;
      }
    } else {
      var err = new Error(errorName.NOTFOUND);
      throw err;
    }
  } else {
    var err = new Error(errorName.UNAUTHRIZED);
    throw err;
  }
};
exports.createtripstepfinal = async function (args) {
  if (args.driver_id == args.token_user_id) {
    let tripData = {
      trip_id: args.trip_id,
      luggage_type: args.luggage_type,
      back_side_seat_for_two_only: args.back_side_seat_for_two_only,
      smoking_allow: args.smoking_allow,
      drinking_allow: args.drinking_allow,
      pets_allow: args.pets_allow,
      reach_on_time: args.reach_on_time,
      wear_face_mask: args.wear_face_mask,
    };

    let insertresult = await Query.insert('trip_facilities', {
      data: tripData,
    });

    if (insertresult) {
      var updatetrip = await Query.update('trips', {
        data: { status: '1' },
        id: args.trip_id,
      });

      var trip = await Query.findsinglerecord('trips', {
        id: args.trip_id,
      });
      return trip;
    } else {
      var err = new Error(errorName.WENT_WRONG);
      throw err;
    }
  } else {
    var err = new Error(errorName.UNAUTHRIZED);
    throw err;
  }
};
exports.updatetrip = async function (args) {
  if (args.driver_id == args.token_user_id) {
    var trecord = await Query.findsinglerecord('trips', {
      driver_id: args.token_user_id,
      id: args.trip_id,
    });
    if (trecord) {
      var t = {};
      if (args.no_of_seat) t.no_of_seat = args.no_of_seat;
      if (args.from_location) t.from_location = args.from_location;
      if (args.from_lat) t.from_location = args.from_lat;
      if (args.from_lng) t.from_location = args.from_lng;
      if (args.destination_address) t.from_location = args.destination_address;
      if (args.destination_lat) t.from_location = args.destination_lat;
      if (args.destination_lng) t.from_location = args.destination_lng;
      if (args.departure_date_time) t.from_location = args.departure_date_time;
      if (args.vehicle_id) t.from_location = args.vehicle_id;
      var updatetrip = await Query.update('trips', {
        data: t,
        id: args.trip_id,
        driver_id: args.driver_id,
      });
      if (updatetrip.affectedRows > 0) {
        var trip = await Query.findsinglerecord('trips', {
          id: args.trip_id,
        });
        return trip;
      } else {
        var err = new Error(errorName.WENT_WRONG);
        throw err;
      }
    } else {
      var err = new Error(errorName.NOTFOUND);
      throw err;
    }
  } else {
    var err = new Error(errorName.UNAUTHRIZED);
    throw err;
  }
};
exports.findtriplist = async function (args) {
  let tripFindData = {
    user_id: args.user_id,
    user_address: args.user_address,
    user_lat: args.user_lat,
    user_lng: args.user_lng,
    user_destination_address: args.user_destination_address,
    user_destination_lat: args.user_destination_lat,
    user_destination_lng: args.user_destination_lng,
    user_departure_date_time: args.user_departure_date_time,
  };

  let insertresult = await Query.insert('trip_find_request', {
    data: tripFindData,
  });

  // from and destination from same table
  var queryForTripTable =
    'SELECT trips.id, trips.driver_id,trips.from_location,trips.from_lat,trips.from_lng,trips.destination_address,trips.destination_lat,trips.destination_lng,users.first_name,users.middle_name,users.last_name,users.total_ride_taken,round(SQRT( POW(69.1 * (trips.from_lat - ' +
    args.user_lat +
    '), 2) + POW(69.1 * (' +
    args.user_lng +
    ' - trips.from_lng) * COS(trips.from_lat / 57.3), 2)),2) AS startPointDistance,trips.price,trips.no_of_seat,round(SQRT( POW(69.1 * (trips.destination_lat - ' +
    args.user_destination_lat +
    '), 2) + POW(69.1 * (' +
    args.user_destination_lng +
    ' - trips.destination_lng) * COS(trips.destination_lat / 57.3), 2)),2) AS endPointDistance FROM  `trips` LEFT JOIN users on users.id = trips.driver_id HAVING startPointDistance < 1 and endPointDistance < 1 order by startPointDistance';

  var queryForTripTableResult = await Query.queryForList(queryForTripTable);

  // console.log("queryForTripTableResult",queryForTripTableResult)
  //from point in stop table and destination in trip table
  var queryForTripStopTable =
    'select trips.id, trips.driver_id,trip_stops.destination_address as from_location,trip_stops.destination_lat as from_lat,trip_stops.destination_lng as from_lng,trips.destination_address,trips.destination_lat,trips.destination_lng,users.first_name,users.middle_name,users.last_name,users.total_ride_taken,round(SQRT( POW(69.1 * (trip_stops.destination_lat -  ' +
    args.user_lat +
    '), 2) + POW(69.1 * (' +
    args.user_lng +
    ' - trip_stops.destination_lng) * COS(trip_stops.destination_lat / 57.3), 2)),2) AS startPointDistance,trip_stops.price,trip_stops.no_of_seat,round(SQRT( POW(69.1 * (trips.destination_lat - ' +
    args.user_destination_lat +
    '), 2) + POW(69.1 * (' +
    args.user_destination_lng +
    ' - trips.destination_lng) * COS(trips.destination_lat / 57.3), 2)),2) AS endPointDistance FROM trip_stops LEFT JOIN trips on trips.id = trip_stops.trip_id LEFT JOIN users on users.id = trips.driver_id HAVING startPointDistance < 1 and endPointDistance < 1';

  var queryForTripStopTableResult = await Query.queryForList(
    queryForTripStopTable
  );
  // console.log("queryForTripStopTableResult",queryForTripStopTableResult)
  // from point in stop table in destination in stop table
  var queryForTripStopTableForStartAndEnd =
    'select trips.id, trips.driver_id,trip_stops.destination_address as from_location,trip_stops.destination_lat as from_lat,trip_stops.destination_lng as from_lng,trips.destination_address,trips.destination_lat,trips.destination_lng,users.first_name,users.middle_name,users.last_name,users.total_ride_taken,round(SQRT( POW(69.1 * (trip_stops.destination_lat -  ' +
    args.user_lat +
    '), 2) + POW(69.1 * (' +
    args.user_lng +
    ' - trip_stops.destination_lng) * COS(trip_stops.destination_lat / 57.3), 2)),2) AS startPointDistance,trip_stops.price,trip_stops.no_of_seat,round(SQRT( POW(69.1 * (trip_stops.destination_lat - ' +
    args.user_destination_lat +
    '), 2) + POW(69.1 * (' +
    args.user_destination_lng +
    ' - trip_stops.destination_lng) * COS(trip_stops.destination_lat / 57.3), 2)),2) AS endPointDistance FROM trip_stops LEFT JOIN trips on trips.id = trip_stops.trip_id LEFT JOIN users on users.id = trips.driver_id GROUP BY id HAVING startPointDistance < 1 or endPointDistance < 1';

  var queryForTripStopTableForStartAndEndResult = await Query.queryForList(
    queryForTripStopTableForStartAndEnd
  );
  // console.log("queryForTripStopTableForStartAndEndResult",queryForTripStopTableForStartAndEndResult)

  var finalTripList = [
    ...queryForTripTableResult,
    ...queryForTripStopTableResult,
    ...queryForTripStopTableForStartAndEndResult,
  ];

  if (finalTripList.length > 0) {
    var list = [];
    list.push(finalTripList);
    return { list: list, statusCode: 200, message: 'Trip List' };
  } else {
    var err = new Error(errorName.NOTFOUND);
    throw err;
  }
  // get trip detail with driver profile
  //SELECT trips.id,trips.from_location,trips.from_lat,trips.from_lng,trips.destination_address,trips.destination_lat,trips.destination_lng,trips.departure_date_time,users.first_name,users.middle_name,users.last_name,users.profile_pic,users.total_ride_taken,trip_vehicles.image,trip_vehicles.model,trip_facilities.luggage_type,trip_facilities.back_side_seat_for_two_only,trip_facilities.smoking_allow,trip_facilities.drinking_allow,trip_facilities.pets_allow,trip_facilities.wear_face_mask,trips.price FROM `trips` LEFT JOIN trip_vehicles on trip_vehicles.trip_id = trips.id LEFT JOIN vehicles on vehicles.id = trip_vehicles.type_id LEFT JOIN users on users.id = trips.driver_id LEFT JOIN trip_facilities on trip_facilities.trip_id = trips.id WHERE trips.id = 1;
};
exports.requestforbooking = async function (args) {
  let tripBookingRequest = {
    trip_id: args.trip_id,
    rider_id: args.rider_id,
    booked_seat: args.booked_seat,
    from_location: args.from_location,
    from_lat: args.from_lat,
    from_lng: args.from_lng,
    destination_address: args.destination_address,
    destination_lat: args.destination_lat,
    destination_lng: args.destination_lng,
    base_fare: args.base_fare,
    extra_amount: args.extra_amount,
    total_fare: args.total_fare,
    discount_amount: args.discount_amount,
    coupon_id: args.coupon_id,
    coupon_code: args.coupon_code,
  };

  let insertresult = await Query.insert('bookings', {
    data: tripBookingRequest,
  });

  if (insertresult) {
    var trip = await Query.findsinglerecord('bookings', {
      id: insertresult.insertId,
    });
    return trip;
  } else {
    var err = new Error(errorName.WENT_WRONG);
    throw err;
  }
};
