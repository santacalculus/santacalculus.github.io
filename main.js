// Handle horizontal scrolling for all pages
$(document).ready(function() {
    const container = $('.main-container');
    const SWIPE_MULTIPLIER = 1.5;
    
    // Enhanced touch state tracking
    let touchState = {
        isTouching: false,
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
        startScrollLeft: 0,
        isScrolling: false,
        touchStartTime: 0
    };

    // Ensure clean state between interactions
    function resetTouchState() {
        touchState = {
            isTouching: false,
            startX: 0,
            startY: 0,
            lastX: 0,
            lastY: 0,
            startScrollLeft: 0,
            isScrolling: false,
            touchStartTime: 0
        };
    }

    // Wheel handler
    container.on('wheel', function(event) {
        event.preventDefault();
        const delta = event.originalEvent.deltaY * SWIPE_MULTIPLIER;
        container.scrollLeft(container.scrollLeft() + delta);
    });

    // Enhanced touch start handler
    container.on('touchstart', function(e) {
        if (e.touches.length !== 1) return; // Only handle single touch
        
        const touch = e.touches[0];
        const now = Date.now();
        
        // Ensure minimum time between touch starts
        if (now - touchState.touchStartTime < 50) {
            e.preventDefault();
            return;
        }

        touchState = {
            isTouching: true,
            startX: touch.pageX,
            startY: touch.pageY,
            lastX: touch.pageX,
            lastY: touch.pageY,
            startScrollLeft: container.scrollLeft(),
            isScrolling: false,
            touchStartTime: now
        };

        // Remove any existing scroll behavior
        container.css({
            'scroll-behavior': 'auto',
            'pointer-events': 'none' // Prevent other events during scroll
        });
    });

    // Enhanced touch move handler
    container.on('touchmove', function(e) {
        if (!touchState.isTouching) return;

        const touch = e.touches[0];
        
        // Calculate deltas from both start and last position
        const deltaFromStart = {
            x: touchState.startX - touch.pageX,
            y: touchState.startY - touch.pageY
        };

        const deltaFromLast = {
            x: touchState.lastX - touch.pageX,
            y: touchState.lastY - touch.pageY
        };

        // Update last position
        touchState.lastX = touch.pageX;
        touchState.lastY = touch.pageY;

        // Determine scroll amount based on primary movement direction
        const absX = Math.abs(deltaFromStart.x);
        const absY = Math.abs(deltaFromStart.y);
        
        // Only start scrolling if we have a clear direction
        if (!touchState.isScrolling && (absX > 5 || absY > 5)) {
            touchState.isScrolling = true;
        }

        if (touchState.isScrolling) {
            let scrollDelta;
            if (absX > absY) {
                scrollDelta = deltaFromLast.x * SWIPE_MULTIPLIER;
            } else {
                scrollDelta = deltaFromLast.y * SWIPE_MULTIPLIER;
            }

            const currentScroll = container.scrollLeft();
            const newScrollLeft = currentScroll + scrollDelta;
            
            // Apply scroll with smooth interpolation
            requestAnimationFrame(() => {
                container.scrollLeft(newScrollLeft);
            });

            e.preventDefault();
            e.stopPropagation();
        }
    });

    // Enhanced touch end handler
    container.on('touchend touchcancel', function(e) {
        if (!touchState.isTouching) return;

        // Re-enable pointer events and smooth scrolling
        container.css({
            'scroll-behavior': 'smooth',
            'pointer-events': 'auto'
        });

        // Reset touch state with small delay
        setTimeout(resetTouchState, 50);
    });

    // Prevent unwanted document scrolling
    $(document).on('touchmove', function(e) {
        if (!$(e.target).closest('.main-container').length) {
            e.preventDefault();
        }
    });
});


// Initialize curves animation
$(document).ready(function() {
    const curves = document.querySelectorAll('.curve-path');
    
    // Initialize curves
    curves.forEach(curve => {
        const length = curve.getTotalLength();
        $(curve).css({
            'stroke-dasharray': length,
            'stroke-dashoffset': length,
            'opacity': 1,
            'transition': 'stroke 0.3s ease'
        });
    });

    // Animate all curves
    curves.forEach(curve => {
        const length = curve.getTotalLength();
        $(curve).animate({
            'stroke-dashoffset': 0
        }, {
            duration: 2000,
            easing: 'easeInOutQuart',
            queue: false
        });
    });
});

// Add jQuery easing function
$.easing.easeInOutQuart = function (x) {
    return x < 0.5 ?
        8 * x * x * x * x :
        1 - Math.pow(-2 * x + 2, 4) / 2;
};

