const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Replace with your MongoDB connection string
// Use "mongodb://127.0.0.1" instead of "localhost"
const mongoURI = 'mongodb://127.0.0.1:27017/GuestBook_dev_v1_1';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.error(err));


async function connectToMongoDB() {
    await mongoose.connect(
        mongoURI
        // 'mongodb://127.0.0.1:27017/GuestBook_dev_v1_1'
    ).then(() => {
        console.log('Database connection successful');
    }).catch((err) => {
        console.error('Database connection failed', err);
    });
}


// Define the note schema for MongoDB
const NoteSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', NoteSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    return res.sendFile('./public/index.html', {'root' : __dirname});
});

// Get all notes (at website start)
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Submit a new note
app.post('/notes', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Please enter a note' });
  }

  try {
    const newNote = new Note({ text });
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

async function main() {
    await connectToMongoDB();

}
main();
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
