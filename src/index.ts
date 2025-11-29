import { revealFlip } from "./modules/scroll.js";
import { openModal } from "./modules/modal.js";
import { injectStyles } from "./modules/style.js";

// Інжект стилів
injectStyles();

// ----- Клік по фоткам -----
const images = document.querySelectorAll(
    ".info-image"
) as NodeListOf<HTMLImageElement>;

images.forEach((img, index) => {
    const flipClass = index % 2 === 0 ? "flip-left" : "flip-right";
    img.classList.add("flip-hidden", flipClass);

    img.addEventListener("click", () => {
        const parent = img.closest(".grid-column") as HTMLElement;
        const title =
            parent?.nextElementSibling?.querySelector("h3")?.textContent ||
            parent?.previousElementSibling?.querySelector("h3")?.textContent ||
            "Title";

        openModal(img.src, title, index + 1);
    });
});

window.addEventListener("scroll", () => revealFlip(images));
revealFlip(images);
