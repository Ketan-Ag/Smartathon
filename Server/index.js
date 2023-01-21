const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/competitions', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Competition model
const Competition = mongoose.model('Competition', {
  name: String,
  teamSize: Number,
  details: String,
  requests: [String],
  selected: [String]
});

// Create a new competition
app.post('/competitions', (req, res) => {
  const { name, teamSize, details } = req.body;
  const competition = new Competition({ name, teamSize, details });
  competition.save().then(() => res.send('Competition created.'));
});

// Get all competitions
app.get('/competitions', (req, res) => {
  Competition.find().then((competitions) => res.send(competitions));
});

// Send a request to join a team
app.post('/competitions/:id/requests', (req, res) => {
  const { user } = req.body;
  Competition.findById(req.params.id).then((competition) => {
    competition.requests.push(user);
    competition.save().then(() => res.send('Request sent.'));
  });
});

// Get all requests for a specific competition
app.get('/competitions/:id/requests', (req, res) => {
  Competition.findById(req.params.id).then((competition) => {
    res.send(competition.requests);
  });
});

// Accept a request to join a team
app.post('/competitions/:id/accept', (req, res) => {
  const { user } = req.body;
  Competition.findById(req.params.id).then((competition) => {
    competition.requests.splice(competition.requests.indexOf(user), 1);
    competition.selected.push(user);
    competition.save().then(() => res.send('Request accepted.'));
  });
});

// Reject a request to join a team
app.post('/competitions/:id/reject', (req, res) => {
  const { user } = req.body;
  Competition.findById(req.params.id).then((competition) => {
    competition.requests.splice(competition.requests.indexOf(user), 1);
    competition.save().then(() => res.send('Request rejected.'));
  });
});

// Get all selected members for a specific competition
app.get('/competitions/:id/selected', (req, res) => {
  Competition.findById(req.params.id).then((competition) => {
res.send(competition.selected);
});
});

// Delete competition if team is complete
app.delete('/competitions/:id', (req, res) => {
Competition.findById(req.params.id).then((competition) => {
if (competition.selected.length === competition.teamSize) {
Competition.findByIdAndDelete(req.params.id).then(() => res.send('Competition deleted'));
} else {
res.send('Team is not complete yet')
}
});
});

app.listen(3000, () => console.log('Server running on port 3000'));
