import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  username: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.matchPassword = async function (password:string) {
  return await bcrypt.compare(password, this.password);
};

const User :Model<IUser>=mongoose.model<IUser>('user',UserSchema)
export default User
