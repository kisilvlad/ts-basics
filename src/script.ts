// Define an interface for posts fetched from JSONPlaceholder
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Grab references to the modal and its controls
const modal: HTMLElement | null = document.getElementById('myModal');
const openBtn1: HTMLElement | null = document.getElementById('openModal');
const openBtn2: HTMLElement | null = document.getElementById('openModalButton');
const closeBtn: HTMLElement | null = document.getElementById('closeModal');

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
window.addEventListener('click', (event: MouseEvent) => {
  if (event.target === modal) {
    hideModal();
  }
});

// Add a shadow to the fixed header when scrolling down
const headerEl: HTMLElement | null = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (headerEl) {
    if (window.scrollY > 50) {
      headerEl.classList.add('shadow');
    } else {
      headerEl.classList.remove('shadow');
    }
  }
});

// Function to fetch posts from JSONPlaceholder and display them on the page
async function loadPosts(): Promise<void> {
  const postsContainer = document.getElementById('postsContainer');
  if (!postsContainer) return;
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const posts: Post[] = await response.json();
    postsContainer.innerHTML = '';
    posts.forEach((post: Post) => {
      const postDiv = document.createElement('div');
      postDiv.className = 'post';
      postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
      postsContainer.appendChild(postDiv);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    if (postsContainer) {
      postsContainer.textContent = 'Failed to load posts.';
    }
  }
}

// Initialize the page when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadPosts();
});
