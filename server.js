require('dotenv').config();
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const querystring = require('querystring');

// Use "mongodb://127.0.0.1" instead of "localhost"
// const filter_domain = "http://127.0.0.1";  // does not work

const app = express();
const port = process.env.SERVER_PORT || 3000;
const filter_domain = process.env.FILTER_DOMAIN || '1270.0.1';
const mongoURI = process.env.MONGO_URI || 'mongodb//127.0.0.1:27017/GuestBook_dev_v1_1';
const filter_port = process.env.FILTER_PORT || 5000;


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
  text: {type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', NoteSchema);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));


// TODO: Convert the function into proper Promise adaptation
function httpPostRequest(options, postData) {
  return new Promise(function(resolve, reject) {
    const req = http.request(options, function(res) {
      res.setEncoding('utf8');
      let body = Array();
      res.on('data', (chunk) => {
        // this chunk has two parts, "status" and "message"
        body.push(Buffer.from(chunk));
        // console.log(`BODY: ${body}; CHUNK: ${chunk}; MESSAGE: ${chunk['message']}; STATUS: ${chunk['status']}
        //   SIZE: ${chunk.length}; TYPE: ${typeof(chunk)};
        // `);
      });

      // res.on('error', (e) => {
      //   console.error(`Problem with response: ${e.message}`);
      //   reject(e);
      // });

      res.on('end', function() {
        try {
          // console.log(`PARSING BODY: ${body}`);
          body = JSON.parse(Buffer.concat(body).toString());
          // console.log(`PARSED BODY: ${body}`);
        } catch(e) {
          reject(e);
        }
        resolve(body);
      });
    });

    // reject on request error
    req.on('error', (e) => {
      // console.error(`Problem with request: ${e.message}`);
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

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
    filtered_text = "";
    const postData = JSON.stringify({
      'user_input': text
    });
    const options = {
      host: filter_domain,
      port: filter_port,
      path: '/filter',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    httpPostRequest(options, postData).then(function(body) {
      // console.log(`Received Body: ${body}; Type: ${typeof(body)}; `)
      filtered_text = body['message'];
      filtered_text = filtered_text.replace(/(\r\n|\n|\r)/gm, ""); // removing excess line breaks
    }).then(function() {
      // console.log(`Saving filtered_text: ${filtered_text}`);
      const newNote = new Note({ text: filtered_text });
      const savedNote = newNote.save();
      return savedNote;
      // console.log(`Saved filtered_text: ${filtered_text}`);
    }).then((message) => {
      return res.status(200).json(message);
    });
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
