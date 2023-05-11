import mongoose, { Schema, Document } from 'mongoose';

export interface Question extends Document {
    text: string;
    userId: number;
}

const questionSchema = new Schema<Question>({
    text: {
        type: String,
        required: true,
    },
    userId: {
        type: Number,
        required: true,
    },
});

export default mongoose.model<Question>('Question', questionSchema);
