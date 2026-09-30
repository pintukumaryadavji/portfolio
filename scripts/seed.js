require('dotenv').config();
const mongoose = require('mongoose');
require('../app');
const Project = mongoose.model('Project');
const samples = [
  { title: 'Online Quiz System', description: 'Responsive MCQ test platform with secure login, real-time participation and instant score calculation.', tech: ['React', 'Node.js', 'JavaScript'], liveUrl: '', repoUrl: 'https://github.com/YOUR_USERNAME/online-quiz-system' },
  { title: 'Weather Forecast Web App', description: 'Real-time weather for 200+ cities showing temperature, humidity and wind speed from a public REST API.', tech: ['JavaScript', 'REST API', 'Async/Await'], liveUrl: '', repoUrl: 'https://github.com/YOUR_USERNAME/weather-app' },
  { title: 'Welcome to Incredible India', description: 'Responsive 8+ page travel site presenting 15+ famous destinations and cultural highlights.', tech: ['HTML', 'CSS'], liveUrl: '', repoUrl: 'https://github.com/YOUR_USERNAME/incredible-india' }
];
(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Project.deleteMany({});
  await Project.insertMany(samples);
  console.log('Seeded', samples.length, 'projects'); process.exit(0);
})();
