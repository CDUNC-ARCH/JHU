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

    // Get text and image URL input
    const postText = document.getElementById("post-text").value;
    const postImage = document.getElementById("post-image").value;

    // Create a new div for the post
    const newPost = document.createElement("div");
    newPost.classList.add("forum-post");

    // Add text content
    const postContent = document.createElement("p");
    postContent.innerText = postText || "No text provided."; // Default message if no text

    // If there's an image URL, add it to the post
    if (postImage) {
        const postImageElement = document.createElement("img");
        postImageElement.src = postImage;
        postImageElement.alt = "User Submitted Image";
        postImageElement.style.maxWidth = "200px";  // Limit image size
        postContent.appendChild(postImageElement);
    }

    // Add the post content to the post container
    newPost.appendChild(postContent);

    // Append the new post to the display area
    document.getElementById("post-display").appendChild(newPost);

    // Clear the form inputs after submission
    document.getElementById("post-text").value = "";
    document.getElementById("post-image").value = "";
});
