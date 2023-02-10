const jwt = require('jsonwebtoken');
const moment = require('moment');
const Query = require('../../lib/query');
const bcrypt = require('bcrypt');
const { createJwtToken } = require('../../util/auth');
const { errorName } = require('../../middleware/errorContant');
const COMMON = require('../../shared/common');
const validator = require('../../helper/validate');
const { relativeTimeRounding } = require('moment');
const { filter } = require('async');

exports.register = async function (args) {
  var go_ahead = true;
  if (args.mobile && go_ahead) {
    // Mobile login
    var mobilecheck = await Query.findsinglerecord('users', {
      mobile: args.mobile,
    });
    if (mobilecheck) {
      var err = new Error(errorName.MOBILE_EXIT);
      throw err;

      go_ahead = false;
    }
  }
  if (args.email && go_ahead) {
    // Email login
    var usercheck = await Query.findsinglerecord('users', {
      email: args.email,
    });
    // console.log("email already", usercheck);
    if (usercheck) {
      var err = new Error(errorName.EMAIL_EXIT);
      throw err;
    }
  }
  if (go_ahead) {
    try {
      args.password = bcrypt.hashSync(args.password, 10);
      let insertresult = await Query.insert('users', {
        data: args,
      });
      if (insertresult.affectedRows > 0) {
        args.id = insertresult.insertId;
        args.token = createJwtToken({
          user_id: args.id,
          first_name: args.first_name,
          mobile: args.mobile,
        });
        return args;
      } else {
        var err = new Error(errorName.WENT_WRONG);
        throw err;
      }
    } catch (e) {
      var err = new Error(errorName.WENT_WRONG);
      throw err;
    }
  } else {
    var err = new Error(errorName.WENT_WRONG);
    throw err;
  }
};
exports.socialogin = async function (args) {
  if (args.social_id) {
    // Mobile login
    var socialCheck = await Query.findsinglerecord('users', {
      social_id: args.social_id,
    });
    if (socialCheck) {
      const token = createJwtToken(socialCheck);
      socialCheck.token = token;
      socialCheck.message = 'Login Done';
      socialCheck.statusCode = 200;
      return socialCheck;
    } else {
      let insertresult = await Query.insert('users', {
        data: args,
      });
      if (insertresult.affectedRows > 0) {
        args.id = insertresult.insertId;
        args.token = createJwtToken({
          user_id: args.id,
          first_name: args.first_name,
          mobile: args.mobile,
        });
        return args;
      } else {
        var err = new Error(errorName.WENT_WRONG);
        throw err;
      }
    }
  } else {
    var err = new Error(errorName.SOCIAL_LOGIN);
    throw err;
  }
};

exports.login = async function (fields) {
  var query = {};
  var errorCode = 'NOTFOUND';
  if (fields.email) {
    query.email = fields.email;
    errorCode = 'email';
  } else if (fields.mobile) {
    query.mobile = fields.mobile;
    errorCode = 'mobile';
  }
  var user = await Query.findsinglerecord('users', query);
  // console.log('userdata',user);
  if (user) {
    if (fields.email) {
      const validPassword = await bcrypt.compare(
        fields.password,
        user.password
      );
      if (!validPassword) {
        var err = new Error(errorName.PASSWORD_WRONG);
        throw err;
      }
    }
    const token = createJwtToken({
      user_id: user.id,
      first_name: user.first_name,
      mobile: user.mobile,
    });
    user.token = token;
    user.message = 'Login Done';
    user.statusCode = 200;
    return user;
  } else {
    if (errorCode == 'email') {
      var err = new Error(errorName.EMAIL_NOT_EXIT);
      throw err;
    } else if (errorCode == 'mobile') {
      var err = new Error(errorName.MOBILE_NOT_EXIT);
      throw err;
    } else {
      var err = new Error(errorName.NOTFOUND);
      throw err;
    }
  }
};
exports.forgotpassword = async function (args) {
  var user = await Query.findsinglerecord('users', {
    email: args.email,
  });
  if (user) {
    var forgot_password_otp = 123456;
    // var forgot_password_otp = Math.floor(100000 + Math.random() * 999999);

    var forgotOTPUpdate = await Query.update('users', {
      data: { forgot_password_otp: forgot_password_otp },
      id: user.id,
    });
    if (forgotOTPUpdate.affectedRows > 0) {
      return true;
    } else {
      var err = new Error(errorName.WENT_WRONG);
      throw err;
    }
  } else {
    var err = new Error(errorName.EMAIL_NOT_EXIT);
    throw err;
  }
};
exports.resetpassword = async function (args) {
  var query = {};
  if (args.email) {
    if (args.forgotpassword_code) {
      if (args.email) {
        query.email = args.email;
      }
      if (args.forgotpassword_code) {
        query.forgot_password_otp = args.forgotpassword_code;
      }
      var user = await Query.findsinglerecord('users', query);
      // console.log(user)
      // return;
      if (user) {
        var newpassword = bcrypt.hashSync(args.password, 10);
        var forgotOTPUpdate = await Query.update('users', {
          data: { forgot_password_otp: '', password: newpassword },
          id: user.id,
        });
        if (forgotOTPUpdate.affectedRows > 0) {
          return true;
        } else {
          var err = new Error(errorName.WENT_WRONG);
          throw err;
        }
      } else {
        var err = new Error(errorName.INVALID_FORGOT_PASSWORD);
        throw err;
      }
    } else {
      var err = new Error(errorName.FORGOT_OTP);
      throw err;
    }
  } else if (fields.mobile) {
    var err = new Error(errorName.WENT_WRONG);
    throw err;
  }
};
exports.usercheck = async function (fields) {
  var query = {};
  var errorCode = 'NOTFOUND';
  if (fields.email) {
    query.email = fields.email;
    errorCode = 'email';
  } else if (fields.mobile) {
    query.mobile = fields.mobile;
    errorCode = 'mobile';
  }
  var user = await Query.findByFields('users', query);

  if (user.length > 0) {
    if (errorCode == 'email') {
      var err = new Error(errorName.EMAIL_EXIT);
      throw err;
    } else if (errorCode == 'mobile') {
      var err = new Error(errorName.MOBILE_EXIT);
      throw err;
    } else {
      var err = new Error(errorName.NOTFOUND);
      throw err;
    }
  } else {
    return true;
  }
};

