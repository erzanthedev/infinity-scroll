const apiKey = `NcUPBR07LaF8fxdF86MoZZOkKFs_9og_cy7fi8zNH1I`;
const count = 10;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Function to Get Photos
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // Handle error
    console.log(`Ooops Something went wrong: ${error}`);
  }
}

// On Load
getPhotos();
