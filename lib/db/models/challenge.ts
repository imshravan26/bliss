import mongoose, { Schema, Document } from "mongoose";

export enum ChallengeType {
  POETRY = "poetry",
  STORY = "story",
  COMEDY = "comedy",
  MONOLOGUE = "monologue",
  OTHER = "other",
}

export interface IChallenge extends Document {
  title: string;
  description: string;
  type: ChallengeType;
  creator: string; // Clerk userId as string
  creatorName: string; // Creator's display name
  startDate: Date;
  endDate: Date;
  submissions: mongoose.Types.ObjectId[];
  participants: string[]; // Array of Clerk userIds
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const ChallengeSchema = new Schema<IChallenge>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(ChallengeType),
      required: true,
    },
    creator: { type: String, required: true }, // Clerk userId
    creatorName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    submissions: [{ type: Schema.Types.ObjectId, ref: "Submission" }],
    participants: [{ type: String }], // Array of Clerk userIds
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Challenge =
  mongoose.models.Challenge ||
  mongoose.model<IChallenge>("Challenge", ChallengeSchema);
export default Challenge;
