import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Eye, Download } from "lucide-react";
import axios from "axios";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [scoreData, setScoreData] = useState(null);
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem("userId");

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scoreRes, historyRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/assessment/dashboard/${userId}`),
          axios.get(`http://localhost:5000/api/assessment/history/${userId}`)
        ]);
        setScoreData(scoreRes.data);
        setHistory(historyRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, [userId]);

  const tips = {
    physical: "🏋️ Improve by adding regular exercise to your routine.",
    nutrition: "🥗 Consider balanced meals with proteins, carbs, and greens.",
    mental: "🧘‍♂️ Try meditation or journaling to enhance mental clarity.",
    lifestyle: "🛌 Maintain consistent sleep and reduce screen time.",
    biomarkers: "💉 Track your vital stats regularly for early detection."
  };

  const buttonStyle =
    "py-2 px-4 mb-2 rounded-lg shadow-md font-medium transition duration-300 w-full text-white";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black bg-opacity-70">
      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full md:w-64 bg-black bg-opacity-90 text-white p-4 z-10"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
            {[{ to: "/profile", label: "Profile", color: "blue" },
              { to: "/home", label: "Home", color: "green" },
              { to: "/assessment", label: "Take Assessment", color: "orange" },
              { to: "/assessment-history", label: "Assessment History", color: "yellow" },
              { to: "/leaderboard", label: "Leaderboard", color: "purple" },
              { to: "/settings", label: "Settings", color: "teal" }
            ].map(({ to, label, color }) => (
              <Link to={to} key={label}>
                <button className={`${buttonStyle} bg-${color}-600 hover:bg-${color}-700`}>
                  {label}
                </button>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto text-white bg-gradient-to-br from-gray-900 to-gray-800">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h2>

          {/* Radial Charts */}
          {scoreData ? (
            <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">🧾 Latest Assessment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(scoreData.categoryScores).map(([key, val]) => {
                  const chartData = [
                    { name: key, value: val, fill: "#10b981" },
                    { name: "Remaining", value: 100 - val, fill: "#1f2937" },
                  ];
                  return (
                    <div key={key} className="bg-gray-900 p-4 rounded-xl">
                      <h4 className="text-lg font-semibold text-center capitalize mb-2">{key}</h4>
                      <ResponsiveContainer width="100%" height={150}>
                        <RadialBarChart innerRadius="60%" outerRadius="100%" barSize={14} data={chartData} startAngle={90} endAngle={-270}>
                          <RadialBar dataKey="value" clockWise />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <p className="text-center mt-2 text-sm text-white">
                        {val}% performance in this category
                      </p>
                      <p className="text-sm text-yellow-400 mt-2 text-center">{tips[key]}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 text-center text-xl text-yellow-300 font-bold">
                🏆 Total Score: {scoreData.totalScore}
              </div>
            </div>
          ) : (
            <p className="text-white mt-6">No recent assessments. Take one to get insights!</p>
          )}

          {/* Assessment History */}
          <div className="bg-gray-800 bg-opacity-90 mt-10 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-4">📚 Assessment History</h3>
            {history.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left border border-gray-700">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-4 py-2 border-r border-gray-700">Date</th>
                      <th className="px-4 py-2 border-r border-gray-700">Score (%)</th>
                      <th className="px-4 py-2 border-r border-gray-700">View</th>
                      <th className="px-4 py-2">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item, idx) => (
                      <tr key={idx} className="bg-gray-700 text-white">
                        <td className="px-4 py-2 border-r border-gray-600">{new Date(item.date).toLocaleDateString()}</td>
                        <td className="px-4 py-2 border-r border-gray-600">{item.totalScore}</td>
                        <td className="px-4 py-2 border-r border-gray-600">
                          <button onClick={() => window.open(`/assessment/view/${item._id}`)} className="text-blue-400 hover:text-blue-600">
                            <Eye size={18} />
                          </button>
                        </td>
                        <td className="px-4 py-2">
                          <button onClick={() => window.open(`/api/assessment/pdf/${item._id}`)} className="text-green-400 hover:text-green-600">
                            <Download size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No history found.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
