// JavaScript for interactivity and features

// Dark/Light mode toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Slideshow functionality
let slideIndex = 0;
const slides = document.querySelectorAll(".slideshow img");
showSlide(slideIndex);

function showSlide(index) {
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;
    slides.forEach(slide => slide.classList.remove("active"));
    slides[slideIndex].classList.add("active");
}

function moveSlide(step) {
    showSlide(slideIndex += step);
}

// Scroll Animations
document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        if (isElementInView(section)) {
            section.classList.add("visible");
        }
    });
});

// Check if element is in view
function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

// Handle the form submission for posts
document.getElementById("submit-post-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form from reloading the page

    // Get input values
    const postText = document.getElementById("post-text").value;
    const mediaType = document.getElementById("media-type").value;
    const fileInput = document.getElementById("post-image-upload");
    let postImage = "";

    // Handle file input for images
    if (fileInput.files.length > 0 && mediaType === "image") {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            postImage = e.target.result;
            createPost(postText, mediaType, postImage);
        };
        reader.readAsDataURL(file);  // Read file as base64 URL
    } else {
        createPost(postText, mediaType, postImage);
    }

    // Clear the form inputs after submission
    document.getElementById("post-text").value = "";
    document.getElementById("post-image-upload").value = "";
    document.getElementById("media-type").value = "text";
});

// Create a new post dynamically
function createPost(postText, mediaType, postImage) {
    const newPost = document.createElement("div");
    newPost.classList.add("forum-post");

    let postContent = `<p>Type: ${mediaType}</p>`;
    
    if (mediaType === "text" && postText) {
        postContent += `<p>${postText}</p>`;
    } else if (mediaType === "image" && postImage) {
        postContent += `<img src="${postImage}" alt="User Submitted Image" style="max-width: 200px;">`;
    } else if (mediaType === "video" && postText) {
        postContent += `<video width="320" height="240" controls><source src="${postText}" type="video/mp4"></video>`;
    } else {
        postContent += "<p>No content provided.</p>";
    }

    newPost.innerHTML = postContent;
    document.getElementById("post-display").appendChild(newPost);
}
