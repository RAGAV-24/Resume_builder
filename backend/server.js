const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/re';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for Profile
const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  image: String,
});

const Profile = mongoose.model('Profile', profileSchema);

// Define a schema and model for Resume
const resumeSchema = new mongoose.Schema({
  image: String,
  name: String,
  title: String,
  aboutme: String,
  email: String,
  phone: String,
  education: String,
  experience: String,
  skills: String,
});

const Resume = mongoose.model('Resume', resumeSchema);

// File storage
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Registration route
app.post('/register', upload.single('image'), async (req, res) => {
  const { name, email, age } = req.body;
  const newProfile = new Profile({
    name,
    email,
    age,
    image: req.file ? req.file.filename : null,
  });

  try {
    await newProfile.save();
    res.status(201).json({ message: 'Registration successful', profile: newProfile });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
});

// Profile route
app.get('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne(); // Modify this to fetch the specific user's profile if needed
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Route to save resume information
app.post('/api/resumes', upload.single('image'), async (req, res) => {
  const { name, title, aboutme, email, phone, education, experience, skills } = req.body;
  const newResume = new Resume({
    image: req.file ? req.file.filename : null,
    name,
    title,
    aboutme,
    email,
    phone,
    education,
    experience,
    skills,
  });

  try {
    await newResume.save();
    res.status(201).json({ message: 'Resume saved successfully', resume: newResume });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save resume', error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
