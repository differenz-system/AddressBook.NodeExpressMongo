"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_route = require('../api/user');
const address_route = require('../api/address');
exports.default = (app) => {
    user_route(app);
    address_route(app);
};
