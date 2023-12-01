//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import authRoutes from './auth_routes.js';
import path from 'path';

const constructorMethod = (app) => {
  app.use('/', authRoutes);
  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

export default constructorMethod;
