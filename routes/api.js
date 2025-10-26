const express = require('express');
const router = express.Router();
const WorkoutPlan = require('../models/Plan');

// 1. CREATE (Insert Record): POST /api/plans
router.post('/plans', async (req, res) => {
    try {
        const newPlan = new WorkoutPlan(req.body);
        const savedPlan = await newPlan.save();
        res.status(201).json(savedPlan); // 201 Created
    } catch (err) {
        res.status(400).json({ message: err.message }); // 400 Bad Request
    }
});

// 2. READ (Fetch All Records): GET /api/plans
router.get('/plans', async (req, res) => {
    try {
        // Fetch all plans, sorted by creation date descending
        const plans = await WorkoutPlan.find().sort({ createdAt: -1 }); 
        res.json(plans);
    } catch (err) {
        res.status(500).json({ message: err.message }); // 500 Server Error
    }
});

// 3. UPDATE (Modify a Record): PUT /api/plans/:id
router.put('/plans/:id', async (req, res) => {
    try {
        const updatedPlan = await WorkoutPlan.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // {new: true} returns the updated document
        );
        if (!updatedPlan) return res.status(404).json({ message: 'Plan not found' });
        res.json(updatedPlan);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. DELETE (Delete a Record): DELETE /api/plans/:id
router.delete('/plans/:id', async (req, res) => {
    try {
        const result = await WorkoutPlan.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Plan not found' });

        // HTTP 204 No Content is common for successful deletion, but 200 with a message is also fine
        res.status(200).json({ message: 'Plan successfully deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;