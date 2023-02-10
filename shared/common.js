exports.validatemobilenumber = function (inputNumber) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (inputNumber.match(phoneno)) {
    return true;
  } else {
    // console.log("message");
    return false;
  }
};
