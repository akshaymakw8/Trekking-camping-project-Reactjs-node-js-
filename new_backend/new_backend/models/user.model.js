const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = userModel = mongoose.model("Users", userSchema);
