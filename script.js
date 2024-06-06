// Delcaring DOM Variables
const imageContainer = document.getElementById("image-container");
const apiKey = `NcUPBR07LaF8fxdF86MoZZOkKFs_9og_cy7fi8zNH1I`;
const count = 30;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
let photosArray = [];

// Helper Function to set attributes
function setAttribute(element, attributes) {
  for (const property in attributes) {
    element.setAttribute(property, attributes[property]);
  }
}

// Function to Display Photos
const displayPhotos = () => {
  // Loop through photosArray
  photosArray.forEach((photo) => {
    // Create an "a" element and set attributes
    const anchorElement = document.createElement("a");
    // Creates Attributes
    setAttribute(anchorElement, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create an "img" element and set attributes
    const imgElement = document.createElement("img");
    // Creates Attributes
    setAttribute(imgElement, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Append elements to image container
    anchorElement.appendChild(imgElement); // Adds "img" to 'a' tag
    imageContainer.appendChild(anchorElement); // Adds "a" to 'imageContainer'
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
