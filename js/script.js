
console.log('=== START OF SCRIPT.JS ===');



// DEBUG: Check elements on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('📱 DOM loaded - checking mobile elements:');
    console.log('Mobile toggle:', document.getElementById('mobileToggle'));
    console.log('Nav links:', document.getElementById('navLinks'));
    console.log('Nav links classList:', document.getElementById('navLinks')?.classList);
    
    // Manually test the click event
    const toggle = document.getElementById('mobileToggle');
    if (toggle) {
        console.log('✅ Mobile toggle found, adding event listener...');
    }
});

// ========= EMAILJS CONFIGURATION =========
// ========= EMAILJS CONFIGURATION =========
window.EMAILJS_CONFIG = {
    USER_ID: 'OAu2A8_bcxDNyZT7y',
    SERVICE_ID: 'service_gq205g3',
    TEMPLATE_ID: 'template_ha8xxpf'
};

console.log('EmailJS Config loaded');

// SAFE EmailJS initialization
function initializeEmailJS() {
    try {
        if (typeof emailjs === 'undefined') {
            console.warn('⚠️ EmailJS library not loaded yet');
            return false;
        }
        
        if (window.EMAILJS_CONFIG.USER_ID) {
            emailjs.init(window.EMAILJS_CONFIG.USER_ID);
            console.log('✅ EmailJS initialized');
            return true;
        } else {
            console.warn('⚠️ EmailJS not initialized - missing User ID');
            return false;
        }
    } catch (error) {
        console.error('❌ EmailJS initialization error:', error);
        return false;
    }
}

// Initialize when EmailJS is ready
if (typeof emailjs !== 'undefined') {
    // EmailJS already loaded
    initializeEmailJS();
} else {
    // Wait for EmailJS to load
    window.addEventListener('load', function() {
        setTimeout(initializeEmailJS, 1000);
    });
}
// ========= GLOBAL FUNCTIONS =========

// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        console.log('hamburger clicked');
        navLinks.classList.toggle('active');
        mobileToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Navbar scroll effect
const mainNav = document.querySelector('.main-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter form submission
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // Show success feedback
            const button = form.querySelector('button');
            const originalHTML = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = '#10B981';
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = '';
            }, 2000);
            
            emailInput.value = '';
            console.log('Newsletter subscription:', email);
        }
    });
});

// Scroll animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Stagger children animations
            if (entry.target.classList.contains('services-grid') || 
                entry.target.classList.contains('values-grid') ||
                entry.target.classList.contains('team-grid')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                });
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// ========= EVENTS PAGE FUNCTIONS =========

// Events Calendar Functionality
const calendarEvents = [
    { date: '2024-03-01', title: 'March Session Start', type: 'music' },
    { date: '2024-03-08', title: "Women's Day Special", type: 'special' },
    { date: '2024-03-15', title: 'St. Patrick\'s Festival', type: 'music' },
    { date: '2024-03-16', title: 'St. Patrick\'s Festival', type: 'music' },
    { date: '2024-03-17', title: 'St. Patrick\'s Day', type: 'special' },
    { date: '2024-03-22', title: 'Music Workshop', type: 'special' },
    { date: '2024-03-25', title: 'Traditional Food Night', type: 'food' },
    { date: '2024-03-29', title: 'Easter Weekend Start', type: 'music' },
    { date: '2024-03-30', title: 'Easter Music Marathon', type: 'music' },
    { date: '2024-03-31', title: 'Easter Sunday Roast', type: 'food' }
];

