import mongoose, {Schema} from 'mongoose';

const User = new Schema({
    name: String,
    githubId: String
});

export default mongoose.model('users', User);