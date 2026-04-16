import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ subject: '', rating: '' });
  
  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.subject) params.append('subject', filters.subject);
      if (filters.rating) params.append('rating', filters.rating);
      
      const res = await api.get(`/feedback?${params.toString()}`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error('Failed to fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    // eslint-disable-next-line
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Student Feedbacks</h2>
      </div>

      <div className="filters">
        <strong style={{ color: 'var(--text-muted)' }}>Filters:</strong>
        <input 
          type="text" 
          name="subject" 
          placeholder="Search subject..." 
          className="form-control" 
          style={{ width: '200px', padding: '0.4rem 0.8rem' }}
          value={filters.subject}
          onChange={handleFilterChange}
        />
        <select 
          name="rating" 
          className="form-control"
          style={{ width: '150px', padding: '0.4rem 0.8rem' }}
          value={filters.rating}
          onChange={handleFilterChange}
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          Loading feedbacks...
        </div>
      ) : feedbacks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--card-bg)', borderRadius: '12px', color: 'var(--text-muted)' }}>
          No feedbacks found matching your criteria.
        </div>
      ) : (
        <div className="feedback-grid">
          {feedbacks.map(fb => (
            <div key={fb._id} className="feedback-card">
              <div className="feedback-header">
                <div>
                  <div className="feedback-subject">{fb.subject}</div>
                  <div className="feedback-user">By: {fb.userId?.name || 'Unknown'}</div>
                </div>
                <div className="feedback-rating">
                  {'⭐'.repeat(fb.rating)} ({fb.rating})
                </div>
              </div>
              <div className="feedback-comments">
                "{fb.comments}"
              </div>
              <div className="feedback-footer">
                <div className="feedback-date">{formatDate(fb.createdAt)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewFeedback;
