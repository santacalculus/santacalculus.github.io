$(document).ready(function () {
    // About section elements
    const path2 = document.querySelector("#id_aboutpath2");
    const path3 = document.querySelector("#id_aboutpath3");
    const aboutText = document.querySelector("#id_abouttext");
    
    // Project section elements
    const projectPath1 = document.querySelector("#id_projectpath1");
    const projectPath2 = document.querySelector("#id_projectpath2");
    const projectText = document.querySelector("#id_projecttext");
    
    // Photography section elements
    const photoPath1 = document.querySelector("#id_photopath1");
    const photoPath2 = document.querySelector("#id_photopath2");
    const photoText = document.querySelector("#id_phototext");
    
    const mainContainer = document.querySelector(".main-container");
    const introSection = document.querySelector("#id_intro");
    const projectsSection = document.querySelector("#id_projects");
    
    // Add SVG element reference
    const svgElement = document.querySelector('.curves-svg');
    const compactViewBox = "0 -1 100 10";
    const expandedViewBox = "0 -1 100 13";
    
    const states = {
        aboutPath2: {
            start: "M26.3 2 L 35 2 C 45 2, 55 10, 65 10 L 67 10",
            end: "M26.3 2 L 35 2 C 45 2, 55 2, 65 2 L 67 2"
        },
        aboutPath3: {
            start: "M77 10 L 85 10 L 101 10",
            end: "M77 2 L 85 2 L 101 2"
        },
        projectPath1: {
            start: "M70.8 13 L 65 13 C 55 13, 45 5, 35 5 L -1 5",
            end: "M70.8 5 L 65 5 C 55 5, 45 5, 35 5 L -1 5"
        },
        projectPath2: {
            start: "M101 13 L 90.2 13",
            end: "M101 5 L 90.2 5"
        },
        photoPath1: {
            start: "M74.5 16 L 65 16 C 55 16, 45 8, 35 8 L -1 8",
            end: "M74.5 8 L 65 8 C 55 8, 45 8, 35 8 L -1 8"
        },
        photoPath2: {
            start: "M101 16 L 88.7 16",
            end: "M101 8 L 88.7 8"
        }
    };

    const tl = gsap.timeline({ 
        paused: true,
        ease: "power2.out"
    });
    
        // Move viewBox animation to start of timeline instead of 0.7

    tl.to(svgElement, {
        attr: { viewBox: compactViewBox },
        duration: 0.3,
        ease: "power2.inOut"
    }, 0.7);
    
    // About section animations
    tl.to(path2, {
        attr: { d: states.aboutPath2.end },
        duration: 1,
        ease: "power3.inOut"
    }, 0);
    
    tl.to(path3, {
        attr: { d: states.aboutPath3.end },
        duration: 1,
        ease: "power3.inOut"
    }, 0);
    
    tl.to(aboutText, {
        attr: { y: 2.2 },
        duration: 1,
        ease: "power3.inOut"
    }, 0);
    
    // Project section animations
    tl.to(projectPath1, {
        attr: { d: states.projectPath1.end },
        duration: 1,
        ease: "power3.inOut"
    }, 0);
    
    tl.to(projectPath2, {
        attr: { d: states.projectPath2.end },
        duration: 1,
        ease: "power3.inOut"
    }, 0);
    
    tl.to(projectText, {
        attr: { y: 5.2 },
        duration: 1,
        ease: "power3.inOut"
    }, 0);

    // Photography section animations
    tl.to(photoPath1, {
        attr: { d: states.photoPath1.end },
        duration: 1,
        ease: "power3.inOut"
    }, 0);
    
    tl.to(photoPath2, {
        attr: { d: states.photoPath2.end },
        duration: 1,
        ease: "power3.inOut"
    }, 0);
    
    tl.to(photoText, {
        attr: { y: 8.2 },
        duration: 1,
        ease: "power3.inOut"
    }, 0);

    function calculateProgress() {
        const currentScroll = mainContainer.scrollLeft;
        const projectsOffset = projectsSection.offsetLeft;
        const totalDistance = projectsOffset;
        const progress = currentScroll / totalDistance;
        return gsap.utils.clamp(0, 1, progress);
    }

    mainContainer.addEventListener("scroll", function() {
        const progress = calculateProgress();
        const easedProgress = gsap.parseEase("power2.out")(progress);
        
        // If we're starting to scroll back, immediately expand the viewBox
        if (progress < 1 && progress > 0) {
            gsap.set(svgElement, { 
                attr: { viewBox: expandedViewBox }
            });
        }
        
        tl.progress(easedProgress);
        
        if (mainContainer.scrollLeft === 0) {
            gsap.set(svgElement, { 
                attr: { viewBox: expandedViewBox }
            });
            
            // Reset to curved state
            gsap.set(path2, { attr: { d: states.aboutPath2.start }});
            gsap.set(path3, { attr: { d: states.aboutPath3.start }});
            gsap.set(aboutText, { attr: { y: 10.2 }});
            
            gsap.set(projectPath1, { attr: { d: states.projectPath1.start }});
            gsap.set(projectPath2, { attr: { d: states.projectPath2.start }});
            gsap.set(projectText, { attr: { y: 13.2 }});
            
            gsap.set(photoPath1, { attr: { d: states.photoPath1.start }});
            gsap.set(photoPath2, { attr: { d: states.photoPath2.start }});
            gsap.set(photoText, { attr: { y: 16.2 }});
            
            tl.progress(0);
        }
    });
    
    window.addEventListener('resize', function() {
        const progress = calculateProgress();
        tl.progress(progress);
    });
});







