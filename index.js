const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Timestamp Microservice API is running.');
});

app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;
  let date;

  if (!dateParam) {
    date = new Date();
  } else {
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
