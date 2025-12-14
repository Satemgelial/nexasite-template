// themes.js - Universal Theme Switcher
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme or default to blue
    const savedTheme = localStorage.getItem('theme') || 'blue';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme buttons if they exist
    updateThemeButtons(savedTheme);
    
    // Setup theme switcher functionality
    setupThemeSwitcher();
});

function updateThemeButtons(currentTheme) {
    document.querySelectorAll('.theme-option').forEach(option => {
        if(option.getAttribute('data-theme') === currentTheme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function setupThemeSwitcher() {
    // Handle theme option clicks
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            changeTheme(theme);
        });
    });
    
    // Handle theme dropdown if exists
    const themeSelect = document.getElementById('themeSelect');
    if(themeSelect) {
        themeSelect.value = localStorage.getItem('theme') || 'blue';
        themeSelect.addEventListener('change', function() {
            changeTheme(this.value);
        });
    }
}

function changeTheme(theme) {
    // Apply theme
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update active buttons
    updateThemeButtons(theme);
    
    // Optional: Show notification
    const themeNames = {
        'blue': 'Blue Theme',
        'green': 'Green Theme',
        'purple': 'Purple Theme',
        'dark': 'Dark Theme',
        'orange': 'Orange Theme'
    };
    showNotification(`Theme changed to ${themeNames[theme]}`);
}

function showNotification(message) {
    // Remove existing notification
    const existingNote = document.querySelector('.theme-notification');
    if(existingNote) existingNote.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 15px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    // Add close button style
    notification.querySelector('button').style.cssText = `
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if(notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// CSS for theme notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);