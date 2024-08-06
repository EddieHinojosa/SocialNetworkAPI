const router = require('express').Router();
const User = require('../../models/User');
const Thought = require('../../models/Thought');
const Reaction = require('../../models/Reaction');


//------------User Routes----------------
// CRUD Create/post
router.post('/', (req, res) => {
    User.create(req.body)
        .then(dbUserData => {
            res.json({ message: 'User created successfully', data: dbUserData });
        })
        .catch(err => {
            res.status(400).json({ message: 'Error creating user', error: err });
        });
});



// CRUD Read/get
router.get('/:id', (req, res) => {
    User.findOne({ _id: req.params.id })
        .exec()
        .then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json({ message: 'User retrieved successfully', data: dbUserData });
        })
        .catch(err => {
            res.status(400).json({ message: 'Error retrieving user', error: err });
        });
});


//CRUD Update/put
router.put("/:id", (req, res) => {
    User.updateOne({ _id: req.params.id }, { $set: req.body })
        .exec()
        .then(data => {
            if (data.nModified === 0) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json({ message: 'User updated successfully', data: data });
        })
        .catch(err => {
            res.status(400).json({ message: 'Error updating user', error: err });
        });
});


// CRUD Delete/delete
router.delete('/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .exec()
        .then(data => {
            if (data.deletedCount === 0) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json({ message: 'User deleted successfully', data: data });
        })
        .catch(err => {
            res.status(400).json({ message: 'Error deleting user', error: err });
        });
});


//------------friends Routes----------------
// CRUD update/put
router.put("/:userId/friends/:friendId", (req, res) => {
    User.findByIdAndUpdate();
    
    //TODO:
    //review how ro locate the friends array and push the friendId into it

});


// CRUD delete/delete
router.delete("/:userId/friends/:friendId", (req, res) => {
    User.findByIdAndUpdate();

    //TODO:
    //same as above for deletes/delete

});









module.exports = router;