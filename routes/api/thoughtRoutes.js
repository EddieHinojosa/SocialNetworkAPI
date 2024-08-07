const router = require('express').Router();
const express = require('express');
const User = require('../../models/User');
const Thought = require('../../models/Thought');


//------------thoughts Routes----------------
// CRUD Create/post

router.post('/:id', async (req, res)=> {
    try {
        const thought = await Thought.create(req.body);
        await User.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { thoughts: thought._id } },
            { new: true }
        );
        res.json({message: 'Thought added to user', data: thought});
    } catch (err) {
        res.status(400).json({message: 'Unable to add thought', error: err});
    }
})





















module.exports = router;