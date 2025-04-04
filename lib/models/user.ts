// models/User.ts
import mongoose, { Document, Model, models, model } from "mongoose";

// Define interfaces for nested objects
interface Badge {
  name: string;
  description: string;
  image: string;
  dateEarned: Date;
}

interface Achievement {
  title: string;
  description: string;
  xpReward: number;
  dateCompleted: Date;
}

interface FriendRequest {
  from: mongoose.Types.ObjectId;
  createdAt: Date;
}

interface NotificationPreferences {
  games: boolean;
  social: boolean;
  achievements: boolean;
}

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  displayName?: string;
  avatar: string;
  bio: string;
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  resetPasswordToken?: string;
  resetPasswordExpiry?: Date;
  friends: mongoose.Types.ObjectId[];
  friendRequests: FriendRequest[];
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  xp: number;
  level: number;
  tier: "Novice" | "Explorer" | "Creator" | "Master" | "Legend";
  badges: Badge[];
  achievements: Achievement[];
  gamesPlayed: number;
  gamesWon: number;
  creativeScore: number;
  teamworkScore: number;
  theme: "light" | "dark" | "system";
  notifications: NotificationPreferences;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface UserModel extends Model<User> {}

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: [true, "Please provide a Clerk ID"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username cannot exceed 20 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    // Profile Details
    displayName: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: "/default-avatar.png",
    },
    bio: {
      type: String,
      maxlength: [200, "Bio cannot exceed 200 characters"],
      default: "",
    },

    // Account Status
   
    verificationToken: String,
    verificationTokenExpiry: Date,
    resetPasswordToken: String,
    resetPasswordExpiry: Date,

    // Social Features
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequests: [
      {
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Gamification Elements
    xp: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    tier: {
      type: String,
      enum: ["Novice", "Explorer", "Creator", "Master", "Legend"],
      default: "Novice",
    },
    badges: [
      {
        name: String,
        description: String,
        image: String,
        dateEarned: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    achievements: [
      {
        title: String,
        description: String,
        xpReward: Number,
        dateCompleted: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Stats
    gamesPlayed: {
      type: Number,
      default: 0,
    },
    gamesWon: {
      type: Number,
      default: 0,
    },
    creativeScore: {
      type: Number,
      default: 0,
    },
    teamworkScore: {
      type: Number,
      default: 0,
    },

    // Preferences
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
    notifications: {
      games: {
        type: Boolean,
        default: true,
      },
      social: {
        type: Boolean,
        default: true,
      },
      achievements: {
        type: Boolean,
        default: true,
      },
    },

    // Timestamps
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Method to update XP and automatically adjust level and tier

// Check if the model exists before creating a new one
// const User: UserModel =
//   (mongoose.models.User as UserModel) ||
//   mongoose.model<User, UserModel>("User", UserSchema);

// export default User;

const User = models?.User || model("user", UserSchema);
export default User;
