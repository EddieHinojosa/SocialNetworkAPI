const router = require('express').Router();
// const express = require('express');
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


// CRUD Read/get

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.status(200).json({message: 'thoughts retriieved successfully', data: thoughts});
    } catch (err) {
        res.status(500).json({message: 'error gathering thoughts', error: err.message});
    }
});



















module.exports = router;