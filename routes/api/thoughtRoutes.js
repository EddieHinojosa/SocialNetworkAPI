const router = require('express').Router();
// const express = require('express');
const User = require('../../models/User');
const Thought = require('../../models/Thought');


//------------thoughts Routes----------------
// CRUD Create/post

router.post('/:id', async (req, res) => {
    const addingThrought = {
        ...req.body,
        userId: req.params.id,
    };
    
    try {
        const thoughts = await Thought.create(addingThrought);
        await User.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { thoughts: thoughts._id } },
            { new: true }
        );
        res.json({message: 'Thought added to user', data: thoughts });
    } catch (err) {
        res.status(400).json({message: 'Unable to add thought', error: err});
    }
});


// CRUD Read/get (all)

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.status(200).json({message: 'thoughts retriieved successfully', data: thoughts});
    } catch (err) {
        res.status(500).json({message: 'unable to gathering your thoughts', error: err.message});
    }
});


// CRUD Read/get (by id)

router.get('/:id', (req, res)=> {
    Thought.findOne({_id: req.params.id})
    .then(thought => {
        if (!thought) {
            res.status(404).json({message: 'No thought found with this id'});
            return;
        }
        res.json(thought);
    })
    .catch(err => {
        res.status(400).json({message: 'unable to locating that thought', error: err.message});
    });
});


// CRUD Update/put

router.put('/:id', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
    )
    .then((data) => {
        if (!data) {
            res.status(404).json({message: 'No thought found with this id'});
            return;
        }
        res.json({message: 'thought updated' , data: data});
    })
    .catch((err) => {
        res.status(400).json({message: 'unable to update thought', error: err.message});
    });
});


// CRUD Delete/delete

router.delete('/:id', (req, res) => {
    Thought.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
        if (!data) {
            res.status(404).json({message: 'No thought found with this id'});
            return;
        }
        res.json({message: 'thought deleted', data: data});
    })
    .catch((err) => {
        res.status(400).json({message: 'unable to delete thought', error: err.message});
    });
});












module.exports = router;