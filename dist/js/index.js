import { revealFlip } from "./modules/scroll.js";
import { openModal } from "./modules/modal.js";
import { injectStyles } from "./modules/style.js";
// Інжект стилів
injectStyles();
// ----- Клік по фоткам -----
const images = document.querySelectorAll(".info-image");
images.forEach((img, index) => {
    const flipClass = index % 2 === 0 ? "flip-left" : "flip-right";
    img.classList.add("flip-hidden", flipClass);
    img.addEventListener("click", () => {
        var _a, _b, _c, _d;
        const parent = img.closest(".grid-column");
        const title = ((_b = (_a = parent === null || parent === void 0 ? void 0 : parent.nextElementSibling) === null || _a === void 0 ? void 0 : _a.querySelector("h3")) === null || _b === void 0 ? void 0 : _b.textContent) ||
            ((_d = (_c = parent === null || parent === void 0 ? void 0 : parent.previousElementSibling) === null || _c === void 0 ? void 0 : _c.querySelector("h3")) === null || _d === void 0 ? void 0 : _d.textContent) ||
            "Title";
        openModal(img.src, title, index + 1);
    });
});
window.addEventListener("scroll", () => revealFlip(images));
revealFlip(images);
