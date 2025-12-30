// The actual web app
const inputFile = document.getElementById("fileInput");
const preview = document.getElementById("uploaded-image-display");
let fileSelected = false;
let image = new Image();
let selectedImage = "";
let colorsArray = [];
const paletteCanvas = document.createElement("canvas");


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
    // Reset colors array for each new upload
    colorsArray = [];
    canvas.width = conversionImage.width;
    canvas.height = conversionImage.height;
    context.drawImage(conversionImage, 0, 0, conversionImage.width, conversionImage.height);
    const imageData = context.getImageData(0, 0, conversionImage.width, conversionImage.height);
    const imageDataRGB = imageData.data;

    // Get the jump increments (ensure min step of 1 to avoid zero-step loops)
    const jumpX = Math.max(1, Math.floor(canvas.width / 10));
    const jumpY = Math.max(1, Math.floor(canvas.height / 3));

    for (let y = 0; y < canvas.height; y += jumpY) {
      for (let x = 0; x < canvas.width; x += jumpX) {
        const index = (y * canvas.width + x) * 4; // Jump in L's like a chess knight through this array,
                                                  // Each 4 numbers, is a new color
        // Make sure we don't read out of bounds
        if (index + 2 >= imageData.length) {
          console.warn('Pixel index out of bounds, skipping:', index);
          continue;
        }

        const r = imageData[index];
        const g = imageData[index + 1];
        const b = imageData[index + 2];

        if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
          console.warn('Invalid pixel data, skipping:', r, g, b);
          continue;
        }

        // convert to HEX codes, and save them to an array
        const hexColor = rgbToHex(r, g, b);
        console.log('Sampled color:', hexColor);
        if (/^#[0-9a-f]{6}$/i.test(hexColor)) {
          colorsArray.push(hexColor);
        } else {
          console.warn('Invalid hex color, skipping:', hexColor);
        }
      }
    }

    // Create the palette image and draw the colors to it.
    
    // Choose swatch width for visibility
    const swatchWidth = 10; // pixels per swatch
    paletteCanvas.width = Math.max(1, colorsArray.length * swatchWidth);
    paletteCanvas.height = 50;
    
    const ctx = paletteCanvas.getContext("2d");
    // Clear canvas and paint a white background to avoid default black when invalid fills occur
    ctx.clearRect(0, 0, paletteCanvas.width, paletteCanvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, paletteCanvas.width, paletteCanvas.height);
    
    if (colorsArray.length === 0) {
      console.warn('No colors were sampled — palette will be empty.');
    }
    
    let swatchPosition = 0;

    // Time to paint the colors!
    for (const color of colorsArray) {
      ctx.fillStyle = color;
      ctx.fillRect(swatchPosition * swatchWidth, 0, swatchWidth, paletteCanvas.height);
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
  const red = r.toString(16).padStart(2, '0');
  const green = g.toString(16).padStart(2, '0');
  const blue = b.toString(16).padStart(2, '0');

  return `#${red}${green}${blue}`;
}

// Download the "PALLETE" Canvas to image upon button click!
// (not the one that the image was drawn too) 

const downloadBtn = document.getElementById("download-palette-image-btn");
downloadBtn.addEventListener("click", function (e) {

  const canvasURL = paletteCanvas.toDataURL("image/png");

  const createEL = document.createElement("a");
  createEL.href = canvasURL;
  createEL.download = "converted-palette.png";

  createEL.click();
  createEL.remove();

})