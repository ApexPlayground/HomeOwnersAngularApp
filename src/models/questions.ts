import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface for a Question document
interface QuestionDocument extends Document {
    text: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define an interface for the Question model
interface QuestionModel extends Model<QuestionDocument> { }

// Define the Question schema
const QuestionSchema: Schema<QuestionDocument, QuestionModel> = new Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
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

// Define a pre-save hook to set the updatedAt field to the current date
QuestionSchema.pre<QuestionDocument>("save", function (next) {
    this.updatedAt = new Date();
    next();
});

// Create the Question model using the schema
const Question: Model<QuestionDocument> = mongoose.model<QuestionDocument, QuestionModel>(
    "Question",
    QuestionSchema
);

// Export the Question model
export default Question;

