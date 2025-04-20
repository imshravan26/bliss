import mongoose from "mongoose";

const ChallengeParticipantSchema = new mongoose.Schema({
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  submission: {
    type: String,
    default: null,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  submittedAt: {
    type: Date,
    default: null,
  },
});

// Create a compound index for challenge and user to ensure uniqueness
ChallengeParticipantSchema.index({ challenge: 1, user: 1 }, { unique: true });

const ChallengeParticipant =
  mongoose.models.ChallengeParticipant ||
  mongoose.model("ChallengeParticipant", ChallengeParticipantSchema);

export default ChallengeParticipant;
