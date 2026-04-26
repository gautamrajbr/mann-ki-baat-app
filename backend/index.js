const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Dummy data based on prompt
const therapists = [
  {
    id: '1',
    name: 'Dr. Ananya Sharma',
    title: 'Clinical Psychologist, M.Phil',
    rating: 4.9,
    location: 'Mumbai, IND',
    languages: ['English', 'Hindi'],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1QGWqmi0-Hvn0_89vYuGmGxMvdjEG6noy2LCLYfqbrdungKfo1kjGRxLWRuZWF4mE6swvCgrGl6YjwUrqOzSfsrHx1iK0UxKXS8-3U2QzrRlzf1TYgvsfv4FrA9rOOY_srqGmMh-DYVSt4vBbLgAtxWKcBHpmHUXGH36qEyXFQElbkOh5DIG0AXGa05pWN9Fn0gQfh4clgNhQsn7oFcgNdxXIll_htZDe0VhgDQ3T7km7YtysB_Dtg4PCGhHLUp6IMK3Afhpy5v8'
  },
  {
    id: '2',
    name: 'Rajiv Menon',
    title: 'Counseling Psychologist',
    rating: 4.8,
    location: 'Bengaluru, IND',
    languages: ['English', 'Kannada'],
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJvwSEBvwvjd1G8uJ1SXj3W4Duc9x030Zl7yJUokzN8Ezi8hhjbK4iavCtJlC__hI0bWPQpvcs8doqXKHFx7V_FmmZYiQasYV1i2pck96NhdKO0z57YMV5WmF1xVhVqy0w_Gn1HRLG42lPeS54w_dsyNxXgj5Bftp10B3Q-l-rLOMOtzavl6k_qyLspyTV6_K1Pi5uLjsAIEnW8udrXLS7kEG10-0a9NDiKm1hoPSNdHnyBTSYNMRo1lFcxVZesYFBumGTdnnlcqE'
  }
];

const sessions = [
  {
    id: '1',
    type: 'Couple Therapy',
    description: 'Navigate challenges, improve communication, and rekindle intimacy in a supportive environment.',
    duration: '60 Min',
    icon: 'favorite'
  },
  {
    id: '2',
    type: 'Parent-Child Session',
    description: 'Bridge generational gaps and foster mutual understanding through guided dialogue.',
    duration: '90 Min',
    icon: 'family_restroom'
  }
];

app.get('/api/therapists', (req, res) => {
  res.json(therapists);
});

app.get('/api/sessions', (req, res) => {
  res.json(sessions);
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  // Simple echo bot for demo purposes
  setTimeout(() => {
    res.json({
      text: `I hear you. You said: "${message}". How does that make you feel?`,
      sender: 'ai',
      timestamp: new Date().toISOString()
    });
  }, 1000);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
