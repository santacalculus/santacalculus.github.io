document.addEventListener('DOMContentLoaded', function () {
    // Select the panel content for the Filter FaceOff project
    const filterPanelContent = document.querySelector('#id_projfilter');
    
    if (!filterPanelContent) {
        console.error('Element with ID #id_projfilter not found!');
        return;
    }

    // Find the closest project panel
    const filterPanel = filterPanelContent.closest('.project-panel');

    if (!filterPanel) {
        console.error('Filter panel not found!');
        return;
    }

    // Add click event listener
    filterPanel.addEventListener('click', function (e) {
        // Prevent navigation if clicking on skill-label or links
        if (e.target.closest('.skill-label') || e.target.closest('a')) {
            return;
        }

        // Navigate to filter.html
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