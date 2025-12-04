// Common functionality for all pages

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle?.contains(e.target) && !navLinks?.contains(e.target)) {
            navLinks?.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
    // Initialize user info
    initUserInfo();
    
    // Setup ChatGPT assistant
    setupChatGPT();
    
    // Setup unit tabs if on unit page
    setupUnitTabs();
    
    // Check authentication on protected pages
    if (!window.location.pathname.includes('index.html')) {
        checkAuth();
    }
});

// Check authentication
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('deevaUser'));
    if (!user) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Initialize user information
function initUserInfo() {
    const user = JSON.parse(localStorage.getItem('deevaUser'));
    if (!user) return;
    
    // Update welcome message
    const welcomeElement = document.getElementById('welcomeMessage');
    if (welcomeElement) {
        welcomeElement.textContent = `Hello ${user.name}!`;
    }
    
    // Update user info in navbar
    const userNameElement = document.querySelector('.user-name');
    const userAvatar = document.querySelector('.user-avatar');
    
    if (userNameElement) {
        userNameElement.textContent = user.name;
    }
    
    if (userAvatar) {
        userAvatar.textContent = user.name.charAt(0).toUpperCase();
    }
}

// Setup ChatGPT assistant
function setupChatGPT() {
    const chatgptBtn = document.querySelector('.chatgpt-btn');
    const chatgptPanel = document.querySelector('.chatgpt-panel');
    const closePanel = document.querySelector('.close-panel');
    
    if (chatgptBtn && chatgptPanel) {
        chatgptBtn.addEventListener('click', () => {
            chatgptPanel.classList.toggle('active');
        });
    }
    
    if (closePanel && chatgptPanel) {
        closePanel.addEventListener('click', () => {
            chatgptPanel.classList.remove('active');
        });
    }
    
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!chatgptBtn?.contains(e.target) && !chatgptPanel?.contains(e.target)) {
            chatgptPanel?.classList.remove('active');
        }
    });
}

// Setup unit tabs
function setupUnitTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length === 0) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('deevaUser');
        window.location.href = 'index.html';
    }
}

// Open ChatGPT with psychology question
function openChatGPT(question) {
    const user = JSON.parse(localStorage.getItem('deevaUser'));
    const userName = user?.name || 'Student';
    
    const questions = {
        piaget: "Explain Piaget's cognitive development stages with examples for each stage",
        freud: "What are Freud's psychoanalytic theory components (Id, Ego, Superego)?",
        vygotsky: "Explain Vygotsky's Zone of Proximal Development (ZPD)",
        learning: "What are the main differences between classical and operant conditioning?",
        intelligence: "Explain Howard Gardner's theory of multiple intelligences"
    };
    
    const selectedQuestion = questions[question] || questions.piaget;
    const encodedQuestion = encodeURIComponent(`${selectedQuestion} - I'm ${userName} studying psychology in education.`);
    
    window.open(`https://chat.openai.com/?q=${encodedQuestion}`, '_blank');
}

// Progress tracking
function updateProgress(unitId, progress) {
    const progressData = JSON.parse(localStorage.getItem('deevaProgress')) || {};
    progressData[unitId] = progress;
    localStorage.setItem('deevaProgress', JSON.stringify(progressData));
}

function getProgress(unitId) {
    const progressData = JSON.parse(localStorage.getItem('deevaProgress')) || {};
    return progressData[unitId] || 0;
}

// Animate progress bars
function animateProgressBars() {
    document.querySelectorAll('.progress-fill').forEach(fill => {
        const targetWidth = fill.dataset.progress || '0';
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.width = targetWidth + '%';
        }, 300);
    });
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize page with animations
window.addEventListener('load', () => {
    // Animate progress bars
    animateProgressBars();
    
    // Add floating animation to cards
    document.querySelectorAll('.unit-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('floating');
    });
});