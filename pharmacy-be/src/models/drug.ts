import mongoose from "mongoose";

const drugSchema = new mongoose.Schema({
    barcode: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    cost_price: {
        type: Number,
        //required: true,
    },
    selling_price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        //required: true,
    },
    company: String,
    expiry: {
        type: String,
        //required: true,
    },
});


export { drugSchema };
