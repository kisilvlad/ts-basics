var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Grab references to the modal and its controls
const modal = document.getElementById('myModal');
const openBtn1 = document.getElementById('openModal');
const openBtn2 = document.getElementById('openModalButton');
const closeBtn = document.getElementById('closeModal');
// Helper function to show the modal
function showModal() {
    if (modal) {
        modal.style.display = 'block';
    }
}
// Helper function to hide the modal
function hideModal() {
    if (modal) {
        modal.style.display = 'none';
    }
}
// Attach click handlers to open buttons
if (openBtn1) {
    openBtn1.addEventListener('click', showModal);
}
if (openBtn2) {
    openBtn2.addEventListener('click', showModal);
}
// Attach click handler to close button
if (closeBtn) {
    closeBtn.addEventListener('click', hideModal);
}
// Close the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideModal();
    }
});
// Add a shadow to the fixed header when scrolling down
const headerEl = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (headerEl) {
        if (window.scrollY > 50) {
            headerEl.classList.add('shadow');
        }
        else {
            headerEl.classList.remove('shadow');
        }
    }
});
// Function to fetch posts from JSONPlaceholder and display them on the page
function loadPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        const postsContainer = document.getElementById('postsContainer');
        if (!postsContainer)
            return;
        try {
            const response = yield fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
            const posts = yield response.json();
            postsContainer.innerHTML = '';
            posts.forEach((post) => {
                const postDiv = document.createElement('div');
                postDiv.className = 'post';
                postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
                postsContainer.appendChild(postDiv);
            });
        }
        catch (error) {
            console.error('Error fetching posts:', error);
            if (postsContainer) {
                postsContainer.textContent = 'Failed to load posts.';
            }
        }
    });
}
// Initialize the page when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
});
