const mongoose = require("mongoose");

const UserRepoSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    unique: true,
  },
  
});
