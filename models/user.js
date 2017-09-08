import mongoose, { Schema } from 'mongoose';
import Comment from './comment';

const User = new Schema({
    name: String,
    githubId: String,
    comments: [Comment]
});

export default mongoose.model('users', User);