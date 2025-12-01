import axios from 'axios';

const API_URL = 'https://health-check-pro.onrender.com/api'; // Change this to your backend URL

// Fetch user dashboard data
export const getDashboardData = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/${userId}`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching dashboard data:', error);
    throw error;
  }
};
