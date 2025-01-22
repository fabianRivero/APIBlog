import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
}, {
    toJSON: {
        transform: function(doc, ret){
            delete ret.__v;
            delete ret._id;
            delete ret.id;
        },
        virtuals: true,
    }
});

emailSchema.index({ email: 1 });

const Email = mongoose.model("Email", emailSchema);

export default Email;
