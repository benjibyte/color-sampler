// Some dynamic styling
document.getElementById("fileInput").addEventListener('change', function() {
    const label = document.getElementById("fileLabel");
    label.textContent = this.files.length ? this.files[0].name : "No File Chosen";

});

