
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());


app.post('/submit', (req, res) => {
    const { name, dob, place } = req.body;
    const sql = 'INSERT INTO forms (name, dob, place) VALUES (?, ?, ?)';
    db.query(sql, [name, dob, place], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Error saving data' });
        } else {
            res.json({ message: 'Data saved to MySQL!' });
        }
    });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
