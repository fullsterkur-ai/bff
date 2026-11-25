import mongoose from 'mongoose'

export enum UserRole {
  USER = 'user',
  COACH = 'coach',
  ADMIN = 'admin',
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 30,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      enum: Object.values(UserRole),
      default: [UserRole.USER],
    },
  },
  {
    timestamps: true,
  },
)

export const User = mongoose.model('User', UserSchema)
