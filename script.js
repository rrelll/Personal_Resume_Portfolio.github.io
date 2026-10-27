/* MOBILE NAVIGATION */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link, .nav-cta");

function isMobile() {
    return window.matchMedia("(max-width: 680px)").matches;
}

function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    navLinks.hidden = isMobile();
}

if (menuToggle && navLinks) {
    closeMenu();

    menuToggle.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!expanded));
        menuToggle.setAttribute("aria-label", expanded ? "Open menu" : "Close menu");
        navLinks.hidden = expanded;
    });

    navItems.forEach(link => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", closeMenu);
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
        const role = roles[roleIndex];

        characterIndex += deleting ? -1 : 1;
        roleText.textContent = role.slice(0, characterIndex);

        let delay = deleting ? 35 : 65;

        if (!deleting && characterIndex === role.length) {
            deleting = true;
            delay = 1500;
        } else if (deleting && characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
        }

        setTimeout(animateRole, delay);
    }

    setTimeout(() => {
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
    if (!profileImage || !photoPlaceholder) return;

    profileImage.hidden = false;
    photoPlaceholder.hidden = true;
}

if (profileImage && photoPlaceholder) {
    profileImage.addEventListener("load", showProfileImage);
    profileImage.addEventListener("error", showPlaceholder);

    if (profileImage.complete) {
        profileImage.naturalWidth > 0
            ? showProfileImage()
            : showPlaceholder();
    }
}


/* SCROLL PROGRESS */

const progressBar = document.querySelector(".scroll-progress");

function updateScrollProgress() {
    if (!progressBar) return;

    const height = document.documentElement.scrollHeight - window.innerHeight;

    progressBar.style.width = height > 0
        ? `${Math.min((window.scrollY / height) * 100, 100)}%`
        : "0%";
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();


/* ACTIVE NAVIGATION LINK */

const sections = document.querySelectorAll("main section[id]");
const sectionLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            sectionLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });
        });
    }, {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
    });

    sections.forEach(section => sectionObserver.observe(section));
}


/* AUTOMATIC FOOTER YEAR */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* PHOTO LIGHTBOX */

const clickablePhotos = document.querySelectorAll(".clickable-photo");
const lightbox = document.getElementById("photo-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.classList.remove("active");
    lightboxImage.src = "";
    document.body.style.overflow = "";
}

if (lightbox && lightboxImage) {
    clickablePhotos.forEach(photo => {
        photo.addEventListener("click", () => {
            lightboxImage.src = photo.src;
            lightboxImage.alt = photo.alt;
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    lightboxClose?.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeLightbox();
    });
}


/* PAGE LOAD ANIMATION */

document.documentElement.classList.add("js-enabled");
document.body.classList.add("page-loaded");


/* CYBERPUNK BOOT INTRO */

const bootScreen = document.getElementById("boot-screen");

if (bootScreen) {
    document.documentElement.classList.add("boot-active");

    setTimeout(() => {
        bootScreen.classList.add("boot-exit");

        setTimeout(() => {
            document.documentElement.classList.remove("boot-active");
            bootScreen.classList.remove("boot-exit");
        }, reducedMotion ? 0 : 350);

    }, reducedMotion ? 100 : 1800);
}
