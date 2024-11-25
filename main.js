// main.js

$(document).ready(function() {
    const curves = document.querySelectorAll('.curve-path');
    
    // Initialize curves
    curves.forEach(curve => {
        const length = curve.getTotalLength();
        $(curve).css({
            'stroke-dasharray': length,
            'stroke-dashoffset': length,
            'opacity': 1
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
            queue: false // Makes all animations start simultaneously
        });
    });
});

// Add jQuery easing function
$.easing.easeInOutQuart = function (x) {
    return x < 0.5 ?
        8 * x * x * x * x :
        1 - Math.pow(-2 * x + 2, 4) / 2;
};



document.addEventListener('DOMContentLoaded', function() {
    // Setup for About Me curve (curve 1)
    const aboutGroup = document.querySelector('.curve1[data-curve-group="about"]');
    const aboutPaths = aboutGroup.querySelectorAll('.curve1-path');
    const aboutText = aboutGroup.querySelector('text');

    // Setup for Projects/Research curve (curve 2)
    const projectsGroup = document.querySelector('.curve2[data-curve-group="projects"]');
    const projectsPaths = projectsGroup.querySelectorAll('.curve2-path');
    const projectsText = projectsGroup.querySelector('text');
    
    // Setup for Photography curve (curve 3)
    const photoGroup = document.querySelector('.curve3[data-curve-group="photography"]');
    const photoPaths = photoGroup.querySelectorAll('.curve3-path');
    const photoText = photoGroup.querySelector('text');

    const hoverColor = getComputedStyle(document.documentElement).getPropertyValue('--menu-hover-color') || '#636363';
    const defaultColor = '#0C0404';
    const greenColor = getComputedStyle(document.documentElement).getPropertyValue('--menu-select-color') || '#028940';
  
    // Function to handle color change for any set of paths
    function updatePathColors(paths, color) {
        paths.forEach(path => {
            path.style.stroke = color;
        });
    }

    // Function to setup hover effects for a group
    function setupHoverEffects(group, paths, text, isAboutSection = false) {
        if (!group) {
            console.log('Group not found:', group);
            return;
        }

        const restingColor = isAboutSection ? greenColor : defaultColor;

        // Group hover
        group.addEventListener('mouseenter', () => {
            updatePathColors(paths, hoverColor);
        });
        
        group.addEventListener('mouseleave', () => {
            updatePathColors(paths, restingColor);
        });

        // Individual path hover
        paths.forEach(path => {
            path.addEventListener('mouseenter', () => {
                updatePathColors(paths, hoverColor);
            });

            path.addEventListener('mouseleave', (e) => {
                if (!group.matches(':hover')) {
                    updatePathColors(paths, restingColor);
                }
            });
        });

        // Text hover
        if (text) {
            text.style.pointerEvents = 'auto';
            text.style.cursor = 'pointer';
            
            text.addEventListener('mouseenter', () => {
                updatePathColors(paths, hoverColor);
            });

            text.addEventListener('mouseleave', () => {
                if (!group.matches(':hover')) {
                    updatePathColors(paths, restingColor);
                }
            });
        }
    }

    // Setup hover effects for all curves
    setupHoverEffects(aboutGroup, aboutPaths, aboutText, true);  // Only call once for About section
    setupHoverEffects(projectsGroup, projectsPaths, projectsText);
    setupHoverEffects(photoGroup, photoPaths, photoText);
});