document.addEventListener("DOMContentLoaded", function () {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll(".slideshow-container .slide");
    const totalSlides = slides.length;

    // Function to show a specific slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
            slide.style.animation = i === index ? "fade 1s ease-in-out" : "";
        });
    }

    // Initial display
    showSlide(currentSlideIndex);

    // Next slide function
    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        showSlide(currentSlideIndex);
    }

    // Previous slide function
    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentSlideIndex);
    }

    // Event listeners for controls
    document.getElementById("nextSlide").addEventListener("click", nextSlide);
    document.getElementById("prevSlide").addEventListener("click", prevSlide);

    // Auto slideshow every 5 seconds
    setInterval(nextSlide, 5000);
});
