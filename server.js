const express = require('express')
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const path = require('path'); 
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express()
const port = 3000

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY

)
app.get('/index.html', async (req, res) => {
    res.sendFile('index.html' , { root: __dirname});
}); 


app.get('/userBreeds', async (req, res) => {
    console.log("attempting to get da user dawgs")

    let { data, error } = await supabase
    .from('userBreeds')
    .select('*')

    res.send(data)
})

app.post('/userBreeds', async (req, res) => {
    console.log("Adding a doggo")

    console.log(req.body)
    const breed = req.body.breed;

    const { data, error } = await supabase
    .from('userBreeds')
    .insert({ breeds: breed})
    .select();

    if (error) {
        console.log(`Error: ${error}`);
        res.statusCode = 500;
        res.send(error);
    }



    res.send(data);
})


app.get('/breed', async (req, res) => {
    console.log("woob")
    const { data, error } = await supabase
    .from('breeds') // Replace with whatever your breed table is, see below for more
    .select('*');

    if (error) {
        console.log("error fetching doggo breeds", error)
        return res.status(500).json({error: "failed to get da dawgs" });
    }
    
    res.send(data);
}); 


app.listen(port, () => {

    console.log(`Server is running on port ${port}`)
});

// ONLY RUN THIS ONCE TO POPULATE SUPABASE TABLE WITH ALL DOG BREEDS


/*async function populateBreedsTable() {
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await res.json();

  const breedList = [];

  for (const breed in data.message) {
    if (data.message[breed].length > 0) {
      data.message[breed].forEach(sub => {
        breedList.push({ name: `${breed} ${sub}`, value: `${breed}/${sub}` });
      });
    } else {
      breedList.push({ name: breed, value: breed });
    }
  }

  const { error } = await supabase
  .from('populate')
  .insert(breedList); // REPLACE 'populate' with desired table's name. This will then be your breeds table that you call to populate the dropdown menu on custompicker.html via /breed

  if (error) {
    console.error('Failed to insert breeds:', error);
  } else {
    console.log('Breeds successfully inserted into Supabase!');
  }
}

populateBreedsTable();*/