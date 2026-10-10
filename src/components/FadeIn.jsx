import { useEffect, useRef, useState } from 'react';

export default function FadeIn({ children, delay = 0, threshold = 0.15, className = '', as = 'div', style, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const Component = as;

  return (
    <Component
      ref={ref}
      className={`${className} fade-in-scroll ${isVisible ? 'is-visible' : ''}`}
      style={{ '--fade-delay': `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
}
