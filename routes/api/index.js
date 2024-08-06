const router = require('express').Router();
//this directes the routes to the api folder
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1> Route not found 💩 </h1>');
});

module.exports = router;