function generateCalendar(year, month) {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;
    
    calendarGrid.innerHTML = '';
    
    // Day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();
    
    const today = new Date();
    const isToday = (day) => 
        day === today.getDate() && 
        month === today.getMonth() && 
        year === today.getFullYear();
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.innerHTML = `<span class="day-number">${prevMonthLastDay - i}</span>`;
        calendarGrid.appendChild(day);
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        if (isToday(i)) {
            day.classList.add('today');
        }
        
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const dayEvents = calendarEvents.filter(event => event.date === dateStr);
        
        let eventsHTML = '';
        dayEvents.forEach(event => {
            eventsHTML += `<div class="day-event" data-type="${event.type}">${event.title}</div>`;
        });
        
        day.innerHTML = `
            <span class="day-number">${i}</span>
            ${eventsHTML}
        `;
        calendarGrid.appendChild(day);
    }
    
    // Next month days
    const totalCells = 42; // 6 weeks * 7 days
    const remainingCells = totalCells - (startDay + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.innerHTML = `<span class="day-number">${i}</span>`;
        calendarGrid.appendChild(day);
    }
    
    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
}

// Filter events
function filterEvents(filter) {
    const events = document.querySelectorAll('.day-event');
    events.forEach(event => {
        if (filter === 'all' || event.dataset.type === filter) {
            event.style.display = 'block';
        } else {
            event.style.display = 'none';
        }
    });
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
}

// FAQ functionality for events page
// FAQ functionality for events page
// Even simpler version
function setupEventFAQs() {
    console.log('Setting up working FAQs...');
    
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isVisible = answer.style.display === 'block';
            
            // Hide all answers first
            document.querySelectorAll('.faq-answer').forEach(a => {
                a.style.display = 'none';
                a.classList.remove('active');
            });
            
            // Show this answer
            if (!isVisible) {
                answer.style.display = 'block';
                answer.classList.add('active');
            }
        });
    });
}


// Initialize events page
function initEventsPage() {
    const today = new Date();
    generateCalendar(today.getFullYear(), today.getMonth());
    
    // Month navigation
    let currentDate = new Date();
    document.getElementById('prevMonth')?.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
    
    document.getElementById('nextMonth')?.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
    
    // Event filtering
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterEvents(btn.dataset.filter);
        });
    });
    
    // Setup FAQs
    setupEventFAQs();
    
    // Group booking form
    const groupForm = document.getElementById('groupBookingForm');
    if (groupForm) {
        groupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your enquiry! We will contact you within 24 hours.');
            groupForm.reset();
        });
    }
}

// ========= GALLERY PAGE FUNCTIONS =========

function initGalleryPage() {
    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Load more button
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            setTimeout(() => {
                loadMoreBtn.innerHTML = '<i class="fas fa-images"></i> No More Photos';
                loadMoreBtn.disabled = true;
                loadMoreBtn.style.opacity = '0.5';
            }, 1000);
        });
    }
    
    // Video play buttons
    const videoPlays = document.querySelectorAll('.video-play');
    videoPlays.forEach(playBtn => {
        playBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Video playback would start here. For demonstration purposes only.');
        });
    });
    
    // Simple lightbox functionality
    const galleryLinks = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('lightgallery-modal');
    
    if (modal) {
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        
        galleryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const imgSrc = link.getAttribute('href');
                const caption = link.querySelector('.gallery-caption h3')?.textContent || 'Image';
                const description = link.querySelector('.gallery-caption p')?.textContent || '';
                
                modalImage.src = imgSrc;
                modalImage.alt = caption;
                modalTitle.textContent = caption;
                modalDescription.textContent = description;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        const closeModal = document.querySelector('.modal-close');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Instagram feed simulation
    const instagramFeed = document.getElementById('instagramFeed');
    if (instagramFeed && instagramFeed.querySelector('.instagram-placeholder')) {
        setTimeout(() => {
            const placeholder = instagramFeed.querySelector('.instagram-placeholder');
            if (placeholder) {
                placeholder.innerHTML = `
                    <div class="instagram-message">
                        <i class="fab fa-instagram"></i>
                        <p>Follow <a href="https://instagram.com/jjhoughs" target="_blank">@jjhoughs</a> on Instagram to see more photos!</p>
                    </div>
                `;
            }
        }, 2000);
    }
}

// ========= CONTACT PAGE FUNCTIONS =========

// ========= CONTACT PAGE FUNCTIONS =========

