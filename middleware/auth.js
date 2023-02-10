const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  // console.log('req header 2', req.headers.authorization);
  // const token = req.headers.authorization?.split(" ")[1] || ""
  let token = '';
  if (req.headers.authorization)
    token = req.headers.authorization.split(' ')[1];
  // const token=req.headers.authorization.split('Bearer ')[1]
  // console.log('token', token);
  try {
    const verified = jwt.verify(token, '123454dddss');
    const decoded = jwt.decode(token, '123454dddss');
    req.verifiedUser = verified.user;
    req.decoded = verified.decoded;
    // console.log("verified !", decoded)
    // console.log("Decorred data!", decoded)
    next();
  } catch (err) {
    // console.log("Verification failed!", err)
    next();
  }
};

module.exports = { authenticate };
