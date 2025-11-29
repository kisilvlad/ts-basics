var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { loadPhoto } from "./api.js";
// ----- MODАЛКА -----
export function openModal(imgSrc, titleText, apiId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
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
        const modalContent = modal.querySelector(".modal-content");
        const textField = modal.querySelector("#json-text");
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
            if (e.target === modal)
                close();
        };
        (_a = modal.querySelector(".close-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", close);
        try {
            const data = yield loadPhoto(apiId);
            textField.innerText = data.title;
        }
        catch (_b) {
            textField.innerText = "Помилка завантаження.";
        }
    });
}
