const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('./db/sequelize');

const { User } = sequelize.models;

const authenticate = async (login, password) => {
  const candidate = await User.findOne({ where: { login } });
  if (
    !candidate
    || candidate.role !== 'admin'
    || bcrypt.compareSync(password, candidate.password) === false
  ) {
    return;
  }
  return Promise.resolve(candidate);
};

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const adminOptions = {
  databases: [sequelize],
  branding: {
    companyName: 'Usof Admin-Panel',
  },
  locale: {
    translations: {
      properties: {
        email: 'Login',
      },
    },
  },
};

const admin = new AdminJS(adminOptions);
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookiePassword: process.env.JWT_ACCESS_SECRET,
  },
  null,
  {
    secret: process.env.JWT_ACCESS_SECRET,
    resave: false,
    saveUninitialized: false,
  },
);

module.exports = { admin, adminRouter };
