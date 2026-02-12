const user_route = require('../api/user');
const address_route = require('../api/address');

export default (app: any) => {
    user_route(app);
    address_route(app);
}