//setup read from .env
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;

const express = require ('express');
const bodyParser = require ('body-parser')
const app = express();
const PORT = process.env.PORT || 3000;
const knex = require('knex')(require('./knexfile.js')[envs.NODE_ENV]);

app.use(express.json());

app.get('/movies',function(req,res) {
    knex
        .select('*')
        .from('movies')
        .then(data => res.status(200).json(data))
        .catch(err =>
            res.status(404).json({
                message:
                'The data you are looking for could not be found. Please try again'
            })
         );
});

app.listen(PORT, () => {
    console.log( `The server is up and running on ${PORT}`);
});
