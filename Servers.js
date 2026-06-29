const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.ANTHROPIC_KEY;

app.use(cors({origin:'*'}));
app.use(express.json({limit:'10mb'}));

app.get('/', (req, res) => res.json({status:'JARVIS Proxy Online'}));

app.post('/api/chat', async (req, res) => {
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });
    const data = await r.json();
    res.json(data);
  } catch(e) {
    res.status(500).json({error:{message:e.message}});
  }
});

app.listen(PORT, () => console.log('JARVIS Proxy on port ' + PORT));
