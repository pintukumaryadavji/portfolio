require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const Project = mongoose.model('Project', new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tech: [String],
  liveUrl: String,
  repoUrl: String,
  createdAt: { type: Date, default: Date.now }
}));
const Message = mongoose.model('Message', new mongoose.Schema({
  name: { type: String, required: true, maxlength: 80 },
  email: { type: String, required: true, maxlength: 120 },
  message: { type: String, required: true, maxlength: 2000 },
  createdAt: { type: Date, default: Date.now }
}));

let conn;
async function db() {               // cached so it also works on serverless (Vercel)
  if (!conn) conn = mongoose.connect(process.env.MONGODB_URI);
  return conn;
}

const app = express();
app.use(express.json({ limit: '50kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', async (req, res, next) => {
  try { await db(); next(); } catch (e) { res.status(500).json({ error: 'Database connection failed' }); }
});

const admin = (req, res, next) =>
  req.get('x-admin-key') === process.env.ADMIN_KEY ? next() : res.status(401).json({ error: 'Unauthorized' });

app.get('/api/projects', async (_req, res) =>
  res.json(await Project.find().sort({ createdAt: -1 })));

app.post('/api/projects', admin, async (req, res) => {
  try { res.status(201).json(await Project.create(req.body)); }
  catch (e) { res.status(400).json({ error: e.message }); }
});
app.delete('/api/projects/:id', admin, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id); res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !/^\S+@\S+\.\S+$/.test(email || '') || !message)
    return res.status(400).json({ error: 'Enter your name, a valid email and a message.' });
  await Message.create({ name, email, message });
  res.status(201).json({ ok: true });
});

module.exports = app;
