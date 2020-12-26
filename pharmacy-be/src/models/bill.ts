import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    pharmacist: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
});

billSchema.index({ pid: 1 });

export { billSchema };
