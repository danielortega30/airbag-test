const app = require('./app');
const mongoose = require('mongoose');
const startQueue = require('./jobs/start');
const checkTimeouts = require('./jobs/timeout');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Database connected.'));

app.listen(3000, () => {
  console.log('Server running on port 3000');

  setInterval(checkTimeouts, 300000);
});