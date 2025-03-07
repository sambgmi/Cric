import { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function TournamentManagement() {
  const [tournaments, setTournaments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    format: 'Knockout',
    startDate: '',
    endDate: '',
    location: '',
    status: 'Upcoming'
  });

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tournaments');
      setTournaments(response.data);
    } catch (error) {
      setError('Failed to fetch tournaments');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/tournaments', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      fetchTournaments();
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create tournament');
    }
  };

  const handleEdit = (tournament) => {
    setEditingId(tournament._id);
    setFormData({
      name: tournament.name,
      format: tournament.format,
      startDate: new Date(tournament.startDate).toISOString().split('T')[0],
      endDate: new Date(tournament.endDate).toISOString().split('T')[0],
      location: tournament.location,
      status: tournament.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tournament?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/tournaments/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchTournaments();
      } catch (error) {
        setError('Failed to delete tournament');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      format: 'Knockout',
      startDate: '',
      endDate: '',
      location: '',
      status: 'Upcoming'
    });
    setEditingId(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Tournament Management</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Create Tournament
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Format</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament) => (
            <tr key={tournament._id}>
              <td>{tournament.name}</td>
              <td>{tournament.format}</td>
              <td>{new Date(tournament.startDate).toLocaleDateString()}</td>
              <td>{new Date(tournament.endDate).toLocaleDateString()}</td>
              <td>{tournament.location}</td>
              <td>{tournament.status}</td>
              <td>
                <Button 
                  variant="info" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleEdit(tournament)}
                >
                  Edit
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDelete(tournament._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Edit Tournament' : 'Create Tournament'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tournament Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Format</Form.Label>
              <Form.Select
                value={formData.format}
                onChange={(e) => setFormData({...formData, format: e.target.value})}
              >
                <option>Knockout</option>
                <option>League</option>
                <option>Round-Robin</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option>Upcoming</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              {editingId ? 'Update Tournament' : 'Create Tournament'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default TournamentManagement;