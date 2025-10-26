import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar bg-blue-900 text-white h-screen w-60 p-4">
      <h2 className="text-xl font-bold mb-4">Health Check Pro</h2>
      <ul className="space-y-4">
        <li><Link to="/profile" className="block p-2 hover:bg-blue-700">Profile</Link></li>
        <li><Link to="/home" className="block p-2 hover:bg-blue-700">Home</Link></li>
        <li><Link to="/appointments" className="block p-2 hover:bg-blue-700">Appointments</Link></li>
        <li><Link to="/services" className="block p-2 hover:bg-blue-700">Services</Link></li>
        <li><Link to="/assignment" className="block p-2 hover:bg-blue-700">Assignment</Link></li>
        <li><Link to="/leaderboard" className="block p-2 hover:bg-blue-700">Leaderboard</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
