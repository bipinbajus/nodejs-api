require("dotenv").config()
const express = require("express")
const  { MongoClient, ServerApiVersion } = require("mongodb")


//mongodb
let db, trips, expenses
const uri = `mongodb+srv://admin:${process.env.PASS}@trips-expenses.9wf0i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  db = client.db("trips-expenses")
  
  trips = db.collection('trips')
  expenses = db.collection('expenses')

  // client.close();
});

//initialize express
const app = express()

//parse incoming requests
app.use(express.json())

app.get('/trips', (req,res) => {
    console.log("get trips");
    trips.find().toArray((err, items) => {
        if (err) {
            console.error(err);
            res.status(500).json({err:err})
            return
        }
        res.status(200).json({trips:items})
    })
})

app.post('/trips', (req,res) => {
    const name = req.body.name
    console.log("post trip",trips);
    trips.insertOne({name:name}, (err, results) => {
        if(err){
            console.error(err);
            res.status(500).json({err:err})
            return
        }
        console.log(results);
        res.status(200).json({ok: true})
    })
})



app.post('/expenses', (req,res) => {
    expenses.insertOne(
        {
            trip:req.body.trip,
            date:req.body.date,
            amount:req.body.amount,
            category:req.body.category,
            description:req.body.description
        },
        (err,result) => {
            if (err) {
                console.error(err);
                res.status(500).json({err:err})
                return
            }
            res.status(200).json({ok:true})
        }
    )
})

app.get('/expenses', (req,res) => {
    console.log("get expenses ggg", expenses);

    expenses.find({trip: req.body.trip}).toArray((err,items) => {
        if (err) {
            console.error(err);
            res.status(500).json({err:err})
            return
        }
        res.status(200).json({expenses:items})
    })
   
})

//listen to server
app.listen(3000, ( ) => console.log("server port 3000") )





