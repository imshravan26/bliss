import mongoose, { Schema, Document } from "mongoose";

export enum SubmissionStatus {
  PENDING = "pending",
  APPROVED = "approved",
  WINNER = "winner",
  REJECTED = "rejected",
}

export interface Submission {
  _id: string;
  userId: string;
  userName: string;
  challengeId: string;
  content: string;
  status: SubmissionStatus;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Challenge {
  _id: string;
  title: string;
  description: string;
  type: "poetry" | "story" | "prompt";
  creator: string;
  creatorName: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  participants: string[];
  submissions: string[];
  rules?: string;
  prompt?: string;
  wordLimit?: number;
}

export interface ChallengeCommunity {
  _id: string;
  challengeId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface ISubmission extends Document {
  challenge: mongoose.Types.ObjectId;
  user: string; // Clerk userId as string
  userName: string; // User's display name
  content: string;
  status: SubmissionStatus;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const SubmissionSchema = new Schema<ISubmission>(
  {
    challenge: {
      type: Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },
    user: { type: String, required: true }, // Store Clerk userId
    userName: { type: String, required: true },
    content: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(SubmissionStatus),
      default: SubmissionStatus.PENDING,
    },
    feedback: { type: String },
  },
  { timestamps: true }
);

const Submission =
  mongoose.models.Submission ||
  mongoose.model<ISubmission>("Submission", SubmissionSchema);
export default Submission;
