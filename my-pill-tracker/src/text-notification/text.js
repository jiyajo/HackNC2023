import { courier } from '../../courier-config.js'

const dosage = "2";
const medication = "Lexapro";
const note = "Take with water!";

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