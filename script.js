
/* MOBILE NAVIGATION */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link, .nav-cta");

function isMobile() {
    return window.matchMedia("(max-width: 680px)").matches;
}

function updateMenuLayout() {
    if (!menuToggle || !navLinks) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    navLinks.hidden = isMobile();
}

function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    navLinks.hidden = isMobile();
}

if (menuToggle && navLinks) {
    updateMenuLayout();

    menuToggle.addEventListener("click", () => {
        const expanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!expanded));
        menuToggle.setAttribute(
            "aria-label",
            expanded ? "Open menu" : "Close menu"
        );

        navLinks.hidden = expanded;
    });

    navItems.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", updateMenuLayout);
}

/* ANIMATED INTERESTS */

const roleText = document.getElementById("role-text");

const roles = [
    "Computer Networking",
    "IT Systems & Support",
    "IoT Technologies",
    "Technical Problem Solving",
    "Photography"
];

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (roleText && !reducedMotion) {
    let roleIndex = 0;
    let characterIndex = roles[0].length;
    let deleting = false;

    function animateRole() {
        const currentRole = roles[roleIndex];

        characterIndex += deleting ? -1 : 1;
        roleText.textContent = currentRole.slice(0, characterIndex);

        let delay = deleting ? 35 : 65;

        if (!deleting && characterIndex === currentRole.length) {
            deleting = true;
            delay = 1500;
        } else if (deleting && characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
        }

        window.setTimeout(animateRole, delay);
    }

    window.setTimeout(() => {
        deleting = true;
        animateRole();
    }, 1800);
}

/* PROFILE PHOTO FALLBACK */

const profileImage = document.getElementById("profile-image");
const photoPlaceholder = document.getElementById("photo-placeholder");

function showPlaceholder() {
    if (profileImage) profileImage.hidden = true;
    if (photoPlaceholder) photoPlaceholder.hidden = false;
}

function showProfileImage() {
    if (profileImage && photoPlaceholder) {
        profileImage.hidden = false;
        photoPlaceholder.hidden = true;
    }
}

if (profileImage && photoPlaceholder) {
    profileImage.addEventListener("load", showProfileImage);
    profileImage.addEventListener("error", showPlaceholder);

    if (profileImage.complete) {
        if (profileImage.naturalWidth > 0) {
            showProfileImage();
        } else {
            showPlaceholder();
        }
    }
}

/* SCROLL PROGRESS */

const progressBar = document.querySelector(".scroll-progress");

function updateScrollProgress() {
    if (!progressBar) return;

    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    if (scrollableHeight <= 0) {
        progressBar.style.width = "0%";
        return;
    }

    const progress = (window.scrollY / scrollableHeight) * 100;

    progressBar.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener("scroll", updateScrollProgress, {
    passive: true
});

window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

/* ACTIVE NAVIGATION LINK */

const sections = document.querySelectorAll("main section[id]");
const sectionLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                sectionLinks.forEach((link) => {
                    const active =
                        link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    link.classList.toggle("active", active);
                });
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

/* AUTOMATIC FOOTER YEAR */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
