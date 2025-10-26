const mongoose = require('mongoose');

// Define the schema for a Workout/Diet Plan
const PlanSchema = new mongoose.Schema({
    planName: {
        type: String,
        required: true,
        trim: true
    },
    durationWeeks: {
        type: Number,
        required: true
    },
    focusArea: { // e.g., 'Weight Loss', 'Muscle Gain', 'Endurance'
        type: String,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const WorkoutPlan = mongoose.model('WorkoutPlan', PlanSchema);
module.exports = WorkoutPlan;