const express = require('express') // node.js function find module named express, creates a new instance of the express framework
const app = express() // variable that calls express
const MongoClient = require('mongodb').MongoClient // node.js function to find mongodb, create an instance of the Mongoclient to connect to a cluster
const PORT = 6969
require('dotenv').config()

let db
let dbConnectionStr = process.env.DB_String // to ask Jeff what doing
let dbName = 'dogs'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        db = client.db(dbName)
        console.log(`Connected to ${dbName} database`)
    }).catch(e => {
        console.error('Failed to connect to database :(', e)
    })

app.set('view engine', 'ejs') // assigns a setting name to a value, in this case the engine is ejs
app.use(express.static('public')) // middleware that allows express to access and use local files
app.use(express.urlencoded({ extended: true })) // needed for POST and PUT rqquests, allows express to recognise incoming request as strings or arrays 
app.use(express.json()) // allows express to recognise incoming request object as a JSON Object

app.get('/', async (req, res) => {
    console.log('got a request for /')

    try {
        // Fetch dog breeds from Dog CEO API
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json()
        const breeds = Object.keys(data.message) //extract breed names

        const dbData = await db.collection('dogs').find().sort({ likes: -1 }).toArray()

        res.render('index.ejs', { info: dbData, breeds: breeds})
    } catch (error) {
        console.log(error)
    }
})

app.post('/addDog', (req, res) => {
    db.collection('dogs').insertOne({
        dogName: req.body.dogName,
        dogBreed: req.body.dogBreed,
        likes: 0
    })
        .then(result => {
            console.log('Dog added')
            res.redirect('/')
        })
        .catch(error => console.error(error))
})

app.put('/addOneLike', (req, res) => {
    const query = {
        dogName: req.body.dogNameS,
        dogBreed: req.body.dogBreedS
      } 
      console.log('MongoDB Query:', query) // debugging what was actually being sent to Mongo, for some reason the query strings had white space

    db.collection('dogs').updateOne({
        dogName: req.body.dogNameS,
        dogBreed: req.body.dogBreedS
    },
        {
            $set: {
                likes: Number(req.body.likesS) + 1
            },
        }, {
        sort: { _id: -1 }
    })
        .then(result => {
            console.log('Added one like')
            console.log(result)
            res.json('Like added')
        })
        .catch(error => console.error)
})


app.post('/addOneLikeForm', (req, res) => {
    db.collection('dogs').updateOne({
        dogName: req.body.dogNameS,
        dogBreed: req.body.dogBreedS
    },
        {
            $set: {
                likes: Number(req.body.likeS) + 1
            },
        }, {
        sort: { _id: -1 }
    })
        .then(result => {
            console.log('Added one like')
            res.redirect('/')
        })
        .catch(error => console.error)
})

app.delete('/deleteDog', (req, res) => {
    db.collection('dogs').deleteOne({dogName: req.body.dogNameS})
    .then(result => {
        console.log('Dog Deleted')
        res.redirect('/')
    })
    .catch(error => console.error(error))

})



app.post('/deleteDogImproved', (req, res) => {
    db.collection('dogs').deleteOne({dogName: req.body.dogNameS})
    .then(result => {
        console.log(result)
        console.log('Dog Deleted')
        res.redirect('/')
    })
    .catch(error => console.error(error))

})


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})