function initContactPage() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate required fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const newsletter = document.getElementById('newsletter').checked;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields (*)');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Get form button and show loading
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            const originalBg = submitBtn.style.background;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            submitBtn.style.background = '#6B7280';
            
            try {
                // Get subject text from dropdown
                const subjectSelect = document.getElementById('subject');
                const selectedOption = subjectSelect.options[subjectSelect.selectedIndex];
                const subjectText = selectedOption.text;
                
                // Prepare email data for your NEW template
                const templateParams = {
                    from_name: name,
                    from_email: email,
                    phone: phone || 'Not provided',
                    business_type: subjectText,  // Using business_type for template compatibility
                    message: message,
                    newsletter_subscribed: newsletter ? 'Yes' : 'No',
                    date: new Date().toLocaleString('en-IE', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'Europe/Dublin'
                    })
                };
                
                console.log('Sending email with params:', templateParams);
                
                // Send email via EmailJS with your NEW template
                const response = await emailjs.send(
                    window.EMAILJS_CONFIG.SERVICE_ID,
                    window.EMAILJS_CONFIG.TEMPLATE_ID,
                    templateParams
                );
                
                // SUCCESS
                console.log('EmailJS Response:', response);
                
                // Update button to success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#10B981';
                
                // Show success message
                showFormMessage(
                    'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.',
                    'success'
                );
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                }, 2000);
                
            } catch (error) {
                // ERROR
                console.error('EmailJS Error:', error);
                
                // Update button to error state
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
                submitBtn.style.background = '#EF4444';
                
                // Show error message
                let errorMsg = 'Sorry, there was an error sending your message. ';
                
                if (error.text && error.text.includes('Invalid login')) {
                    errorMsg += 'Email service configuration error.';
                } else if (error.text && error.text.includes('quota')) {
                    errorMsg += 'Email limit reached. Please try again later.';
                } else {
                    errorMsg += 'Please try again or email us directly at info@jjhoughs.ie';
                }
                
                showFormMessage(errorMsg, 'error');
                
            } finally {
                // Reset button after 5 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = originalBg;
                    submitBtn.disabled = false;
                }, 5000);
            }
        });
    }
    
    // FAQ functionality (keep this part as is)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all answers in the same column
            const parentColumn = question.closest('.faq-column');
            if (parentColumn) {
                parentColumn.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('active');
                });
                parentColumn.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                });
            }
            
            // Toggle current answer
            if (!isActive) {
                answer.classList.add('active');
                question.classList.add('active');
            }
        });
    });
    
    // Map interaction (keep this part as is)
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.style.cursor = 'pointer';
        mapPlaceholder.addEventListener('mouseenter', () => {
            mapPlaceholder.style.transform = 'scale(1.01)';
        });
        
        mapPlaceholder.addEventListener('mouseleave', () => {
            mapPlaceholder.style.transform = 'scale(1)';
        });
    }
}

// ========= MENU PAGE FUNCTIONS =========

function initMenuPage() {
    // Menu category switching
    const menuButtons = document.querySelectorAll('.menu-category-btn');
    const menuSections = {
        'food': document.getElementById('foodSection'),
        'drinks': document.getElementById('drinksSection'),
        'whiskey': document.getElementById('whiskeySection'),
        'beer': document.getElementById('drinksSection'), // Same as drinks
        'specials': document.getElementById('specialsSection')
    };
    
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active button
            menuButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Hide all sections
            Object.values(menuSections).forEach(section => {
                if (section) section.classList.add('hidden');
            });
            
            // Show selected section
            const targetSection = menuSections[category];
            if (targetSection) {
                targetSection.classList.remove('hidden');
                
                // Special case for beer - it's in drinks section
                if (category === 'beer') {
                    // Scroll to beer section within drinks
                    setTimeout(() => {
                        const beerCategory = targetSection.querySelector('.category-title');
                        if (beerCategory && beerCategory.textContent.includes('Beers')) {
                            beerCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 100);
                }
                
                // Scroll to section
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
            }
        });
    });
    
    // Update current date for specials
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('en-IE', options);
    }
    
    // Try cocktail button
    const tryCocktailBtn = document.querySelector('.try-cocktail');
    if (tryCocktailBtn) {
        tryCocktailBtn.addEventListener('click', () => {
            alert('Our bartender will prepare your Black Bush Old Fashioned! Please order at the bar.');
        });
    }
    
    // Menu item animations
    const menuItems = document.querySelectorAll('.menu-item, .drinks-item, .whiskey-item, .special-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
}

