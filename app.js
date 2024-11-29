const express = require('express');
const cors = require('cors');
const app = express();
const port = 6969;

const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

app.use(express.json());
app.use(cors());

app.use('/accounts', authRoutes);
app.use('/info', dataRoutes);

app.get('/', (req, res) => {
  res.send('Hello from back end!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
