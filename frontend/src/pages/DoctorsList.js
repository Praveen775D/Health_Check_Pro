import React from "react";
import { useNavigate } from "react-router-dom";

const doctors = [
  { name: "Dr. John Doe", specialty: "Cardiologist", age: 45, experience: "15 years", phone: "9876543210", image: "/doctor1.jpg" },
  { name: "Dr. Sarah Smith", specialty: "Dermatologist", age: 38, experience: "10 years", phone: "9876543211", image: "/doctor2.jpg" }
];

const DoctorsList = () => {
  const navigate = useNavigate();

  const handleBookAppointment = (doctorName) => {
    navigate(`/book-appointment/${doctorName}`);
  };

  return (
    <div>
      <h1>Available Doctors</h1>
      {doctors.map((doc, index) => (
        <div key={index} className="doctor-card">
          <img src={doc.image} alt={doc.name} />
          <h2>{doc.name}</h2>
          <p>Specialty: {doc.specialty}</p>
          <p>Age: {doc.age}</p>
          <p>Experience: {doc.experience}</p>
          <p>Phone: {doc.phone}</p>
          <button onClick={() => handleBookAppointment(doc.name)}>Book Appointment</button>
        </div>
      ))}
    </div>
  );
};

export default DoctorsList;
