
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    customerId: {

        type: String,

        required: true

    },
    orderId: {

        type: String,

        required: true

    },
    name: {

        type: String,

        required: true

    },
    amount: {

        type: Number,

        required: true

    },
    status: {

        type: String,

        required: true

    },
    timestamp: {

        type: Date,

        default: Date.now

    },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
