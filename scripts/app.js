// The actual web app
const inputFile = document.getElementById("fileInput");
const preview = document.getElementById("uploaded-image-display");
let fileSelected = false;
let image = new Image();
let selectedImage = "";

inputFile.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file && securityChecks(file)) {
    displayImage(file);
    fileSelected = true;
    swatchesArray = divideImage(file);
    colorsArray = []
    for (swatch in swatchesArray) {
      const colorRGB = getColors(swatch);
      colorsArray.add(colorRGB);
    }
    // now we create an image and draw the colors onto it


    const reader = new FileReader();
    reader.onload = (e) => {
      image.src = e.target.result;
      selectedImage = image;
    };
    reader.readAsDataURL(file);
  }
  
  
});

// The image on CanvasJS to divide | Divide button to prepare for color selection



// Get the same image that is displayed to the User


function securityChecks(file) {
  
  // Ensure file exists and perform security checks.
  if (file) { 
    console.log("File Detected. Checking Format...");

    if (file.type.startsWith("image/png")) { // image format needs to be .png
      console.log("File meets file format requirements. Checking Size...");

      const fileSizeMB = file.size / (1024 * 1024); // size in MB
      if (fileSizeMB <= 200) {
        console.log("File Size meets requirements.");

        // Put further Security Checks here in the future...

        console.log("All Checks passed! Returning File...")
        return file;

      } else {
        console.log("File size is too big!");
        alert("Uploaded File size exceeds the file size limits! Reload the app and try again.");
        return NaN;
      }
    }

  } else {
    console.log("Selected File is not readable to the app.");
    return NaN;
  }
}
function displayImage(file) {
  // allow the user to select an image from their computer and
  // display a smaller version of it on the HTML document as an img tag
  // with an ID of "uploaded-image"
  const displayImage = document.createElement("img");
  displayImage.classList.add("obj");
  displayImage.id = "current-displayed-image";
  preview.innerHTML = "" // Clear old images
  preview.appendChild(displayImage);

  const reader = new FileReader();
  reader.onload = (e) => {
    displayImage.src = e.target.result;
    window.uploadedImage = displayImage;
  };
  reader.readAsDataURL(file);
}
function divideImage() {
  // take the new image tag with the id of "uploaded-image" and get it's
  // height, width, and a number it is divisible by.
  // Divide the image into little quadrants of color values from each quadrant (perhaps store in json?)
  // return an array of divided json objects containing the divided colors in number format (rgb or HEX color codes)
  swatchesArray = [];
  


  if (fileSelected == true) {
    const uploadedImage = document.getElementById("current-displayed-image");
    if (uploadedImage) {
      const width = uploadedImage.width;
      const height = uploadedImage.height;

      const widthDivisor = Math.floor(width / 10);
      const heightDivisor = Math.floor(height / 3);

      // For loop run 30 times, and get 30 average colors from 30 sample crops of the uploadedImage
      const rows = [0, 1, 2];
      const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (rowIndex in rows) {
        for (colIndex in cols) {
          // Get the current position of the crop
          const Xmultiplier = (colIndex < 9) ? (colIndex + 1) : colIndex;
          const Ymultiplier = (rowIndex < 3) ? (rowIndex + 1) : rowIndex;

          const imageAnchorX = widthDivisor * Xmultiplier; // widthDivisor * 2...3...4 and so on.
          const imageAnchorY = heightDivisor * Ymultiplier;

           swatch = createImageBitmap(uploadedImage, imageAnchorX, imageAnchorY, widthDivisor, heightDivisor);
           swatchesArray.add(swatch);
        }
      }

  }

  return swatchesArray;

}
function getColors() {
  // Take the array of divided json colors, and get the average color of each quadrant.
  // If there are 2 or more colors within a certain range of similarness, then either merge or delete the new one
  // Then create a new img tag and draw
  // each color in little boxes next to each other on the new tag until all the average colors have been taken.
  // return state: place a new image tag that the User can see, containing all the average colors. This is the pallet to download.
  // .... Also, turn the download button's CSS bright blue and enable the button to be clicked.
}
function downloadPalete() {
  // Get the new pallete img tag and download it to the computer with the Download palete button is clicked. as a .jpg file.
  // Send an Alert() that it was a succesful download!
}

}
function getColors(file) {
  const colorThief = new ColorThief();
  const dominantRGBcolor = colorThief.getColor(file);
  return dominantRGBcolor;
}
