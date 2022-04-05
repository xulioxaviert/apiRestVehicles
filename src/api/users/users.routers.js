
const UserRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth.middleware');
// const BrandsRoutes = require('../brands/brands.routers');
// const VehicleRouters = require('../vehicles/vehicles.routers');
const { register, login, logout } = require('./users.controller');

UserRoutes.post('/register', register);
UserRoutes.post('/login', login);
UserRoutes.post('/logout', [isAuth], logout);

module.exports = UserRoutes;


