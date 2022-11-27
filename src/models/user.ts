import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true, maxlength: 20 },
  password: { type: String, required: true, maxlength: 30 },
  nickname: { type: String, required: true, maxlength: 20 },
  email: { type: String, required: true, maxlength: 30 },
  gender: { type: String, require: true },
  birth: { type: Number, required: true },
  createdAt: { type: Date, default: new Date() },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
