import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Achievement.css';

const achievements = [
  {
    id: 1,
    title: "International Engineering Competition 2023",
    image: "/images/achievement1.jpg",
    isInternational: true,
  },
  {
    id: 2,
    title: "National Civil Engineering Project Exhibition",
    image: "/images/achievement2.jpg",
    isInternational: false,
  },
  // Add more achievements as needed
];

const Achievement = () => {
  const [filter, setFilter] = useState('all');

  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(a => a.isInternational);

  return (
    <div className="achievement-container">
      <div className="filter-buttons">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All Events
        </button>
        <button 
          className={filter === 'international' ? 'active' : ''} 
          onClick={() => setFilter('international')}
        >
          International Events
        </button>
      </div>

      <div className="achievement-grid">
        {filteredAchievements.map((achievement) => (
          <Link 
            to={`/achievement/${achievement.id}`} 
            key={achievement.id}
            className="achievement-card"
          >
            <div className="card-image">
              <img src={achievement.image} alt={achievement.title} />
            </div>
            <div className="card-overlay">
              <h3>{achievement.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Achievement;
