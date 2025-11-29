"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Інжект стилів
function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
        /* ----- MODAL ------ */
        .modal {
            position: fixed;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(0,0,0,0);
            z-index: 9999;
            transition: background 0.18s ease;
        }
        .modal.show {
            background: rgba(0,0,0,0.6);
        }

        .modal-content {
            background: #fff;
            padding: 20px;
            border-radius: 14px;
            max-width: 520px;
            width: 90%;
            text-align: center;
            position: relative;

            transform: scale(0.8) translateZ(0);
            opacity: 0;
            transition: transform 0.18s ease, opacity 0.18s ease;
        }
        .modal-content.show {
            transform: scale(1) translateZ(0);
            opacity: 1;
        }

        .close-btn {
        text-align: center;
        height: 40px;
        width: 40px;
        background: #42423aff;
        boder: 1px solid transparent;
        border-radius: 50%;
            position: absolute;
            right: 12px;
            top: 10px;
            font-size: 32px;
            font-weight: bold;
            cursor: pointer;
            color: #dfdfdfff;
            transition: 0.15s;
        }
        .close-btn:hover {
            color: #d33;
        }

        .modal-img {
            width: 100%;
            border-radius: 8px;
            margin-bottom: 12px;
        }

        /* ----- FLIP ANIMATION ------ */
        .flip-hidden {
            opacity: 0;
            transform-style: preserve-3d;
            transition: transform 0.7s ease, opacity 0.7s ease;
        }
        .flip-left  { transform: rotateY(-90deg); }
        .flip-right { transform: rotateY(90deg); }

        .flip-visible {
            opacity: 1;
            transform: rotateY(0deg);
        }
    `;
    document.head.appendChild(style);
}
injectStyles();
function loadPhoto(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://jsonplaceholder.typicode.com/photos/" + id);
        if (!response.ok) {
            throw new Error("HTTP error");
        }
        const data = yield response.json();
        if (typeof data.url !== "string" || typeof data.title !== "string") {
            throw new Error("Некоректний формат JSON");
        }
        console.log(data);
        return data;
    });
}
// ----- MODАЛКА -----
function openModal(imgSrc, titleText, apiId) {
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
// ----- SCROLL FLIP -----
// показує при скролі вниз, ховає при скролі вверх
function revealFlip() {
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
window.addEventListener("scroll", revealFlip);
revealFlip();
