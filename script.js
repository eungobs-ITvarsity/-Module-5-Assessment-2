// ===== MOBILE NAVIGATION TOGGLE =====
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
    if (navLinks && navLinks.classList.contains('active')) {
        if (!navbar.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// ===== IMAGE GALLERY - CHANGE MAIN IMAGE =====
function changeImage(mainImageId, newSrc) {
    const mainImage = document.getElementById(mainImageId);
    if (mainImage) {
        // Fade out effect
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.style.opacity = '1';
        }, 200);
    }
    
    // Update thumbnail active state
    const thumbnails = mainImage.closest('.vehicle-gallery').querySelectorAll('.thumbnail-images img');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src.replace('w=150', 'w=600') === newSrc || thumb.src === newSrc) {
            thumb.classList.add('active');
        }
    });
}

// ===== VEHICLE FILTER FUNCTIONALITY =====
function filterVehicles() {
    const brandFilter = document.getElementById('brandFilter');
    const priceFilter = document.getElementById('priceFilter');
    const typeFilter = document.getElementById('typeFilter');
    
    if (!brandFilter || !priceFilter || !typeFilter) return;
    
    const brand = brandFilter.value;
    const price = priceFilter.value;
    const type = typeFilter.value;
    
    const vehicles = document.querySelectorAll('.vehicle-listing');
    
    vehicles.forEach(vehicle => {
        const vehicleBrand = vehicle.dataset.brand;
        const vehiclePrice = parseInt(vehicle.dataset.price);
        const vehicleType = vehicle.dataset.type;
        
        let showVehicle = true;
        
        // Brand filter
        if (brand !== 'all' && vehicleBrand !== brand) {
            showVehicle = false;
        }
        
        // Price filter
        if (price !== 'all') {
            if (price === '0-300000' && vehiclePrice > 300000) {
                showVehicle = false;
            } else if (price === '300000-500000' && (vehiclePrice < 300000 || vehiclePrice > 500000)) {
                showVehicle = false;
            } else if (price === '500000-800000' && (vehiclePrice < 500000 || vehiclePrice > 800000)) {
                showVehicle = false;
            } else if (price === '800000+' && vehiclePrice < 800000) {
                showVehicle = false;
            }
        }
        
        // Type filter
        if (type !== 'all' && vehicleType !== type) {
            showVehicle = false;
        }
        
        // Show or hide vehicle
        if (showVehicle) {
            vehicle.classList.remove('hidden');
            vehicle.style.animation = 'fadeIn 0.5s ease';
        } else {
            vehicle.classList.add('hidden');
        }
    });
    
    // Check if no vehicles are visible
    const visibleVehicles = document.querySelectorAll('.vehicle-listing:not(.hidden)');
    const vehiclesList = document.querySelector('.vehicles-list');
    
    // Remove existing "no results" message
    const existingMessage = document.querySelector('.no-results');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Add "no results" message if needed
    if (visibleVehicles.length === 0 && vehiclesList) {
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        noResultsDiv.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; background: white; border-radius: 15px;">
                <h3 style="color: #1d3557; margin-bottom: 15px;">No vehicles found</h3>
                <p style="color: #6c757d; margin-bottom: 20px;">Try adjusting your filters to see more results.</p>
                <button onclick="resetFilters()" class="btn">Reset Filters</button>
            </div>
        `;
        vehiclesList.appendChild(noResultsDiv);
    }
}

// Reset all filters
function resetFilters() {
    const brandFilter = document.getElementById('brandFilter');
    const priceFilter = document.getElementById('priceFilter');
    const typeFilter = document.getElementById('typeFilter');
    
    if (brandFilter) brandFilter.value = 'all';
    if (priceFilter) priceFilter.value = 'all';
    if (typeFilter) typeFilter.value = 'all';
    
    filterVehicles();
}

// ===== CONTACT FORM HANDLING =====
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form elements
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.btn-submit');
    
    // Validate form
    if (!validateForm()) {
        return false;
    }
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (in real scenario, this would be an API call)
    setTimeout(() => {
        // Hide form and show success message
        form.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Scroll to success message
        document.getElementById('successMessage').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 2000);
    
    return false;
}

// Form validation
function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // First Name validation
    const firstName = document.getElementById('firstName');
    if (firstName && firstName.value.trim() === '') {
        showError('firstName', 'First name is required');
        isValid = false;
    } else if (firstName && firstName.value.trim().length < 2) {
        showError('firstName', 'First name must be at least 2 characters');
        isValid = false;
    }
    
    // Last Name validation
    const lastName = document.getElementById('lastName');
    if (lastName && lastName.value.trim() === '') {
        showError('lastName', 'Last name is required');
        isValid = false;
    } else if (lastName && lastName.value.trim().length < 2) {
        showError('lastName', 'Last name must be at least 2 characters');
        isValid = false;
    }
    
    // Email validation
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && email.value.trim() === '') {
        showError('email', 'Email address is required');
        isValid = false;
    } else if (email && !emailRegex.test(email.value.trim())) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    const phone = document.getElementById('phone');
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (phone && phone.value.trim() === '') {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (phone && !phoneRegex.test(phone.value.trim())) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Subject validation
    const subject = document.getElementById('subject');
    if (subject && subject.value === '') {
        showError('subject', 'Please select a subject');
        isValid = false;
    }
    
    // Message validation
    const message = document.getElementById('message');
    if (message && message.value.trim() === '') {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message && message.value.trim().length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    // Terms validation
    const terms = document.getElementById('terms');
    if (terms && !terms.checked) {
        showError('terms', 'You must agree to the Terms & Conditions');
        isValid = false;
    }
    
    return isValid;
}

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field) {
        field.classList.add('error');
        field.classList.remove('success');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Clear all errors
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
    });
    
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        input.classList.remove('error');
        input.classList.remove('success');
    });
}

// Real-time validation on blur
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error when user starts typing
            this.classList.remove('error');
            const errorElement = document.getElementById(this.id + 'Error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    });
});

// Validate single field
function validateSingleField(field) {
    const id = field.id;
    const value = field.value.trim();
    
    
    field.classList.remove('error');
    field.classList.remove('success');
    const errorElement = document.getElementById(id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    let isValid = true;
    
    switch(id) {
        case 'firstName':
        case 'lastName':
            if (value === '') {
                showError(id, `${id === 'firstName' ? 'First' : 'Last'} name is required`);
                isValid = false;
            } else if (value.length < 2) {
                showError(id, `${id === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`);
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value === '') {
                showError(id, 'Email address is required');
                isValid = false;
            } else if (!emailRegex.test(value)) {
                showError(id, 'Please enter a valid email address');
                isValid = false;
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (value === '') {
                showError(id, 'Phone number is required');
                isValid = false;
            } else if (!phoneRegex.test(value)) {
                showError(id, 'Please enter a valid phone number');
                isValid = false;
            }
            break;
            
        case 'subject':
            if (value === '') {
                showError(id, 'Please select a subject');
                isValid = false;
            }
            break;
            
        case 'message':
            if (value === '') {
                showError(id, 'Message is required');
                isValid = false;
            } else if (value.length < 10) {
                showError(id, 'Message must be at least 10 characters');
                isValid = false;
            }
            break;
    }
    
    if (isValid && value !== '') {
        field.classList.add('success');
    }
}

// Reset form and show form again
function resetForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form) {
        form.reset();
        form.style.display = 'block';
        clearErrors();
    }
    
    if (successMessage) {
        successMessage.style.display = 'none';
    }
    
    // Scroll to form
    const formWrapper = document.querySelector('.contact-form-wrapper');
    if (formWrapper) {
        formWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            navbar.style.padding = '10px 50px';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '15px 50px';
        }
    }
});

// ===== FADE IN ANIMATION ON SCROLL =====
const fadeInElements = document.querySelectorAll('.vehicle-card, .vehicle-listing, .info-item');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(element);
});

// ===== ADD ANIMATION KEYFRAMES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    // Set first thumbnail as active
    const thumbnails = document.querySelectorAll('.thumbnail-images');
    thumbnails.forEach(container => {
        const firstThumb = container.querySelector('img');
        if (firstThumb) {
            firstThumb.classList.add('active');
        }
    });
    
    // Initialize main image opacity
    const mainImages = document.querySelectorAll('.main-image img');
    mainImages.forEach(img => {
        img.style.transition = 'opacity 0.2s ease';
    });
    
    console.log('Auto4Sale website loaded successfully!');
});