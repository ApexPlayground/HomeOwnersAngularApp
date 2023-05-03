// Import the necessary dependencies from Mongoose
import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for an answer document
interface AnswerDocument extends Document {
    text: string;
    author: string;
    questionId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// Define the interface for the answer model
interface AnswerModel extends Model<AnswerDocument> { }

// Create a new schema for answers
const AnswerSchema: Schema<AnswerDocument, AnswerModel> = new Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    questionId: {
        type: Schema.Types.ObjectId, // Change to Schema.Types.ObjectId
        ref: "Question", // Reference the Question model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Add a pre-save hook to update the 'updatedAt' field
AnswerSchema.pre<AnswerDocument>("save", function (next) {
    this.updatedAt = new Date();
    next();
});

// Create a new model for answers using the answer schema
const Answer: Model<AnswerDocument> = mongoose.model<AnswerDocument, AnswerModel>(
    "Answer", // Name of the model
    AnswerSchema // Answer schema to use
);

// Export the Answer model
export default Answer;
