import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('is-visible');
        }
      });
    };

    // Reveal on load
    revealOnScroll();

    // Reveal on scroll
    window.addEventListener('scroll', revealOnScroll);

    return () => {
      window.removeEventListener('scroll', revealOnScroll);
    };
  }, []);
}
