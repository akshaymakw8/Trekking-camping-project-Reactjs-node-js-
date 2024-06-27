const { default: mongoose } = require("mongoose");

const feedbackSchema = new mongoose.Schema(
    {
      user: {
        type:mongoose.Types.ObjectId,
        ref:'User'
      },
      feedback: {
        type: String,
      },
    },
    { timestamps: true }
  );
  
  module.exports = feedbackModel = mongoose.model("Feedback", feedbackSchema);
  