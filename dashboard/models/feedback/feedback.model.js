const mongoose = require("mongoose");

const userFeedbackSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel"
        },
        feedback: [
            {
                type: String
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.models.userFeedback || mongoose.model("userFeedback", userFeedbackSchema);
