import { loadPhoto } from "./api.js";
// ----- MODАЛКА -----
export async function openModal(
    imgSrc: string,
    titleText: string,
    apiId: number
): Promise<void> {
    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <img src="${imgSrc}" class="modal-img" />
            <h3>${titleText}</h3>
            <p id="json-text">Завантаження...</p>
        </div>
    `;

    document.body.appendChild(modal);

    const modalContent = modal.querySelector(".modal-content") as HTMLElement;
    const textField = modal.querySelector("#json-text") as HTMLElement;

    requestAnimationFrame(() => {
        modal.classList.add("show");
        modalContent.classList.add("show");
    });

    const close = () => {
        modal.classList.remove("show");
        modalContent.classList.remove("show");
        setTimeout(() => modal.remove(), 180);
    };

    modal.onclick = (e) => {
        if (e.target === modal) close();
    };
    modal.querySelector(".close-btn")?.addEventListener("click", close);

    try {
        const data = await loadPhoto(apiId);
        textField.innerText = data.title;
    } catch {
        textField.innerText = "Помилка завантаження.";
    }
}
