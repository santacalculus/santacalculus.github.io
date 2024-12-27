// Handle horizontal scrolling for all pages
$(document).ready(function() {
    const container = $('.main-container');
    const SWIPE_MULTIPLIER = 1.2;
    
    let touchState = {
        isTouching: false,
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
        startScrollLeft: 0
    };

    // Convert any wheel direction to horizontal scroll
    container.on('wheel', function(event) {
        event.preventDefault();
        // Use whichever delta is larger (vertical or horizontal)
        const delta = Math.abs(event.originalEvent.deltaY) > Math.abs(event.originalEvent.deltaX) 
            ? event.originalEvent.deltaY 
            : event.originalEvent.deltaX;
        container.scrollLeft(container.scrollLeft() + delta);
    });

    // Capture touch start
    container.on('touchstart', function(e) {
        if (e.touches.length !== 1) return;
        
        const touch = e.touches[0];
        touchState = {
            isTouching: true,
            startX: touch.pageX,
            startY: touch.pageY,
            lastX: touch.pageX,
            lastY: touch.pageY,
            startScrollLeft: container.scrollLeft()
        };
    });

    // Convert any touch movement to horizontal scroll
    container.on('touchmove', function(e) {
        if (!touchState.isTouching) return;
        e.preventDefault();

        const touch = e.touches[0];
        
        // Calculate deltas for both directions
        const deltaX = touchState.lastX - touch.pageX;
        const deltaY = touchState.lastY - touch.pageY;
        
        // Use the larger delta to determine scroll amount
        const primaryDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
        
        // Update last positions
        touchState.lastX = touch.pageX;
        touchState.lastY = touch.pageY;

        // Apply the scroll
        requestAnimationFrame(() => {
            container.scrollLeft(container.scrollLeft() + (primaryDelta * SWIPE_MULTIPLIER));
        });
    });

    container.on('touchend touchcancel', function() {
        touchState.isTouching = false;
    });

    // Prevent default scrolling behavior on the container
    $(document).on('touchmove', function(e) {
        if ($(e.target).closest('.main-container').length) {
            e.preventDefault();
        }
    }, { passive: false });
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

