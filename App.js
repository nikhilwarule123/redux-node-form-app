import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFormData } from './store/formSlice';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({ name: '', dob: '', place: '' });
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false); // NEW

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setFormData(form));

    try {
      const res = await axios.post('http://localhost:5000/submit', form);
      alert(res.data.message);
      setForm({ name: '', dob: '', place: '' });
      setRefresh(prev => !prev);
    } catch (err) {
      alert('Error sending data to server.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Personal Info Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required /><br /><br />
        <input type="date" name="dob" value={form.dob} onChange={handleChange} required /><br /><br />
        <input type="text" name="place" placeholder="Place" value={form.place} onChange={handleChange} required /><br /><br />
        <button type="submit">Submit</button>
      </form>

      <hr />


    </div>
  );
}

export default App;
