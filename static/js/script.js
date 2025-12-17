// Function to generate random color
function getRandomColor() {
    const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6AD5"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to animate any element
function animateTitle(el) {
    const textArray = [...el.textContent];
    el.textContent = "";

    textArray.forEach((char, index) => {
        const span = document.createElement("span");
        span.className = "anime-element";
        span.style.animationDelay = 0.3 + index / 10 + "s";

        if (char === " ") {
            span.innerHTML = "&nbsp;";
        } else {
            span.innerText = char;
            span.style.color = getRandomColor();
            span.style.textShadow = "2px 2px 5px rgba(0,0,0,0.5)";
        }

        el.appendChild(span);
    });

    // Trigger animation
    const letters = el.querySelectorAll(".anime-element");
    letters.forEach(letter => {
        letter.classList.remove("start-animation");
        void letter.offsetWidth; // restart animation
        letter.classList.add("start-animation");
    });
}

// Select all elements with class "moving-title"
const titles = document.querySelectorAll(".moving-title");

// Run animation for each title
titles.forEach(el => animateTitle(el));

// Loop every 7 seconds
setInterval(() => {
    titles.forEach(el => animateTitle(el));
}, 7000);

// Fuction to make headers animated
const headers = document.querySelectorAll(".moving-header");
headers.forEach(header => {
    function animateHeader() {
        // Reset immediately to off-screen left without transition
        header.style.transition = "none";
        header.style.transform = "translateX(-100%)";
        header.style.opacity = "0";

        // Force reflow to apply the reset
        void header.offsetWidth;

        // Slide in
        header.style.transition = "transform 6s ease, opacity 6s ease";
        header.style.transform = "translateX(0)";
        header.style.opacity = "1";

        // Stay 5 seconds, then slide out to right
        setTimeout(() => {
            header.style.transition = "transform 6s ease, opacity 6s ease";
            header.style.transform = "translateX(100%)";
            header.style.opacity = "0";
        }, 9000);
    }

    // Initial run
    animateHeader();

    // Repeat every 9 seconds
    setInterval(animateHeader, 12000);
});

const gallerySection = document.querySelector(".student-gallery");

const viewport = gallerySection.querySelector(".gallery-viewport");
const gallery = gallerySection.querySelector(".gallery");
const prevBtn = gallerySection.querySelector(".prev");
const nextBtn = gallerySection.querySelector(".next");

const img = gallery.querySelector("img");
const gap = 16;

function scrollAmount() {
    return img.offsetWidth + gap;
}

prevBtn.addEventListener("click", () => {
    viewport.scrollBy({
        left: -scrollAmount(),
        behavior: "smooth",
    });
});

nextBtn.addEventListener("click", () => {
    const maxScroll = gallery.scrollWidth - viewport.clientWidth;
    let target = viewport.scrollLeft + scrollAmount();

    if (target > maxScroll) target = maxScroll;

    viewport.scrollTo({
        left: target,
        behavior: "smooth",
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.photo-carousel');
    const nextBtn = document.querySelector('.carousel-next');
    const prevBtn = document.querySelector('.carousel-prev');

    if (!carousel || !nextBtn || !prevBtn) return;

    const getSlideWidth = () => {
        const firstSlide = carousel.querySelector('.carousel-item');
        return firstSlide ? firstSlide.offsetWidth : 0;
    };

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: getSlideWidth(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -getSlideWidth(), behavior: 'smooth' });
    });
});