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
  
  if (fileSelected == true) {
    const uploadedImage = document.getElementById("current-displayed-image");
    if (uploadedImage) {
      const width = uploadedImage.width;
      const height = uploadedImage.height;

      const widthDivisor = Math.floor(width / 10);
      const heightDivisor = Math.floor(height / 3);

      const canvas = document.getElementById("conversionArea");
      const ctx = canvas.getContext("2d");


      let imgRange = width / widthDivisor;
      // get the individual pixel spots in the image that I need to loop
      // through an array of it's cordinates
      // to get the sample pieces. I need 30 of them.
      

      // I decided to get rid of the For loop since the amount of swatches will never change,
      // so that I can just be very constant O(1)? with this.

      const column1SourceX = 0; 
      const column2SourceX = widthDivisor;
      const column3SourceX = widthDivisor * 2;
      const column4SourceX = widthDivisor * 3;
      const column5SourceX = widthDivisor * 4;
      const column6SourceX = widthDivisor * 5;
      const column7SourceX = widthDivisor * 6;
      const column8SourceX = widthDivisor * 7;
      const column9SourceX = widthDivisor * 8;
      const column10SourceX = widthDivisor * 9;

      const row1SourceY = 0;
      const row2SourceY = heightDivisor;
      const row3SourceY = heightDivisor * 2;

    }
  }
}
