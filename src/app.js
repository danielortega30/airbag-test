const express = require('express');
const mongoose = require('mongoose');
const tournamentRoutes = require('./routes/TournamentRoutes');
const matchRoutes = require('./routes/MatchRoutes');

const app = express();

app.use(express.json());
app.use('/tournaments', tournamentRoutes);
app.use('/matches', matchRoutes);

module.exports = app;