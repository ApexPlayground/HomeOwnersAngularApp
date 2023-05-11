import mongoose, { Schema, Document } from 'mongoose';

export interface Answer extends Document {
    questionId: number;
    text: string;
    userId: number;
    upvote: number;
}

const answerSchema = new Schema<Answer>({
    questionId: {
        type: Number,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    userId: {
        type: Number,
        required: true,
    },
    upvote: {
        type: Number,
        default: 0,
    },
});

export default mongoose.model<Answer>('Answer', answerSchema);
