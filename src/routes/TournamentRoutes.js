const express = require('express');
const router = express.Router();
const TournamentController = require('../controllers/TournamentController');

router.post('/',TournamentController.makeTournament);

router.get('/',TournamentController.getTournaments);

module.exports = router;