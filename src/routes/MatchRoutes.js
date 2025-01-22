const express = require('express');
const router = express.Router();
const MatchControlle = require('../controllers/MatchController')

router.post('/', MatchControlle.makeMatch);

router.put('/:id',MatchControlle.updateMatch);

module.exports = router;