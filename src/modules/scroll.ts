// ----- SCROLL FLIP -----
// показує при скролі вниз, ховає при скролі вверх
export function revealFlip(images: NodeListOf<HTMLImageElement>): void {
    images.forEach((img) => {
        const rect = img.getBoundingClientRect();

        if (rect.top < window.innerHeight - 100) {
            img.classList.add("flip-visible");
        }

        if (rect.bottom < 0 || rect.top > window.innerHeight) {
            img.classList.remove("flip-visible");
        }
    });
}
