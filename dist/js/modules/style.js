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
export { injectStyles };
