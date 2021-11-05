import mongoose from 'mongoose'

const { Schema, model } = mongoose




const userSchema = new Schema (
    {
        email: {type: String, required: true},
        password: {type: String},
        role: { type: String, default: "Guest", enum: ["Guest", "Host"] }
    },
    {
        timestamps: true,
    }
) 



export default model("User", userSchema)