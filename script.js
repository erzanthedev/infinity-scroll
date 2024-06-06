// Delcaring DOM Variables
const imageContainer = document.getElementById("image-container");
const apiKey = `NcUPBR07LaF8fxdF86MoZZOkKFs_9og_cy7fi8zNH1I`;
const count = 10;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
let photosArray = [];

// Function to Display Photos
const displayPhotos = () => {
  // Loop through photosArray
  photosArray.forEach((photo) => {
    // Create an "a" element and set attributes
    const anchorElement = document.createElement("a");
    anchorElement.setAttribute("href", photo.links.html);
    anchorElement.setAttribute("target", "_blank");

    // Create an "img" element and set attributes
    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", photo.urls.regular);
    imgElement.setAttribute("alt", photo.alt_description);
    imgElement.setAttribute("title", photo.alt_description);

    // Append elements to image container
    anchorElement.appendChild(imgElement); // Adds "img" to 'a' tag
    imageContainer.appendChild(anchorElement); // Adds "a" to 'imageContainer'
    console.log(imageContainer);
  });
};
// Function to Get Photos
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Handle error
    console.log(`Ooops Something went wrong: ${error}`);
  }
}

// On Load
getPhotos();
