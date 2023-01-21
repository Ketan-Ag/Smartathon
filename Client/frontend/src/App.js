import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [competitions, setCompetitions] = useState([]);
  const [name, setName] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [details, setDetails] = useState('');
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  useEffect(() => {
    // Get all competitions on component mount
    axios.get('http://localhost:8000/competitions').then(res => setCompetitions(res.data));
  }, []);

  const handleCreateCompetition = (e) => {
    e.preventDefault();
    // Create a new competition
    axios.post('http://localhost:8000/competitions', { name, teamSize, details }).then(() => {
      setName('');
      setTeamSize('');
      setDetails('');
    });
  }

  const handleViewRequests = (id) => {
    // View requests for a specific competition
    axios.get(`http://localhost:8000/competitions/${id}/requests`).then(res => {
      setRequests(res.data);
      setSelectedCompetition(id);
    });
  }

  const handleAcceptRequest = (user) => {
    // Accept a request for a specific competition
    axios.post(`http://localhost:8000/competitions/${selectedCompetition}/accept`, { user }).then(() => {
      setRequests(requests.filter(request => request !== user));
      setSelected([...selected, user]);
    });
  }

  const handleRejectRequest = (user) => {
    // Reject a request for a specific competition
    axios.post(`http://localhost:8000/competitions/${selectedCompetition}/reject`, { user }).then(() => {
      setRequests(requests.filter(request => request !== user));
    });
  }

  const handleSendRequest = (id) => {
    // Send a request to join a team
    const user = prompt('Enter your name:');
    axios.post(`http://localhost:8000/competitions/${id}/requests`, { user });
  }

  const handleDeleteCompetition = (id) => {
    // Delete a competition if team is complete
    axios.delete(`http://localhost:8000/competitions/${id}`);
  }

  return (
    <div className="App">
      <h1>Competitions</h1>
      <form onSubmit={handleCreateCompetition}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
                <input
          type="number"
          placeholder="Team Size"
          value={teamSize}
          onChange={e => setTeamSize(e.target.value)}
        />
        <textarea
          placeholder="Details"
          value={details}
          onChange={e => setDetails(e.target.value)}
        />
        <button type="submit">Create Competition</button>
      </form>
      <div>
        {competitions.map(competition => (
          <div key={competition._id}>
            <h2>{competition.name}</h2>
            <p>Team Size: {competition.teamSize}</p>
            <p>Details: {competition.details}</p>
            <button onClick={() => handleViewRequests(competition._id)}>View Requests</button>
            <button onClick={() => handleSendRequest(competition._id)}>Send Request</button>
            {competition.selected.length === competition.teamSize && <button onClick={() => handleDeleteCompetition(competition._id)}>Delete Competition</button>}
          </div>
        ))}
      </div>
      {selectedCompetition && (
        <div>
          <h2>Requests for {competitions.find(competition => competition._id === selectedCompetition).name}</h2>
          <ul>
            {requests.map(request => (
              <li key={request}>
                {request}
                <button onClick={() => handleAcceptRequest(request)}>Accept</button>
                <button onClick={() => handleRejectRequest(request)}>Reject</button>
              </li>
            ))}
          </ul>
          <h2>Selected Team Members</h2>
          <ul>
            {selected.map(user => <li key={user}>{user}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

