const express = require("express");
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Vocabulary Tracker Backend Çalışıyor ❤️');
});

app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));