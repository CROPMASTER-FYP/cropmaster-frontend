import React, { useState, useEffect } from 'react';
import './CropInfo.css';

const CropInfo = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://tyktyk.pythonanywhere.com/cropinfo/crops/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCrops(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="crop-container">Loading...</div>;
  }

  if (error) {
    return <div className="crop-container">Error: {error.message}</div>;
  }

  return (
    <div className='crop-container'>
      <h1>Crop Information</h1>
      {crops.map((crop) => (
        <div key={crop.id} className="crop-card">
          <h2>{crop.name}</h2>
          <img src={crop.image} alt={crop.name} className="crop-image"/>
          <p><strong>Category:</strong> {crop.category}</p>
          <p><strong>Planting Requirements:</strong> {crop.description.planting_requirements}</p>
          <p><strong>Irrigation Schedule:</strong> {crop.description.irrigation_schedule}</p>
          <p><strong>Fertilizer Recommendations:</strong> {crop.description.fertilizer_recommendations}</p>
          <p><strong>Pest Management:</strong> {crop.description.pest_management}</p>
          <p><strong>Harvesting Techniques:</strong> {crop.description.harvesting_techniques}</p>
          <p><strong>Total Rating:</strong> {crop.total_rating}</p>
          <p><strong>Total Ratings Count:</strong> {crop.total_ratings_count}</p>
        </div>
      ))}
    </div>
  );
};

export default CropInfo;
