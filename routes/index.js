const meituan = require('./meituan-v1');
const user = require('./user');
const sso = require('./sso');

module.exports = (app) => {
  app.use('/meituan-v1', meituan);
  app.use('/user', user);
  app.use('/auth', sso);
};
