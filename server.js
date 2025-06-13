const express = require('express');
const cors = require('cors');
const eventsData = require('./src/data/eventsData');

const app = express();
app.use(cors());
app.use(express.json());

// Get upcoming events with pagination
app.get('/api/events/upcoming', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const events = eventsData.slice(startIndex, endIndex);
  const hasMore = endIndex < eventsData.length;

  res.json({
    events,
    hasMore,
    total: eventsData.length
  });
});

// Get event by ID
app.get('/api/events/:id', (req, res) => {
  const event = eventsData.find(e => e.id === parseInt(req.params.id));
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});