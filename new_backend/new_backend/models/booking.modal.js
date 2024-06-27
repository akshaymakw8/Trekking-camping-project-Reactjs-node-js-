const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
     
    },
    guests: {
      type: String,
      required: true,
     
    },
    date: {
        type:Date
    },
    phone: {
      type:Number
    },
    tour: {
      type:mongoose.Types.ObjectId,
      ref:'Tour'
    },
    status: {
      type:String
    },
    user : {
      type:mongoose.Types.ObjectId,
      ref:'User'
    }
  },
  { timestamps: true }
);
bookingSchema.set("toObject", { virtuals: true });
bookingSchema.set("toJSON", { virtuals: true });

module.exports = userModel = mongoose.model("Booking", bookingSchema);
