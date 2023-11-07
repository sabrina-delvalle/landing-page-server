const mongoose = require("mongoose");

/* mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log('connected to MongoDB.')); */

const userSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        message: String,
        date: {
            type: Date,
            default: Date.now,
          },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", userSchema);