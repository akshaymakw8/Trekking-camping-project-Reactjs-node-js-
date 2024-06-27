const { default: mongoose } = require("mongoose");

const tourSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
       
      },
      city: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      distance: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      maxGroupSize: {
        type: Number,
        required: true,
      },
      time:{
        type:String,
      },
      food: {
        type:String
      },
      guide: {
        type:String
      },
      extra: {
        type:String
      },
      reviews: {
        type:Array
      },
      avgRating: {
        type:Number
      },
      featured: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );
  
  module.exports = tourModel = mongoose.model("Tour", tourSchema);
  