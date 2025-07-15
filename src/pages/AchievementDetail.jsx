import { useParams } from 'react-router-dom';

const AchievementDetail = () => {
  const { id } = useParams();

  return (
    <div className="achievement-detail">
      <h2>Achievement Details</h2>
      <p>Details for achievement {id}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default AchievementDetail;
