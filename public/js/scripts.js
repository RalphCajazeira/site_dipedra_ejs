document.addEventListener("DOMContentLoaded", () => {
  // Slider functionality
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("visible");
      if (i === index) {
        slide.classList.add("visible");
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  setInterval(nextSlide, 6000); // Change slide every 6 seconds
});
