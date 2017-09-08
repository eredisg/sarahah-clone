import mongoose, { Schema } from 'mongoose';

const Comment = new Schema({
    comment: String,
    createdAt: Date
});

export default Comment;