import React from 'react';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  const userId = '60d0fe4f5311236168a109d2'; // Replace with dynamic user ID (from authentication)

  return (
    <div>
      <Dashboard userId={userId} />
    </div>
  );
};

export default DashboardPage;
