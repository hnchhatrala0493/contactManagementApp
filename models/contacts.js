const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    fname: {
      type: String,
      require: [true, "first name is required."],
    },
    lname: {
      type: String,
      require: [true, "last name is required"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
    },
    phone: {
      type: String,
      require: [true, "phone is a required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", contactSchema);
