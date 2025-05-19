# Dog Breed Picker - Discovering Dog Breeds

## Created by Isa Ansari

## Project Description

Dog Breed Picker is a full functioning web application with front and back-end setup. Users can browse, learn about, and enjoy pictures of various dog breeds through the interface. Designed for leisurely dog viewers, or any other dog "enthusiasts" that may need pictures of various breeds for any reason, the site utilizes real-time APIs and a custom database to display and track user-selected breeds. 

The website's intended browser is primarily for desktop. Whether it be Firefox, Google Chrome, or any other desktop browser of choice. 

Vercel Link: https://inst-377-final-azure.vercel.app/

**Link to Developer Manual: [Developer Manual](#developer-manual).**


# Developer Manual

## Audience 
To any developers who will maintain and continue building on this project, it is crucial you understand HTML, CSS, Javascript, web application development, and back-end server development for API calls. 

## Installation
First the repository must be cloned. Following this, dependencies must be installed for website functionality. Run the following in the terminal:

```
npm install
```

Once all packages/dependencies have been installed, a .env file MUST be created in the root directory with the following:

```
SUPABASE_URL = your_supabase-url
SUPABASE_KEY = your_supaase-key
```

## API Documentation

### fetch /breed
Before running the application server, the API endpoints in server.js must be functional. To accomplish this, two supabase tables must be created following the addition of your .env file with your supabase URL and key. 

```
GET /breed
```
Fetches all dog breeds from Supabase **breeds** table. The spelling is important. However, the code and table name may be changed if you wish. At the bottom of server.js is a function called populateBreedsTable(). This is a function is commented out as it should **ONLY BE RAN ONCE**. This is how the breeds table gets populated with 100 various dog breeds from the dog CEO api, and then becomes the API endpoint which script.js will call in order to populate the dropdown menu on custompicker.html. Further instructions can be found in server.js but to give a quick breakdown:

```
async function populateBreedsTable() {
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

populateBreedsTable();
```

This function creates a list called breedList. Then from the dog.ceo/api/breeds/list/all, inserts the name from the returned json into a name column, and the **value** into a value column. **BOTH THESE COLUMNS MUST BE IN SUPABASE**. The value column, when returned from the /breed GET call is stored in script.js to make a call to the dog.ceo api to properly return images of the user's desired breed. 

To recap:
1. Run the commented out populateBreedsTable() function in server.js ONCE via 

```
npm start
```

2. COMMENT OUT THE populateBreedsTable() function. Double check with supabase to ensure your table contains 100 rows of dog breeds with corresponding values. 

3. The dropdown menu on custompicker.html should be populated with 100 dog breeds now, and the image fetch should work properly as well. 


### POST and GET /userBreeds

Another supabase table called userBreeds must be created (again, names can be changed just be sure to update all instances of this call). This table will be where fetched dog breeds will be returned. This table **WILL STORE ALL BREEDS PEOPLE HAVE VIEWED ON customerpicker.html**. The following code:

```
chosenBreed;
        await fetch('/userBreeds', {
          method: 'POST',
            headers: {
    'Content-Type': 'application/json'
  },
          body: JSON.stringify({
              breed: `${chosenBreed}`
          })
        })
        loadUserBreeds();
```

At the bottom of getdaDogs() function in script.js sends the post request to the API /userbreeds. This means that /userBreeds must be defined in server.js, which is done so by the following:

```
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
```

Following this, a get for the API endpoint /userBreeds is also defined

```
app.get('/userBreeds', async (req, res) => {
    console.log("attempting to get da user dawgs")

    let { data, error } = await supabase
    .from('userBreeds')
    .select('*')

    res.send(data)
})
```

Calling this will return the breeds users have been calling in correspondance with the previous snippets of code. 

When a user calls the getdaDogs function by running the image fetcher, loadUserBreeds() is subsequently caleld creating a table by fetching the data from /userBreeds and displaying it in a table on custompicker.html

```
async function loadUserBreeds() {
  ourDiv.style.visibility = 'visible'
  await fetch('/userBreeds')
  .then((result => result.json()))
  .then((resultJson) => {
    
    const table = document.createElement('table');
    table.setAttribute('id', 'userBreeds');

    const tableRow = document.createElement('tr');

    const tableHeadBreed = document.createElement('th');
    tableHeadBreed.innerHTML = 'Breed Requested';
    //tableRow.appendChild(tableHeadDate);
    tableRow.appendChild(tableHeadBreed);
    //console.log(tableHeadDate.innerHTML)

    
    const tableHeadDate = document.createElement('th');
    tableHeadDate.innerHTML = 'Date logged';
    //tableRow.appendChild(tableHeadBreed);
    tableRow.appendChild(tableHeadDate);
    console.log(ourDiv);
    table.appendChild(tableRow)

    //ourDiv.appendChild(table);
    console.log(resultJson);
    resultJson.forEach((fetchedBreed) => {
      const tableDataRow = document.createElement('tr')
      const tableDateLoggedData = document.createElement('td')
      const tableBreedData = document.createElement('td')
      

      tableBreedData.innerHTML = fetchedBreed.breeds;
      tableDateLoggedData.innerHTML = fetchedBreed.created_at;

      tableDataRow.appendChild(tableBreedData);
      tableDataRow.appendChild(tableDateLoggedData);

      table.appendChild(tableDataRow)
    })
    let preExistingTable = document.getElementById('userBreeds')
    if (preExistingTable) {
      preExistingTable.remove();
    }

    ourDiv.appendChild(table);
  });
}
```
That's it for the API endpoints. Properly setting up supabase is crucial to get the server running. Once all these steps are complete, restarting the server by CTRL + C and then

# Running the Application

Once all these steps are complete, restarting the server by CTRL + C and then

```
npm start
```

In the terminal should result in a fully functioning web application. 

# Known Bugs
No major bugs have been noted as of yet. The only issues encountered have been API's loading a bit late or needing the page needing the occasional refresh. 

# Future RoadMap
1. Add Cats/Different section like custompicer.html but specifically for Cat pictures and breeds. This would mean authoring API endpoints and creation of new supabase tables.
2. Potentially implementing Petfinder API
3. Polishing CSS of the website, potentially utilizing AOS more. 