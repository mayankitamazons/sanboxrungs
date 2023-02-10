exports.errorName = {
  NOTFOUND: 'NOTFOUND',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_MOBILE: 'INVALID_MOBILE',
  MOBILE_EXIT: 'MOBILE_EXIT',
  EMAIL_EXIT: 'EMAIL_EXIT',
  EMAIL_NOT_EXIT: 'EMAIL_NOT_EXIT',
  MOBILE_NOT_EXIT: 'MOBILE_NOT_EXIT',
  UNAUTHRIZED: 'UNAUTHRIZED',
  WENT_WRONG: 'WENT_WRONG',
  PASSWORD_WRONG: 'PASSWORD_WRONG',
  SOCIAL_LOGIN: 'SOCIAL_LOGIN',
  FORGOT_OTP: 'FORGOT_OTP',
  ID_REQUIRED: 'ID_REQUIRED',
  PASSWORD_REQUIRED: 'PASSWORD_REQUIRED',
  INVALID_FORGOT_PASSWORD: 'INVALID_FORGOT_PASSWORD',
  ALREADY_SUBMITED_DOC: 'ALREADY_SUBMITED_DOC',
  ACCOUNT_NOT_ACTIVE: 'ACCOUNT_NOT_ACTIVE',
  DRIVER_ID_NOT_VERIFIED: 'DRIVER_ID_NOT_VERIFIED',
};

exports.errorType = {
  NOTFOUND: {
    message: 'Requested record not found',
    statusCode: 404,
  },
  INVALID_EMAIL: {
    message: 'Email Address is not Valid',
    statusCode: 404,
  },
  INVALID_MOBILE: {
    message: 'Mobile No is Not Valid',
    statusCode: 404,
  },
  UNAUTHRIZED: {
    message: 'Not   AUTHRIZED to view ',
    statusCode: 401,
  },
  MOBILE_EXIT: {
    message: 'Mobile No is Already Taken',
    statusCode: 404,
  },
  EMAIL_EXIT: {
    message: 'Email Address is Already Taken',
    statusCode: 404,
  },
  WENT_WRONG: {
    message: 'Something Went Wrong , Try again after some time',
    statusCode: 404,
  },
  PASSWORD_WRONG: {
    message: 'Password not matched',
    statusCode: 404,
  },
  EMAIL_NOT_EXIT: {
    message: 'Email not exist',
    statusCode: 404,
  },
  MOBILE_NOT_EXIT: {
    message: 'Mobile not exist',
    statusCode: 404,
  },
  SOCIAL_LOGIN: {
    message: 'Something wrong with social login.',
    statusCode: 404,
  },
  FORGOT_OTP: {
    message: 'Forgot password otp required.',
    statusCode: 404,
  },
  ID_REQUIRED: {
    message: 'ID required.',
    statusCode: 404,
  },
  PASSWORD_REQUIRED: {
    message: 'Password required.',
    statusCode: 404,
  },
  INVALID_FORGOT_PASSWORD: {
    message: 'Invalid Email or Forgot Password Code',
    statusCode: 404,
  },
  ALREADY_SUBMITED_DOC: {
    message: 'Your past Document is under process wait for its update',
    statusCode: 404,
  },
  ACCOUNT_NOT_ACTIVE: {
    message: 'Your account is not active , please contact to support',
    statusCode: 404,
  },
  DRIVER_ID_NOT_VERIFIED: {
    message:
      'Your Id Verification is not done, complete that first to offer a ride',
    statusCode: 402,
  },
};
