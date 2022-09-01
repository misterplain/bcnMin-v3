import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: String,
        default: '',
        required: true
    },
    password: {
        type: String,
        default: '',
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    favorites: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Blog", // ref allows populate function to work properly, the function replaces id with its corresponding blog object
            },
        ],
        default: []
    },
});

const User = mongoose.model('User', userSchema);

export default User;