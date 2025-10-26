import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookingForm() {
  const { doctorId } = useParams();
  const [formData, setFormData] = useState({
    userName: "",
    age: "",
    gender: "",
    mobile: "",
    email: "",
    slot: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/book-appointment", {
      ...formData,
      doctorId,
    });
    alert("Appointment booked successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-md rounded-lg w-96"
      >
        <h2 className="text-xl font-bold text-center mb-4">Book Appointment</h2>
        <input
          type="text"
          name="userName"
          placeholder="Name"
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <select name="gender" onChange={handleChange} required className="border p-2 mb-2 w-full">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          type="datetime-local"
          name="slot"
          onChange={handleChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-green-500 text-white p-2 w-full">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
