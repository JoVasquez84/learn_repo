//setup read from .env
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;

const express = require ('express');
const bodyParser = require ('body-parser');
const { json } = require('body-parser');
const app = express();
const knex = require('knex')(require('./knexfile.js')[envs.NODE_ENV]);

app.use(express.json());

app.get('/movies/:id', function(req,res) {
    knex
        .select('*')
        .from('movies')
        .where({
            id:req.params.id}
            )
        .then((data) => {
            if (data.length === 0) {
                res.status(404).json ({
                    message:
                    'Movie ID not found'
                })
            }
            return data
        }
        )
        .then(data => res.status(200).json(data))
        .catch((err) => {
            if (res.status(400)) { 
                res.status(400).json({
                    message:
                    'Invalid ID supplied'
                })
            }
          })
})

app.get('/movies',function(req,res) {
    //if there was a query parameter passed then handel it
    if (req.query.title) {
        //get query string
        let inputTitle = req.query.title
        //let regex = /[a-zA-Z]/g; // /^[a-zA-Z\s]*$/
        //let regex = /^[a-z0-9A-Z\s]*$/; // ^[\w\s]+$
        let regex = /[\w\s]+$/; // ^[\w\s]+$
        let matches = inputTitle.match(regex)
        console.log('the regex results', matches)
        if (!matches) {
            console.log('invalid search')
            res.status(400).json({
                message:
                'Invalid titleQuery supplied'
            })
        } else {        
        knex
        .select('*')
        .from('movies')
        .where('title', 'ILIKE', `%${inputTitle}%`)
        //if the search query is empty
        .then((data) => {
            if (data.length === 0) {
                res.status(404).json ({
                    message:
                    'Your query string returned no results'
                })
            } 
            return data
            }           
        )
        .then ((data) => res.status(200).json(data))
        //if the query was input was invalid
        .catch(err =>
            res.status(400).json({
                message:
                'Invalid titleQuery supplied'
            })
         );
        }
        
    } else {
    //if not then do the below query because there was no query param
    //this is the knex query
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
        }
    //knex query ends here
});

app.post('/movies', function(req,res){
    let result;
    const newMovie = req.body;
    //sconsole.log(newMovie)
    if (newMovie.title && newMovie.runtime && newMovie.release_year && newMovie.director) {
        knex('movies')
        .insert([
            {title:newMovie.title, 
             runtime:newMovie.runtime, 
             release_year:newMovie.release_year, 
             director:newMovie.director}]
        )
        .returning('*')
        .then( data =>
            res.status(200).json(data)
        )
        .catch(err =>
            res.status(400).json({
                message:
                'Invalid Input From insert'
            })
         );
    } else {
        res.status(400).json({
            message:
            'Invalid Input'
        })
    }
})





// knex('users').where({
//     first_name: 'Test',
//     last_name:  'User'
//   }).select('id')
//   Outputs:
//   select `id` from `users` where `first_name` = 'Test' and `last_name` = 'User'

// term = '%' + term + '%';

// .orWhere( knex.raw( 'question  LIKE ?', [ term ] ) )
// .orWhere( knex.raw( 'note      LIKE ?', [ term ] ) )
// .orWhere( knex.raw( 'user_name LIKE ?', [ term ] ) )

module.exports = app;