$(document).ready(function() {
    const projectPath1 = document.querySelector("#id_projectpath1");
    const projectPath2 = document.querySelector("#id_projectpath2");
    const mainContainer = $('.main-container');
    const projectsSection = $('#id_projects');

    // Create yellow path overlays
    const yellowPath1 = projectPath1.cloneNode();
    const yellowPath2 = projectPath2.cloneNode();
    
    // Set paths
    yellowPath1.setAttribute('d', "M70.8 5 L 65 5 C 55 5, 45 5, 35 5 L -1 5");
    yellowPath2.setAttribute('d', "M101 5 L 90.2 5");
    
    // Style yellow paths
    yellowPath1.style.stroke = "#E2B244";
    yellowPath2.style.stroke = "#E2B244";
    yellowPath1.style.strokeWidth = getComputedStyle(projectPath1).strokeWidth;
    yellowPath2.style.strokeWidth = getComputedStyle(projectPath2).strokeWidth;
    
    // // Make original black paths slightly thinner
    // projectPath1.style.strokeWidth = "1.6px";
    // projectPath2.style.strokeWidth = "1.6px";
    
    // Initially hide yellow paths
    yellowPath1.style.opacity = 0;
    yellowPath2.style.opacity = 0;
    
    // Calculate lengths
    const length1 = yellowPath1.getTotalLength();
    const length2 = yellowPath2.getTotalLength();
    
    // Set up dash pattern
    yellowPath1.style.strokeDasharray = `${length1} ${length1}`;
    yellowPath2.style.strokeDasharray = `${length2} ${length2}`;
    yellowPath1.style.strokeDashoffset = length1;
    yellowPath2.style.strokeDashoffset = length2;
    
    // Ensure proper layering
    const projectGroup = projectPath1.parentElement;
    projectGroup.insertBefore(yellowPath1, projectPath1);
    projectGroup.insertBefore(yellowPath2, projectPath2);

    function updateProgress() {
        const projectsSectionStart = projectsSection.offset().left - mainContainer.offset().left;
        const totalScrollWidth = mainContainer[0].scrollWidth - mainContainer.width();
        const scrollableWidthAfterProjects = totalScrollWidth - projectsSectionStart;
        const currentScroll = mainContainer.scrollLeft() - projectsSectionStart;
        
        // Calculate base progress
        let progress = Math.max(0, Math.min(1, currentScroll / scrollableWidthAfterProjects));
        
        if (mainContainer.scrollLeft() < projectsSectionStart) {
            // Reset everything when before projects section
            yellowPath1.style.opacity = 0;
            yellowPath2.style.opacity = 0;
            projectPath1.style.opacity = 1;
            projectPath2.style.opacity = 1;
        } else {
            // Divide the animation into three phases:
            // 1. (0-0.2) Black paths fade out
            // 2. (0.2-0.6) First yellow path fills
            // 3. (0.6-1.0) Second yellow path fills
            
            // Phase 1: Black paths fade out (0-20% of scroll)
            const fadeOutProgress = Math.min(1, progress * 10); // 5 = 1/0.2
            projectPath1.style.opacity = Math.max(0, 1 - fadeOutProgress);
            projectPath2.style.opacity = Math.max(0, 1 - fadeOutProgress);
            
            // Phase 2: First yellow path fills (10-60% of scroll)
            if (progress > 0.1) {
                yellowPath1.style.opacity = 1;
                const firstPathProgress = Math.min(1, (progress - 0.1) * 2); // 2 = 1/0.5 for 50% duration
                yellowPath1.style.strokeDashoffset = -length1 * (1 - easeProgress(firstPathProgress));
            }
            
            // Phase 3: Second yellow path fills (60-100% of scroll)
            if (progress > 0.6) {
                yellowPath2.style.opacity = 1;
                const secondPathProgress = Math.min(1, (progress - 0.6) * 2.5); // 2.5 = 1/0.4
                yellowPath2.style.strokeDashoffset = -length2 * (1 - easeProgress(secondPathProgress));
            }
        }
    }
    
    // Easing function for smoother animation
    function easeProgress(progress) {
        return progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    }

    // Add scroll event listener
    mainContainer.on('scroll', updateProgress);
    
    // Initial update
    updateProgress();
});