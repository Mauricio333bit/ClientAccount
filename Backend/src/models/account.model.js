const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId, // ID del usuario dueño de la cuenta
      ref: "User", // Referencia al modelo User
      required: true, // Tiene qie ser obligatorio
    },
    balance: {
      type: Number,
      default: 0, // Por defecto el balance es 0 al registrar la cuenta
      // Suponiendo que: si el movimiento es un remito, se resta (deuda por mercadería retirada);
      // si es un pago de factura, se suma (pagando deuda); y si es una nota de crédito, también se suma (crédito a favor del usuario).
    },
    status: {
      type: String,
      enum: ["Activa", "En deuda", "Inactiva"], // Posibles estados de la cuenta
      default: "Activa", // Por defecto, la cuenta está activa
      // La cuenta estará "En deuda" cuando el balance sea negativo.
    },
  },
  { timestamps: true }
);

// El esquema es como una interfaz, define la estructura de los documentos en MongoDB,
// especificando los atributos y sus tipos.

// Crear el modelo Account basado en el esquema accountSchema
const Account = mongoose.model("Account", accountSchema);
// Mongoose se comunica con la base de datos y nos proporciona métodos para interactuar con los datos.

// Ejemplo:
// Accounts
//     { Account1 }
//     { Account2 }

module.exports = Account;
