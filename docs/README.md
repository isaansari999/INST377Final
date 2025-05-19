# Dog Breed Picker - Discovering Dog Breeds

## Created by Isa Ansari

## Project Description

Dog Breed Picker is a full functioning web application with front and back-end setup. Users can browse, learn about, and enjoy pictures of various dog breeds through the interface. Designed for leisurely dog viewers, or any other dog "enthusiasts" that may need pictures of various breeds for any reason, the site utilizes real-time APIs and a custom database to display and track user-selected breeds. 

The website's intended browser is primarily for desktop. Whether it be Firefox, Google Chrome, or any other desktop browser of choice. 

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
Before running the application server, the API endpoints in server.js must be functional. To accomplish this, two supabase tables must be created following the addition of your .env file. 

```
GET /breed
```
Fetches all dog breeds from Supabase **breeds** table. The spelling is important.
Notice: You must utilize the dog CEO api to remotely populate the database first