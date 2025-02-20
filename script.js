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
