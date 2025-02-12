document.addEventListener('DOMContentLoaded', function() {
    // Add click handler to the entire header
    const header = document.querySelector('.header');
    
    if (header) {
        header.style.cursor = 'pointer';
        
        // Handle click anywhere in the header
        header.addEventListener('click', function(e) {
            // Store flag to indicate we should scroll to projects
            localStorage.setItem('scrollToProjects', 'true');
            // Navigate back to index.html
            window.location.href = 'index.html';
        });

        // Prevent navigation when clicking the name
        const nameText = header.querySelector('.text-wrapper text[x="16"]');
        if (nameText) {
            nameText.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
});







window.addEventListener('load', () => {
    const paths = document.querySelectorAll('.projects-path');
    const mainContainer = document.querySelector('.main-container');
    
    let totalLength = 0;
    paths.forEach(path => {
        totalLength += path.getTotalLength();
    });

    // Set initial state for all paths
    paths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length} ${length}`;
        path.style.strokeDashoffset = length;
        // Add initialized class after setting up the animation properties
        path.classList.add('initialized');
    });

    // Function to update path drawing based on scroll progress
    function updatePathProgress() {
        // Get scroll progress relative to container
        const maxScroll = mainContainer.scrollWidth - mainContainer.clientWidth;
        const scrollPosition = mainContainer.scrollLeft;
        const scrollPercentage = scrollPosition / maxScroll;

        let lengthSoFar = 0;
        
        // Update each path based on its portion of the total length
        paths.forEach(path => {
            const pathLength = path.getTotalLength();
            const pathProgress = Math.max(0, Math.min(1, 
                (scrollPercentage * totalLength - lengthSoFar) / pathLength
            ));
            
            path.style.strokeDashoffset = pathLength * (1 - pathProgress);
            lengthSoFar += pathLength;
        });
    }

    // Add scroll event listener to main container
    mainContainer.addEventListener('scroll', () => {
        requestAnimationFrame(updatePathProgress);
    });

    // Initial update
    updatePathProgress();
});

const embedColors = ["#EE352E", "#00933C", "#B933AD", "#0039A6", "#FF6319", "#6CBE45", "#996633", "#A7A9AC", "#FCCC0A"];  

// Get all elements with the embed-link class
const elements = document.querySelectorAll('.embed-link');

// Set initial colors based on section
elements.forEach(element => {
    const inResearchSection = element.closest('#id_research, #id_prototyping, #id_about, #id_findings');
    element.style.color = inResearchSection ? '#000000' : '#FFFFFF';
});

// Add hover event listeners to each element
elements.forEach(element => {
    let elementColorIndex = 0;
    
    element.addEventListener('mouseenter', function() {
        element.style.color = embedColors[elementColorIndex];
        elementColorIndex = (elementColorIndex + 1) % embedColors.length;
    });

    element.addEventListener('mouseleave', function() {
        const inResearchSection = element.closest('#id_research, #id_prototyping, #id_about, #id_findings');
        element.style.color = inResearchSection ? '#000000' : '#FFFFFF';
    });
});


// code for the emphasis class i.e. highlight effect
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get all emphasis elements within the section
                const emphasisElements = entry.target.querySelectorAll('.emphasis');
                
                // Reset any existing animations first
                emphasisElements.forEach(el => {
                    el.classList.remove('animate');
                });
                
                // Add animation with slight delay to ensure proper reset
                setTimeout(() => {
                    emphasisElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('animate');
                        }, index * 200);
                    });
                }, 50);
            } else {
                // Remove animation class when out of view
                const emphasisElements = entry.target.querySelectorAll('.emphasis');
                emphasisElements.forEach(el => {
                    el.classList.remove('animate');
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    // Observe all sections that contain emphasis elements
    const sectionsWithEmphasis = document.querySelectorAll('section:has(.emphasis)');
    sectionsWithEmphasis.forEach(section => {
        observer.observe(section);
    });
});