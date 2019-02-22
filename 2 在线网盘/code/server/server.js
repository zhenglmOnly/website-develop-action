const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:8080',
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

const morgan = require('morgan');
app.use(morgan('combined'));

const db = require('./config/db.config');

const cookie = require('cookie-parser');

/* db.sequelize.sync({ force: true }).then(() => {
  console.log('重建表');
}); */
require('./route/user.route')(app);
require('./route/file.route')(app);

//  创建服务器
let server = app.listen(process.env.PORT || 8081, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('服务器启动: http://%s:%s', host, port);
});
