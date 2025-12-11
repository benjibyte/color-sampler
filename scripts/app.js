// The actual web app
function uploadImage() {
    // allow the user to select an image from their computer and
    // display a smaller version of it on the HTML document as an img tag
    // with an ID of "uploaded-image"


}

function divideImage() {
    // take the new image tag with the id of "uploaded-image" and get it's
    // height, width, and a number it is divisible by.

    // Divide the image into little quadrants of color values from each quadrant (perhaps store in json?)
    
    // return an array of divided json objects containing the divided colors in number format (rgb or HEX color codes)
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