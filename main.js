// main.js
document.addEventListener('DOMContentLoaded', function() {
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
  
    // Function to handle color change for any set of paths
    function updatePathColors(paths, color) {
        paths.forEach(path => {
            path.style.stroke = color;
        });
    }

    // Function to setup hover effects for a group
    function setupHoverEffects(group, paths, text) {
        if (!group) return;

        // Group hover
        group.addEventListener('mouseenter', () => {
            updatePathColors(paths, hoverColor);
        });
        
        group.addEventListener('mouseleave', () => {
            updatePathColors(paths, defaultColor);
        });

        // Individual path hover
        paths.forEach(path => {
            path.addEventListener('mouseenter', () => {
                updatePathColors(paths, hoverColor);
            });

            path.addEventListener('mouseleave', (e) => {
                if (!group.matches(':hover')) {
                    updatePathColors(paths, defaultColor);
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
                    updatePathColors(paths, defaultColor);
                }
            });
        }
    }

    // Setup hover effects for both curves
    setupHoverEffects(projectsGroup, projectsPaths, projectsText);
    setupHoverEffects(photoGroup, photoPaths, photoText);
});