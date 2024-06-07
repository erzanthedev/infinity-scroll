// Delcaring DOM Variables
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let initialLoad = true;

const apiKey = `NcUPBR07LaF8fxdF86MoZZOkKFs_9og_cy7fi8zNH1I`;
let initialCount = 5;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

// To update apiUrl with newCount after intialCount have been loaded
function updateApiCount(newCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${newCount}`;
}

// check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true; // hides loader when images are fully loaded
    count = 30;
  }
}

// Helper Function to set attributes
function setAttribute(element, attributes) {
  for (const property in attributes) {
    element.setAttribute(property, attributes[property]);
  }
}

// Function to Display Photos
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
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

    // Event Listner to check when each photo is finished loading
    imgElement.addEventListener("load", imageLoaded);

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
    if (initialLoad) {
      updateApiCount(30);
      initialLoad = false;
    }
  } catch (error) {
    // Handle error
    console.log(`Ooops Something went wrong: ${error}`);
  }
}

// Event Listener, load more photos when scrolled near bottom
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
