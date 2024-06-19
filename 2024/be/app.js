const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const exampleSchema = new mongoose.Schema({
    name: String,
    message: String,
});

const Example = mongoose.model('Example', exampleSchema);

app.get('/api', (req, res) => {
    console.log('Received a GET request on /api');
    res.send('Hello from the backend!');
});

app.post('/api/save', (req, res) => {
    console.log('Received a POST request on /api/save');
    const newExample = new Example({
        name: req.body.name,
        message: req.body.message,
    });

    newExample.save((err, example) => {
        if (err) {
            console.error('Error saving to MongoDB', err);
            return res.status(500).send(err);
        }
        console.log('Saved to MongoDB:', example);
        return res.status(200).send(example);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
