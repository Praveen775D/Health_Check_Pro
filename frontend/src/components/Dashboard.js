import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../services/api';
import { Line } from 'react-chartjs-2'; // Importing a chart library (e.g., Chart.js)

const Dashboard = ({ userId }) => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData(userId);
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, [userId]);

  // Example of graphical representation for scores (using Chart.js)
  const chartData = {
    labels: ['Physical Fitness', 'Nutrition', 'Mental Well-being', 'Lifestyle', 'Bio-markers'],
    datasets: [
      {
        label: 'Health Score',
        data: dashboardData ? dashboardData.latestAssessment.categoryScores.map((score) => score.score) : [],
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Health Overview</h3>
      <div>
        <h4>User Profile</h4>
        <p>Name: {dashboardData.user.name}</p>
        <p>Email: {dashboardData.user.email}</p>
        <p>Age: {dashboardData.user.age}</p>
        <p>Weight: {dashboardData.user.weight}</p>
        <p>Blood Group: {dashboardData.user.bloodGroup}</p>
      </div>
      <div>
        <h4>Latest Health Assessment</h4>
        <p>Overall Score: {dashboardData.latestAssessment.overallScore}%</p>
        <div>
          <Line data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
