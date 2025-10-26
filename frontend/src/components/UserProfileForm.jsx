// components/UserProfileForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    blood_group: '',
    donation: ''
  });

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other'];
  const donationOptions = ['Yes', 'No'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/profile/${userId}`, formData);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  useEffect(() => {
    // Fetch existing profile data (optional)
    axios.get(`http://localhost:5000/api/profile/${userId}`).then((res) => {
      setFormData(res.data);
    });
  }, [userId]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full p-2 border rounded"
          required
        />

        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Gender</option>
          {genders.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
          className="w-full p-2 border rounded"
          required
        />

        <select name="blood_group" value={formData.blood_group} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Blood Group</option>
          {bloodTypes.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select name="donation" value={formData.donation} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Donated Blood?</option>
          {donationOptions.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
