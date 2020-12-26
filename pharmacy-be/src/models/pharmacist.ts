import mongoose from "mongoose";

const pharmacistSchema = new mongoose.Schema({
    pid: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

pharmacistSchema.index({ pid: 1 });

export { pharmacistSchema };
