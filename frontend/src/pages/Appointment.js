import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/doctors").then((response) => {
      setDoctors(response.data);
    });
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-4">Available Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="p-4 bg-white shadow-md rounded-lg">
            <img
              src={doctor.profilePic}
              alt={doctor.name}
              className="w-24 h-24 rounded-full mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold">{doctor.name}</h3>
            <p className="text-sm">{doctor.specialization}</p>
            <p className="text-sm">{doctor.hospital}</p>
            <button
              onClick={() => navigate(`/booking/${doctor._id}`)}
              className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Open for Registration
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointment;
