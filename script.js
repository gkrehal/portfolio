const caseMenus = document.querySelectorAll('.case-menu');

caseMenus.forEach((menu) => {
    const links = Array.from(menu.querySelectorAll('a[href^="#"]'));

    if (!links.length) {
        return;
    }

    const sections = links
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const setActiveLink = (activeLink) => {
        links.forEach((link) => {
            link.classList.toggle('active', link === activeLink);
        });
    };

    links.forEach((link) => {
        link.addEventListener('click', () => {
            setActiveLink(link);
        });
    });

    if (!sections.length) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) {
            return;
        }

        const activeSection = visibleEntries[0].target;
        const activeLink = links.find((link) => {
            return link.getAttribute('href') === `#${activeSection.id}`;
        });

        if (activeLink) {
            setActiveLink(activeLink);
        }
    }, {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    sections.forEach((section) => observer.observe(section));
});
