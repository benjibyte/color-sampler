// The actual web app
const inputFile = document.getElementById("fileInput");
const preview = document.getElementById("uploaded-image-display");
let fileSelected = false;
let image = new Image();
let selectedImage = "";
let colorsArray = [];



inputFile.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file && securityChecks(file)) {
    displayImage(file); // Display the image
    fileSelected = true;
    const reader = new FileReader();
    reader.onload = (e) => {
      image.src = e.target.result;
      selectedImage = image;
    };
    reader.readAsDataURL(file);
  
  // Import uploaded image into Canvas as conversionImage, and get the colors
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const conversionImage = document.getElementById("current-displayed-image");

  conversionImage.onload = () => {
    canvas.width = conversionImage.width;
    canvas.height = conversionImage.height;
    context.drawImage(conversionImage, 0, 0, conversionImage.width, conversionImage.height);
    const imageData = context.getImageData(0, 0);
    const imageDataRGB = imageData.data;

    // Get the jump increments
    const jumpX = Math.floor(canvas.width / 10);
    const jumpY = Math.floor(canvas.height / 3);

    for (let y = 0; y < canvas.height; y += jumpY) {
      for (let x = 0; x < canvas.width; x += jumpX) {
        const index = (y * canvas.width + x) * 4; // Jump in L's like a chess knight through this array,
                                                  // Each 4 numbers, is a new color
        const r = imageData[index];
        const g = imageData[index + 1];
        const b = imageData[index + 2];

        // convert to HEX codes, and save them to an array
        const hexColor = rgbToHex(r, g, b);
        colorsArray.push(hexColor);
      }
    }

    // Create the pallete image and draw the colors to it.
    const palleteCanvas = document.createElement("canvas");
    const ctx = palleteCanvas.getContext("2d");
    
    let swatchPosition = 0;

    // Time to paint the colors!
    for (const color in colorsArray) {
      ctx.fillStyle = color;
      ctx.fillRect(swatchPosition, 0, 1, 1);
      swatchPosition++;
    }


  }; // All code within Security Checks
  }}); // end of code that is called and ran in client side browser.

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

function rgbToHex(r, g, b) {
  const r = r.toString(16).padStart(2, '0');
  const g = g.toString(16).padStart(2, '0');
  const b = b.toString(16).padStart(2, '0');

  return '#${red}${green}${blue}';
}

// Download the Canvas to image upon button click!