exports.updateuser = async function (args) {
  if (args.mobile) {
    var mobilecheck = await Query.query(
      "select id from users where mobile='" +
        args.mobile +
        "' and id !=" +
        args.user_id
    );
    if (mobilecheck) {
      var err = new Error(errorName.MOBILE_EXIT);
      throw err;
    }
  }
  if (args.email) {
    var usercheck = await Query.query(
      "select id from users where email='" +
        args.email +
        "' and id !=" +
        args.user_id
    );
    if (usercheck) {
      var err = new Error(errorName.EMAIL_EXIT);
      throw err;
    }
  }
  var u = {};
  if (args.first_name) u.first_name = args.first_name;
  if (args.last_name) u.last_name = args.last_name;
  if (args.email) u.email = args.email;
  if (args.mobile) u.mobile = args.mobile;
  if (args.about) u.about = args.about;
  if (args.profile_pic) u.profile_pic = args.profile_pic;
  if (args.gender) u.gender = args.gender;
  if (args.chattingess) u.chattingess = args.chattingess;
  if (args.smoking || args.smoking == false) u.smoking = args.smoking;
  if (args.is_driver || args.is_driver == false) u.is_driver = args.is_driver;
  if (args.password) {
    // console.log("password args", args.password);
    var newpassword = bcrypt.hashSync(args.password, 10);
    u.password = newpassword;
  }
  // console.log(u);
  var updateprofile = await Query.update('users', {
    data: u,
    id: args.user_id,
  });
  if (updateprofile.affectedRows > 0) {
    var user = await Query.findsinglerecord('users', {
      id: args.user_id,
    });
    return user;
  } else {
    var err = new Error(errorName.WENT_WRONG);
    throw err;
  }
};
exports.submitidverification = async function (args) {
  if (args.user_id) {
    var pastdoc = await Query.findsinglerecord('user_verifications', {
      user_id: args.user_id,
      status: '0',
      doc_type: args.doc_type,
    });
    if (pastdoc) {
      var err = new Error(errorName.ALREADY_SUBMITED_DOC);
      throw err;
    } else {
      let insertresult = await Query.insert('user_verifications', {
        data: args,
      });
      if (insertresult.affectedRows > 0) {
        // console.log("res", insertresult);
        args.id = insertresult.insertId;
        return args;
      } else {
        var err = new Error(errorName.WENT_WRONG);
        throw err;
      }
    }
  } else {
    var err = new Error(errorName.WENT_WRONG);
    throw err;
  }
};
exports.verificationdetail = async function (args) {
  if (args.user_id == args.token_user_id) {
    var q = { user_id: args.token_user_id };
    if (args.doc_type) q.doc_type = args.doc_type;

    var docdata = await Query.findsinglerecord('user_verifications', q);
    if (docdata) {
      var doc_msg = '';
      if (docdata.status == '1') {
        doc_msg = 'Your Id is Approved';
      } else if (docdata.status == '2') {
        doc_msg = 'Your Verification doc is rejected';
      } else if (docdata.status == '0') {
        doc_msg = 'Your Verification doc is under processs';
      }
      docdata.remark = doc_msg;
      return docdata;
    } else {
      var err = new Error(errorName.NOTFOUND);
      throw err;
    }
  } else {
    var err = new Error(errorName.UNAUTHRIZED);
    throw err;
  }
};
exports.userdetail = async function (args) {
  if (args.user_id == args.token_user_id) {
    var user = await Query.findsinglerecord('users', {
      id: args.token_user_id,
    });
    if (user) {
      return user;
    } else {
      var err = new Error(errorName.NOTFOUND);
      throw err;
    }
  } else {
    var err = new Error(errorName.UNAUTHRIZED);
    throw err;
  }
};
