const express = require('express');
const dotenv = require('dotenv');
var fs = require('fs');
const { graphqlHTTP } = require('express-graphql');
// const schema = require("./graphql/schema")
const schema = require('./schema');
var cors = require('cors');

const app = express();
const getErrorCode = require('./middleware/errors');
dotenv.config();
app.use(cors());
app.use('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update later
  // Allowed headers
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  // Allowed request methods
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH,OPTIONS'
  );
  next();
});
const { authenticate } = require('./middleware/auth');

app.use(authenticate);

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome! Go to /gql' });
});
const FileController = require('./FileController');
const UploadController = require('./UploadController');
// Body parsing as JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

// File uploader setup
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

if (!fs.existsSync('./tmp')) {
  fs.mkdirSync('./tmp');
}

app.use(express.static('uploads')); // Uploads directory

const fileUpload = require('express-fileupload');
app.use(
  fileUpload({
    // Tempory file folder
    useTempFiles: true,
    tempFileDir: './tmp/',
  })
);

app.post('/uploadfile', UploadController.uploadFile);
app.post('/upload', FileController.uploadFileS3);
// app.post("/uploadvideo", FileController.uploadFileS3);
app.use(
  '/gql',
  graphqlHTTP((req) => ({
    schema: schema,
    graphiql: true,
    context: {
      baseUrl: req.get('host'),
      verifiedUser: req.verifiedUser,
    },

    customFormatErrorFn(err) {
      if (!err.originalError) {
        return err;
      }
      const code = err.originalError.code || 500;
      // console.log("erro code", code);
      if (code == 422) {
        const data = err.originalError.errors;
        // console.log('err data',data)
        const message = err.message || 'An error occurred.';

        return { message: message, statusCode: code, data: data };
      } else {
        // console.log("error object 2", err);
        const error = getErrorCode(err.message);
        if (error) {
          return {
            message: error.message || 'Something Wrong',
            statusCode: error.statusCode,
          };
        } else return { message: 'Something Wrong', statusCode: 404 };
      }
    },
  }))
);
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     graphiql: true,
//   })
// )

app.listen(process.env.PORT || 4000, () => {
  console.log(`App running on PORT ${process.env.PORT || 4000}`);
});
