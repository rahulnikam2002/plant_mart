const mongoose = require("mongoose");

const PlusSubscriptionWaitListSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel"
        },
        notify: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export default mongoose.models.PlusSubscriptionWaitList || mongoose.model("PlusSubscriptionWaitList", PlusSubscriptionWaitListSchema);