// ========= INITIALIZE ALL PAGES =========

document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations for elements
    document.querySelectorAll('.service-preview, .testimonial-card, .value-card, .team-member, .comparison-item, .info-card, .event-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        scrollObserver.observe(el);
    });
    
    // Check which page we're on and initialize specific functions
    const path = window.location.pathname;
    
    if (document.querySelector('.music-faq')) {
    initEventsPage();
}
    
    if (path.includes('/gallery') || document.querySelector('.gallery-grid')) {
        initGalleryPage();
    }
    
    if (path.includes('/contact') || document.getElementById('contactForm')) {
        initContactPage();
    }
    
    if (path.includes('/menu') || document.querySelector('.menu-categories')) {
        initMenuPage();
    }
    
    
    
    // Set current year in footer if needed
    const yearSpans = document.querySelectorAll('.current-year');
    if (yearSpans.length > 0) {
        const currentYear = new Date().getFullYear();
        yearSpans.forEach(span => {
            span.textContent = currentYear;
        });
    }
});

// ========= UTILITY FUNCTIONS =========

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IE', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation (Irish format)
function validatePhone(phone) {
    const re = /^(\+353|0)(\s?[1-9]{1}[\d\s]{8,9})$/;
    return re.test(phone);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid #10B981;
    }
    
    .notification.error {
        border-left-color: #EF4444;
    }
    
    .notification i {
        font-size: 1.2rem;
    }
    
    .notification.success i {
        color: #10B981;
    }
    
    .notification.error i {
        color: #EF4444;
    }
    
    .notification span {
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: #6B7280;
        padding: 0.25rem;
    }
    
    .notification.fade-out {
        animation: slideOutRight 0.3s ease forwards;
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;

document.head.appendChild(notificationStyles);


// ========= HELPER FUNCTION FOR FORM MESSAGES =========
function showFormMessage(message, type = 'success') {
    // Remove any existing messages
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.innerHTML = `
        <p>${message}</p>
        <button class="close-message">&times;</button>
    `;
    
    // Add styles
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add close button
    const closeBtn = messageEl.querySelector('.close-message');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0 0 0 20px;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        messageEl.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    });
    
    // Add animations if not already present
    if (!document.querySelector('#form-message-animations')) {
        const style = document.createElement('style');
        style.id = 'form-message-animations';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto-remove after 7 seconds
    setTimeout(() => {
        if (document.body.contains(messageEl)) {
            messageEl.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }
    }, 7000);
    
    // Add to page
    document.body.appendChild(messageEl);
}
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.music-faq')) {
        setupEventFAQs();
        console.log('FAQ initialised');
    }
});




// ========= SIMPLE FAQ FUNCTIONALITY =========
function setupSimpleFAQs() {
    console.log('Setting up simple FAQ functionality...');
    
    document.querySelectorAll('.simple-faq-question').forEach(question => {
        question.addEventListener('click', function() {
            console.log('FAQ clicked');
            
            // Close all other FAQs
            document.querySelectorAll('.simple-faq-item').forEach(item => {
                if (item !== this.parentElement) {
                    item.querySelector('.simple-faq-answer').classList.remove('active');
                    item.querySelector('.simple-faq-question').classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            const answer = this.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close if it's already open
            if (isActive) {
                answer.classList.remove('active');
                this.classList.remove('active');
            } 
            // Open if it's closed
            else {
                answer.classList.add('active');
                this.classList.add('active');
            }
        });
    });
    
    console.log('FAQ setup complete');
}


// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on events page
    if (document.querySelector('.simple-faq-grid')) {
        setupSimpleFAQs();
        console.log('Simple FAQs initialized');
    }
});


console.log('=== END OF SCRIPT.JS ===');
