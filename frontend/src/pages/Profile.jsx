// pages/Profile.jsx
import React from 'react';
import UserProfileForm from '../components/UserProfileForm';

const Profile = () => {
  const userId = 'REPLACE_WITH_LOGGED_IN_USER_ID'; // Get from auth or context

  return (
    <div className="min-h-screen bg-gray-100">
      <UserProfileForm userId={userId} />
    </div>
  );
};

export default Profile;
