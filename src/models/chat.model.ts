import mongoose, { Document, Schema, model } from "mongoose";

interface IChat extends Document {
    sender_id: object,
    receiver_id: object,
    message: string
}

const ChatSchema = new Schema<IChat>({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true,
    }
})

export const Chat = model<IChat>('utilisateurs',ChatSchema); 

