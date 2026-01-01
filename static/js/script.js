console.log("script.js loaded");
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


document.addEventListener("DOMContentLoaded", () => {
    // Typing effect for headers
    const headers = document.querySelectorAll(".moving-header");

    headers.forEach(header => {
        const text = header.textContent.trim();
        let isTyping = false;

        function animateHeader() {
            if (isTyping) return;
            isTyping = true;

            header.textContent = "";
            header.style.opacity = "1";

            let i = 0;

            function type() {
                if (i < text.length) {
                    header.textContent += text[i];
                    i++;
                    setTimeout(type, 90);
                } else {
                    isTyping = false;
                }
            }

            type();
        }

        animateHeader();

        // repeat every 10 seconds (change if needed)
        setInterval(animateHeader, 10000);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector(".class-carousel");
    if (!root) return;

    const track = root.querySelector(".cc-track");
    const slides = Array.from(root.querySelectorAll(".cc-slide"));
    const prev = root.querySelector(".cc-prev");
    const next = root.querySelector(".cc-next");

    if (!track || slides.length === 0 || !prev || !next) return;

    let index = 0;

    function slideWidth() {
        const slide = slides[0];
        const gap = parseInt(getComputedStyle(track).gap || "0", 10);
        return slide.getBoundingClientRect().width + gap;
    }

    function maxIndex() {
        const viewport = root.querySelector(".cc-viewport");
        const visible = Math.max(1, Math.floor(viewport.clientWidth / slideWidth()));
        return Math.max(0, slides.length - visible);
    }

    function update() {
        const w = slideWidth();
        const max = maxIndex();

        if (index < 0) index = 0;
        if (index > max) index = max;

        track.style.transform = `translateX(${-index * w}px)`;

        prev.disabled = index === 0;
        next.disabled = index === max;
    }

    prev.addEventListener("click", () => {
        index -= 1;
        update();
    });

    next.addEventListener("click", () => {
        index += 1;
        update();
    });

    // Keyboard support
    root.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") prev.click();
        if (e.key === "ArrowRight") next.click();
    });
    root.tabIndex = 0;

    // Swipe support (mobile)
    let startX = null;
    root.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    root.addEventListener("touchend", (e) => {
        if (startX === null) return;
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;

        if (Math.abs(diff) > 40) {
            if (diff > 0) prev.click();
            else next.click();
        }
        startX = null;
    });

    window.addEventListener("resize", update);

    // Initial
    update();
});


document.addEventListener("DOMContentLoaded", () => {
    // Showing images in the gallery page carousel 1 by 1
    const carousel = document.querySelector(".photo-carousel");
    if (!carousel) return;

    const items = Array.from(carousel.querySelectorAll(".carousel-item"));
    const prevBtn = document.querySelector(".carousel-prev");
    const nextBtn = document.querySelector(".carousel-next");

    if (!items.length || !prevBtn || !nextBtn) return;

    let index = items.findIndex(el => el.classList.contains("active"));
    if (index === -1) index = 0;

    function show(i) {
        items.forEach(el => el.classList.remove("active"));
        items[i].classList.add("active");
    }

    show(index);

    nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        index = (index + 1) % items.length;
        show(index);
    });

    prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        index = (index - 1 + items.length) % items.length;
        show(index);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Showing content by class
    const buttons = document.querySelectorAll(".class-btn");
    const blocks = document.querySelectorAll(".class-content");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedClass = button.dataset.class;

            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            blocks.forEach(block => block.classList.remove("active"));

            const target = document.querySelector(
                `.class-content[data-class-content="${selectedClass}"]`
            );
            if (target) {
                target.classList.add("active");
            }
        });
    });
});