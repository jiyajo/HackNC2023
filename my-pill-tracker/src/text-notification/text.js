const { CourierClient } = require("@trycourier/courier");
const courier = CourierClient({ authorizationToken: "dk_prod_GVH0BTETMT42B1KR48XTCNSNV6PA" });

const dosage = "1 pill";
const medication = "lexapro";
const note = "Make sure to take it!";

const { requestId } = courier.send({

  message: {

    to: {

      data: {

            dosage: dosage,
            medication: medication,
            note: note

      },

      phone_number: "4133366310",

    },

    template: "V28CFXHV6X4212Q6RVP0ZBEJVF84",

    routing: {

          method: "single",

          channels: ["sms"],

    },

  },

});