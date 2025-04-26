import { useState } from 'react';
import axios from 'axios';
import RoadmapGraph from './RoadmapGraph'; // ✅ Adjust path if needed


const GoalSetupPage = () => {
  const [goalText, setGoalText] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/generate-roadmap', {
        goalText
      });

      console.log(res.data); // ✅ View this in console to debug
    //   setRoadmap(res.data.message); // Or setRoadmap(res.data.roadmap) once API returns full roadmap
    setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error("Error fetching roadmap:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Learning Roadmap</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={goalText}
          onChange={(e) => setGoalText(e.target.value)}
          placeholder="Enter your goal"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Roadmap'}
        </button>
      </form>

      
    </div>
  );
};

export default GoalSetupPage;
