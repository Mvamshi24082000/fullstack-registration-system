import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    mobile: ''
  });
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'http://127.0.0.1:5000/users';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get(API_URL);
    setUsers(response.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 💡 Form Validations
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!nameRegex.test(form.name)) {
      alert("Name should only contain letters and spaces.");
      return;
    }

    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!mobileRegex.test(form.mobile)) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    // Submit the form
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: '', email: '', dob: '', gender: '', mobile: '' });
      fetchUsers();
    } catch (err) {
      alert("Something went wrong while submitting.");
    }
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
      mobile: user.mobile
    });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchUsers();
  };

  return (
    <div className="container">
      {/* Registration Form */}
      <div className="modal">
        <div className="form">
          <h2 className="title">User Registration</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              title="Enter 10-digit mobile number"
            />

            <button type="submit" className="add-user-btn">
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    />
                  </svg>
                </div>
              </div>
              <span>{editingId ? 'Update User' : 'Add User'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Registered Users */}
      <div className="modal-users">
        <h3 className="title">Registered Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> ({user.email}) <br />
              Gender: {user.gender} | DOB: {new Date(user.dob).toDateString()} | Mobile: {user.mobile} <br />
              <button className="cssbuttons-io" onClick={() => handleEdit(user)}>
                <span>Edit</span>
              </button>
              <button className="cssbuttons-del" onClick={() => handleDelete(user.id)}>
                <span>Delete</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;