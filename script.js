const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;


//Unsplash API
let count = 5;
const apiKey = 'iG2Bgeh3EwgNmUQYVoIm-4JnNy0N5YCrjRGVpuXyEKQ';
let apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}`;
    }
}
//hepler function to set attributes on Dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
// Create Elements for Links & Photos, Add to Dom

function displayphotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages)
        //Run function for each object in photoArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
                href: photo.links.html,
                target: '_blank',
            })
            //create image for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
                src: photo.urls.regular,
                alt: photo.alt_description,
                title: photo.alt_description,
            })
            // Event listener,check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //put <img> inside <a>, then put them both inside photocontainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayphotos()
    } catch (error) {
        // Catch error here
    }
}
// Check to see if scrolling near bottom of page, load more pictures.
window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
            ready = false;
            getPhotos();

        }
    })
    //
getPhotos()