import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h2>Welcome, {user?.name} 👋</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            What would you like to do today?
          </p>
        </div>
      </div>

      <div className="feedback-grid" style={{ marginTop: '2rem' }}>
        <div className="feedback-card" style={{ alignItems: 'center', textAlign: 'center', padding: '3rem 2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Submit New Feedback</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Share your thoughts on a subject and help us improve.
          </p>
          <Link to="/submit" className="btn btn-primary" style={{ width: '100%' }}>
            Write Feedback
          </Link>
        </div>

        <div className="feedback-card" style={{ alignItems: 'center', textAlign: 'center', padding: '3rem 2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>View All Feedbacks</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Browse what other students are saying and filter by ratings.
          </p>
          <Link to="/view" className="btn btn-secondary" style={{ width: '100%' }}>
            Browse Feedback
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
