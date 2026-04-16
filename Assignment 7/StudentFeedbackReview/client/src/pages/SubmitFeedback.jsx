import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const SubmitFeedback = () => {
  const [formData, setFormData] = useState({
    subject: '',
    rating: 5,
    comments: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await api.post('/feedback', formData);
      navigate('/view');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Submit Feedback</h2>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Subject / Topic</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g. Data Structures Course, Campus Food, etc."
              required
            />
          </div>
          
          <div className="form-group">
            <label>Rating (1-5)</label>
            <select 
              name="rating" 
              value={formData.rating} 
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="5">⭐⭐⭐⭐⭐ (5) - Excellent</option>
              <option value="4">⭐⭐⭐⭐ (4) - Very Good</option>
              <option value="3">⭐⭐⭐ (3) - Good</option>
              <option value="2">⭐⭐ (2) - Fair</option>
              <option value="1">⭐ (1) - Poor</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Comments / Details</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="form-control"
              rows="5"
              placeholder="Please provide specific details about your experience..."
              required
            ></textarea>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitFeedback;