// Set up hover effects
document.addEventListener('DOMContentLoaded', function() {
    const aboutGroup = document.querySelector('.curve1[data-curve-group="about"]');
    const aboutPaths = aboutGroup.querySelectorAll('.curve1-path');
    const aboutText = aboutGroup.querySelector('text');

    const projectsGroup = document.querySelector('.curve2[data-curve-group="projects"]');
    const projectsPaths = projectsGroup.querySelectorAll('.curve2-path');
    const projectsText = projectsGroup.querySelector('text');
    
    const photoGroup = document.querySelector('.curve3[data-curve-group="photography"]');
    const photoPaths = photoGroup.querySelectorAll('.curve3-path');
    const photoText = photoGroup.querySelector('text');

    const hoverColor = getComputedStyle(document.documentElement).getPropertyValue('--menu-hover-color') || '#636363';
    const defaultColor = '#0C0404';
    const greenColor = getComputedStyle(document.documentElement).getPropertyValue('--menu-select-color') || '#028940';
  
    function updatePathColors(paths, color) {
        paths.forEach(path => {
            $(path).css('stroke', color);
        });
    }

    function setupHoverEffects(group, paths, text, isAboutSection = false) {
        if (!group) return;
        const restingColor = isAboutSection ? greenColor : defaultColor;
        $(group).hover(
            function() { updatePathColors(paths, hoverColor); },
            function() { updatePathColors(paths, restingColor); }
        );

        if (text) {
            text.style.pointerEvents = 'auto';
            text.style.cursor = 'pointer';
            $(text).hover(
                function() { updatePathColors(paths, hoverColor); },
                function() {
                    if (!$(group).is(':hover')) {
                        updatePathColors(paths, restingColor);
                    }
                }
            );
        }
    }

    setupHoverEffects(aboutGroup, aboutPaths, aboutText, true);
    setupHoverEffects(projectsGroup, projectsPaths, projectsText);
    setupHoverEffects(photoGroup, photoPaths, photoText);
});

// Set up scrolling functionality
$(document).ready(function() {
    const projectsGroup = $('.curve2[data-curve-group="projects"]');
    const projectsPaths = projectsGroup.find('.curve2-path');
    const projectsText = projectsGroup.find('.path-text');
    
    const aboutGroup = $('.curve1[data-curve-group="about"]');
    const aboutPaths = aboutGroup.find('.curve1-path');
    const aboutText = aboutGroup.find('.path-text');
    
    const mainContainer = $('.main-container');

    function smoothScrollTo(targetElement) {
        const scrollPosition = targetElement.offset().left - mainContainer.offset().left + mainContainer.scrollLeft();
        mainContainer.animate({
            scrollLeft: scrollPosition
        }, {
            duration: 1000,
            easing: 'easeInOutQuart'
        });
    }

    function scrollToProjects(e) {
        e.preventDefault();
        const projectsSection = $('#id_projects');
        smoothScrollTo(projectsSection);
    }

    function scrollToAbout(e) {
        e.preventDefault();
        mainContainer.animate({
            scrollLeft: 0
        }, {
            duration: 1000,
            easing: 'easeInOutQuart'
        });
    }

    projectsGroup.on('click', scrollToProjects);
    projectsPaths.on('click', scrollToProjects);
    projectsText.on('click', scrollToProjects);
    
    aboutGroup.on('click', scrollToAbout);
    aboutPaths.on('click', scrollToAbout);
    aboutText.on('click', scrollToAbout);
    
    projectsGroup.css('cursor', 'pointer');
    projectsPaths.css('cursor', 'pointer');
    projectsText.css('cursor', 'pointer');
    
    aboutGroup.css('cursor', 'pointer');
    aboutPaths.css('cursor', 'pointer');
    aboutText.css('cursor', 'pointer');
    
    aboutGroup.find('.path-text').each(function() {
        if ($(this).text() === 'LIKHITHA CHINTAREDDY') {
            $(this).css('cursor', 'default');
            $(this).off('click');
        }
    });
});

// Set up intersection observer for skill labels
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                document.querySelectorAll('.skill-label').forEach((label, index) => {
                    label.style.setProperty('--delay', `${index * 100}ms`);
                    label.classList.add('highlight');
                });
            });
        } else {
            document.querySelectorAll('.skill-label').forEach(label => {
                label.classList.remove('highlight');
            });
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '50px'
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}




document.addEventListener('DOMContentLoaded', function() {
    // Check if we should scroll to projects section
    const shouldScrollToProjects = localStorage.getItem('scrollToProjects');
    
    if (shouldScrollToProjects === 'true') {
        // Clear the flag
        localStorage.removeItem('scrollToProjects');
        
        const mainContainer = document.querySelector('.main-container');
        const projectsSection = document.getElementById('id_projects');
        
        if (mainContainer && projectsSection) {
            // Small delay to ensure everything is loaded
            setTimeout(() => {
                const scrollPosition = projectsSection.offsetLeft;
                mainContainer.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});