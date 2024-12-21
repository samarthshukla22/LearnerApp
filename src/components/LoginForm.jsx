import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap'; // Import Spinner
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [showOverlay, setShowOverlay] = useState(false); // For background overlay

  const navigate = useNavigate(); // useNavigate hook for routing

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Show spinner
    setShowOverlay(true); // Show background overlay

    // Fetch data from an API (replace with actual API URL)
    fetch('https://sheetdb.io/api/v1/3a3f577dy1b14') // Sample mock API URL (replace with your actual URL)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        // Filter learners based on username and password
        const filteredLearners = data.filter(
          (learner) =>
            learner.RollNo && learner.Password &&
            learner.RollNo === trimmedUsername && learner.Password === trimmedPassword
        );

        if (filteredLearners.length > 0) {
          // After filtering, navigate and pass learnerData through state
          setLoading(false); // Hide spinner after fetching
          setShowOverlay(false); // Hide background overlay
          
          navigate('/learnerPerformance', { state: { learnerData: filteredLearners } });
        } else {
          alert('Invalid username or password');
          setLoading(false); // Hide spinner if login fails
          setShowOverlay(false); // Hide overlay if login fails
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
        setShowOverlay(false);
      });
  };

  return (
    <>
      {/* Background Overlay */}
      {showOverlay && <div className="overlay"></div>}

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Unacademy_Logo.png"
        alt="Unacademy Logo"
        style={{ maxWidth: '400px', display: 'block', margin: '0 auto 20px' }}
      />
      <Container fluid className="login-container">
        <Col md={4}>
          <Card className="login-card">
            <Card.Body>
              <h2 className="text-center login-title">Learner Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername" className="form-group-custom">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Unacademy RollNo"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control-custom"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="form-group-custom">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control-custom"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" block="true" className="submit-button">
                  {loading ? (
                    <Spinner animation="border" variant="light" size="sm" />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default LoginForm;
