document.addEventListener('DOMContentLoaded', function () {
    // Handle Filter FaceOff project panel
    const filterPanelContent = document.querySelector('#id_projfilter');
    if (filterPanelContent) {
        const filterPanel = filterPanelContent.closest('.project-panel');
        if (filterPanel) {
            // Add click event listener
            filterPanel.addEventListener('click', function (e) {
                if (e.target.closest('.skill-label') || e.target.closest('a')) {
                    return;
                }
                window.location.href = 'filter.html';
            });
            // Add keyboard accessibility
            filterPanel.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = 'filter.html';
                }
            });
            // Add accessibility attributes
            filterPanel.setAttribute('role', 'button');
            filterPanel.setAttribute('tabindex', '0');
            filterPanel.setAttribute('aria-label', 'View Filter FaceOff project details');
        }
    }

    // Handle Research project panel
    const researchPanelContent = document.querySelector('#id_projint');
    if (researchPanelContent) {
        const researchPanel = researchPanelContent.closest('.project-panel');
        if (researchPanel) {
            // Add click event listener
            researchPanel.addEventListener('click', function (e) {
                if (e.target.closest('.skill-label') || e.target.closest('a')) {
                    return;
                }
                window.location.href = 'research.html';
            });
            // Add keyboard accessibility
            researchPanel.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = 'research.html';
                }
            });
            // Add accessibility attributes
            researchPanel.setAttribute('role', 'button');
            researchPanel.setAttribute('tabindex', '0');
            researchPanel.setAttribute('aria-label', 'View Research project details');
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get all skill labels within this project panel
                const labels = entry.target.querySelectorAll('.skill-label');
                labels.forEach((label, index) => {
                    // Add delay based on index
                    setTimeout(() => {
                        label.classList.add('highlight');
                    }, index * 100);
                });
            } else {
                // Remove highlight when out of view
                const labels = entry.target.querySelectorAll('.skill-label');
                labels.forEach(label => {
                    label.classList.remove('highlight');
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    // Observe each project panel
    document.querySelectorAll('.project-panel').forEach(panel => {
        observer.observe(panel);
    });
});



// // Replace the existing observer code with this optimized version
// const observerOptions = {
//     threshold: 0.2,
//     rootMargin: '50px' // Pre-load before section is visible
// };

// function handleIntersection(entries) {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             requestAnimationFrame(() => {
//                 const labels = document.querySelectorAll('.skill-label');
//                 labels.forEach((label, index) => {
//                     label.style.setProperty('--delay', `${index * 100}ms`);
//                     label.classList.add('highlight');
//                 });
//             });
//         } else {
//             document.querySelectorAll('.skill-label').forEach(label => {
//                 label.classList.remove('highlight');
//             });
//         }
//     });
// }

// // Update scroll handlers
// $(document).ready(function() {
//     const mainContainer = $('.main-container');
//     let ticking = false;

//     function onScroll() {
//         if (!ticking) {
//             requestAnimationFrame(() => {
//                 if (typeof updateProgress === 'function') {
//                     updateProgress();
//                 }
//                 ticking = false;
//             });
//             ticking = true;
//         }
//     }

//     // Replace existing scroll handler with optimized version
//     mainContainer.off('scroll').on('scroll', onScroll);

//     // Preload project images
//     function preloadProjectImages() {
//         const images = document.querySelectorAll('#id_projects img');
//         images.forEach(img => {
//             if (img.src) {
//                 const preloadLink = document.createElement('link');
//                 preloadLink.rel = 'preload';
//                 preloadLink.as = 'image';
//                 preloadLink.href = img.src;
//                 document.head.appendChild(preloadLink);
//             }
//         });
//     }

//     // Initialize
//     const projectsSection = document.getElementById('id_projects');
//     if (projectsSection) {
//         const existingObserver = new IntersectionObserver(handleIntersection, observerOptions);
//         existingObserver.observe(projectsSection);
//         preloadProjectImages();
//     }
// });







// Start observing the projects section
// const projectsSection = document.getElementById('id_projects');
// if (projectsSection) {
//     observer.observe(projectsSection);
// }