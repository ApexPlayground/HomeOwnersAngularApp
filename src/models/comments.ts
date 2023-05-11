import mongoose, { Schema, Document } from 'mongoose';

export interface Comment extends Document {
    post: string;
    comment: string;
    createdAt: Date;
}

const commentSchema = new Schema<Comment>({
    post: {
        type: String,
        ref: 'Post',
    },
    comment: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<Comment>('Comment', commentSchema);
