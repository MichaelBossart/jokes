const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());

const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const favJokes = [];

app.get('/joke', async (req, res)=> {
    try {
        const joke = await axios({
            url: 'https://icanhazdadjoke.com/',
            method: 'get',
            headers: {'Accept': 'application/json'}
          }) 
        console.log('joke', joke.data)
        res.send(joke.data)
    }
    catch(err){
        console.log('err', err)
        res.send(err)
    }
} )

app.post('/addNewFav', (req, res)=>{
    const newJoke = req.body.jokes;
    favJokes.push(newJoke);
    res.send(favJokes);
})