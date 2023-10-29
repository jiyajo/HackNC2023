const { CourierClient } = require("@trycourier/courier");
export const courier = CourierClient({ authorizationToken: process.env.COURIER-AUTHORIZATION-TOKEN });