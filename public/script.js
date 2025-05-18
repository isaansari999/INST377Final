
const parentContainer = document.getElementById("gliderContainer")

async function loadDogs() {
  console.log("Running")
  const slider = document.getElementById("glider")
  
  
  
  for (i=0;i<5;i++) {
    
    const res = await fetch("https://dog.ceo/api/breeds/image/random")
    const data = await res.json();
    slider.innerHTML += `<div><img src="${data.message}" class="dog-slide-img"></div>`;
  }
  

  new Glider(slider, {
        slidesToShow: 1,
        dots: '#dots',
        draggable: true,
        arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
        }
      });
      document.getElementById("glider").style.visibility = 'visible';
}






if (!window.location.href.includes("about.html") && !window.location.href.includes("custompicker.html")) {
  loadDogs();
}






async function breedsList() {
  /*const res = await fetch("https://dog.ceo/api/breeds/list/all")*/
  console.log("sopmething");
  const ignore = await fetch('/breed');
  const blob = await ignore.json();
  console.log(blob);
  
  /*const data = await res.json();*/
  //const breeds = data.message/*
  
  const dropdown = document.getElementById("breedSelect");

  for (i=0; i<blob.length; i++) {
    console.log(blob[i].name);
    console.log(blob[i].value);
    const option = document.createElement("option");
    option.value = blob[i].value;
    option.textContent = blob[i].name;
    dropdown.appendChild(option);
  }
}

let glider = null;
const infodiv = document.getElementById("dog-info")

async function getdaDogs() {

  /*const parentContainer = document.getElementById("gliderContainer")*/

  const entirediv = document.getElementById("anothaholda")
  const previousText = entirediv.querySelectorAll("p")
  previousText.forEach (p => p.remove());
  
  const dropdown = document.getElementById("breedSelect")
  const chosenBreed = dropdown.value
  console.log("Dis da breed: ", chosenBreed)
  console.log(typeof chosenBreed)

  const res = await fetch(`https://dog.ceo/api/breed/${chosenBreed}/images/random/5`)


  const data = await res.json()
  console.log(data)
  console.log("blawberton", data.message[1])  
  
  parentContainer.innerHTML = `
  <div id="glider">
                  
  </div>          
  <button aria-label="Previous" class="glider-prev">«</button>
  <button aria-label="Next" class="glider-next">»</button>
  <div role="tablist" id="dots"></div> 
  `
  console.log(parentContainer)
  const newholder = document.getElementById("glider")
 

  for (i=0;i<data.message.length;i++) {
      
      newholder.innerHTML += `<div><img src="${data.message[i]}" class="dog-slide-img"></div>`
  }

  console.log(parentContainer)
  console.log(document.querySelector('.glider-prev')); 
  console.log(document.querySelector('.glider-next')); 

  glider = new Glider(newholder, {
        slidesToShow: 1,
        dots: '#dots',
        draggable: true,
        arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
        }
      });
      document.getElementById("glider").style.visibility = 'visible';

      await window.supabase
        .from('userBreeds')
        .insert([{ breeds: chosenBreed }]);
        console.log("this working")

}



async function loadBreeds() {
    const breeds = document.getElementById("breed-buttons")
    const res = await fetch("https://dogapi.dog/api/v2/breeds")
    const data = await res.json();

    indexedBreeds = data.data;

    data.data.forEach(breed => {
      const btn = document.createElement("button");
      btn.className = "button-29";
      btn.textContent = breed.attributes.name;
      btn.onclick = () => breedsData(breed.attributes);
      console.log(breed.attributes);
      breeds.appendChild(btn);
    });
}

async function breedsData(breed) {
  console.log(breed.name)
  
  infodiv.innerHTML = '';
  infodiv.innerHTML = `
  <h2>${breed.name}</h2>
  <p>${breed.description}</p>
  <p><strong>Lifespan: </strong>${breed.life.min} - ${breed.life.max} years</p>
  
  <button class = "button-29" onclick=hidethis()>Hide this Section</button>`
  infodiv.style.visibility = `visible`;
  let dropdown = document.getElementById("breedSelect")
  let breedIdentifier = breed.name

  console.log(typeof breed.name)
  let officerballs = breed.name.toLowerCase();
  console.log(officerballs);
  
}

function hidethis() {
  infodiv.style.visibility= `hidden`;
}



if (window.location.href.includes("custompicker.html")) {
  breedsList();
  loadBreeds();
}



async function loadAkitas() {
  console.log("Running")
  const slider = document.getElementById("glider-akita")
  
  
  
  for (i=0;i<5;i++) {
    
    const res = await fetch("https://dog.ceo/api/breed/akita/images/random/5")
    const data = await res.json();
    console.log("Hello this should show 5 times");
    slider.innerHTML += `<div><img src="${data.message[i]}" class="dog-slide-img"></div>`;
  }
  

  new Glider(slider, {
        slidesToShow: 1,
        dots: '#dots',
        draggable: true,
        arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
        }
      });
      document.getElementById("glider-akita").style.visibility = 'visible';
      loadCars();
      AOS.init();
}

let catAPIKey = "live_Qs9yOpFbydm1PDT6ryPhg3SYxDgEjkVu5knvyfA8dbgyMiCEKsH2pvxLaw96Jgkl"

async function loadCars() {
  console.log("Running")
  const slider = document.getElementById("car-glider")

  let cats;

  const resp = await fetch(`https://api.thecatapi.com/v1/images/search?limit=5&breed_ids=ragd&api_key=${catAPIKey}`)
  const datas = await resp.json();

  for (i=0;i<5;i++) {
    console.log("cars being added")

    cats = datas[i];
    console.log(cats);
    slider.innerHTML += `<div><img src="${cats.url}" class="dog-slide-img"></div>`;
  }

  new Glider(slider, {
    slidesToShow: 1,
    dots: '.cat-dots',
    draggable: true,
    arrows: {
      prev: '.cat-glider-prev',
      next: '.cat-glider-next'
    }
  });
  document.getElementById("car-glider").style.visibility = 'visible';

}



if (window.location.href.includes("about.html")) {
  loadAkitas();
  
  AOS.init();
}



