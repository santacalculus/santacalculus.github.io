// main.js
document.addEventListener('DOMContentLoaded', function() {
    const projectsGroup = document.querySelector('.curve2[data-curve-group="projects"]');
    const projectsPaths = projectsGroup.querySelectorAll('.curve2-path');
    const projectsText = projectsGroup.querySelector('.path-text');
    const hoverColor = getComputedStyle(document.documentElement).getPropertyValue('--menu-hover-color') || '#636363';
    const defaultColor = '#0C0404';
  
    // Function to handle color change
    function updatePathColors(color) {
      projectsPaths.forEach(path => {
        path.style.stroke = color;
      });
    }
  
    // Add mouse enter event listener to the group
    projectsGroup.addEventListener('mouseenter', () => {
      updatePathColors(hoverColor);
    });
  
    // Add mouse leave event listener to the group
    projectsGroup.addEventListener('mouseleave', () => {
      updatePathColors(defaultColor);
    });
  
    // Add hover effect for each path individually
    projectsPaths.forEach(path => {
      path.addEventListener('mouseenter', () => {
        updatePathColors(hoverColor);
      });
  
      path.addEventListener('mouseleave', (e) => {
        // Only reset if we're not still hovering over the group or another path
        if (!projectsGroup.matches(':hover')) {
          updatePathColors(defaultColor);
        }
      });
    });
  
    // Add hover effect for the text
    if (projectsText) {
      projectsText.style.cursor = 'pointer'; // Makes it clear the text is interactive
      
      projectsText.addEventListener('mouseenter', () => {
        updatePathColors(hoverColor);
        console.log("here");
      });
  
      projectsText.addEventListener('mouseleave', () => {
        // Only reset if we're not still hovering over the group or paths
        if (!projectsGroup.matches(':hover')) {
          updatePathColors(defaultColor);
        }
      });
    }
  });