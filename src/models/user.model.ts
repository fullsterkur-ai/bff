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
      minlength: [5, 'Name must be at least 5 characters long'],
      maxlength: [30, 'Name must be at most 30 characters long'],
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exists'],
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
