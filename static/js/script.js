const title = document.getElementById("title");
const arrayOfTitle = [...title.textContent];
title.textContent = "";

// Function to generate random color
function getRandomColor() {
    const colors = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF6AD5"];
    return colors[Math.floor(Math.random() * colors.length)];
}

arrayOfTitle.forEach((char, index) => {
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

    title.appendChild(span);
});

// Intersection Observer for title
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const letters = entry.target.querySelectorAll(".anime-element");
            letters.forEach(letter => {
                letter.classList.add("start-animation");
            });
            titleObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

titleObserver.observe(title);


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
        header.style.transition = "transform 2s ease, opacity 2s ease";
        header.style.transform = "translateX(0)";
        header.style.opacity = "1";

        // Stay 5 seconds, then slide out to right
        setTimeout(() => {
            header.style.transition = "transform 2s ease, opacity 2s ease";
            header.style.transform = "translateX(100%)";
            header.style.opacity = "0";
        }, 5000);
    }

    // Initial run
    animateHeader();

    // Repeat every 9 seconds
    setInterval(animateHeader, 7000);
});