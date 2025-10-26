import React, { useState } from "react";
import { useParams } from "react-router-dom";

const BookAppointment = () => {
  const { doctorName } = useParams();
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Details:", { doctorName, ...form });
    alert("Appointment booked successfully!");
  };

  return (
    <div>
      <h1>Book Appointment with {doctorName}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
        <input type="number" name="age" placeholder="Your Age" required onChange={handleChange} />
        <select name="gender" required onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="date" name="date" required onChange={handleChange} />
        <input type="time" name="time" required onChange={handleChange} />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookAppointment;
