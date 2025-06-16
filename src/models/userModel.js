import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address",
    },
  },

  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 6,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
});

const User = mongoose.model("User", userSchema);
export default User;
