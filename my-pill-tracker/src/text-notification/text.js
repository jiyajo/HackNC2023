import { courier } from '../courier-config'

const dosage = "1 pill";
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

      phone_number: "",

    },

    template: "V28CFXHV6X4212Q6RVP0ZBEJVF84",

    routing: {

          method: "single",

          channels: ["sms"],

    },

  },

});