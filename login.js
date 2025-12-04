// Initialize particles background
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
        }
    },
    retina_detect: true
});

// DOM Elements
const loginContainer = document.getElementById('loginContainer');
const welcomeAnimation = document.getElementById('welcomeAnimation');
const greetingText = document.getElementById('greetingText');
const showPasswordBtn = document.getElementById('showPassword');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const guestAccessBtn = document.getElementById('guestAccess');
const userNameInput = document.getElementById('userName');

// Toggle password visibility
showPasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

// Form validation and login
loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const userName = userNameInput.value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const password = passwordInput.value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!userName) {
        showError('Please enter your name');
        return;
    }
    
    if (!phoneNumber) {
        showError('Please enter your phone number');
        return;
    }
    
    if (!password) {
        showError('Please create a password');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    // Store user data
    const userData = {
        name: userName,
        phone: phoneNumber,
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('deevaUser', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    
    // Show welcome animation
    greetingText.textContent = `Hello ${userName}!`;
    loginContainer.style.display = 'none';
    welcomeAnimation.style.display = 'flex';
    
    // Redirect to dashboard after animation
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 3000);
});

// Guest access
guestAccessBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const userData = {
        name: 'Guest',
        phone: 'Not provided',
        loginTime: new Date().toISOString(),
        isGuest: true
    };
    
    localStorage.setItem('deevaUser', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    
    greetingText.textContent = 'Welcome Guest!';
    loginContainer.style.display = 'none';
    welcomeAnimation.style.display = 'flex';
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 3000);
});

// Show error message
function showError(message) {
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    // Style the error
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4757;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 15px rgba(255, 71, 87, 0.3);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

// Add CSS for error animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Check if already logged in
window.addEventListener('load', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = JSON.parse(localStorage.getItem('deevaUser') || '{}');
    
    if (isLoggedIn === 'true' && userData.name) {
        greetingText.textContent = `Welcome back, ${userData.name}!`;
        loginContainer.style.display = 'none';
        welcomeAnimation.style.display = 'flex';
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
    }
});