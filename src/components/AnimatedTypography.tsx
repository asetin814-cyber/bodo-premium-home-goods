import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

// Premium Bezier easing alias for GSAP
const PREMIUM_EASE = "power4.out";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
  type?: 'char' | 'word';
  animateState?: 'hidden' | 'visible';
  onAnimationComplete?: () => void;
}

export const AnimatedHeading = ({ 
  text, 
  className = "", 
  delay = 0, 
  as: Component = 'h2', 
  type = 'word',
  animateState,
  onAnimationComplete
}: AnimatedHeadingProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll(type === 'char' ? '.animate-char' : '.animate-word');
    if (!targets.length) return;

    gsap.killTweensOf(targets);

    if (type === 'char') {
      gsap.set(targets, {
        opacity: 0,
        y: 40,
        filter: 'blur(12px)',
        rotationX: 8,
        scale: 0.96,
        transformOrigin: "center bottom"
      });
    } else {
      gsap.set(targets, {
        opacity: 0,
        y: 20,
        filter: 'blur(4px)',
      });
    }

    const runHeadingAnimation = () => {
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        rotationX: 0,
        scale: 1,
        duration: type === 'char' ? 0.85 : 0.7,
        stagger: type === 'char' ? 0.025 : 0.06,
        delay: delay,
        ease: PREMIUM_EASE,
        onComplete: onAnimationComplete
      });
    };

    if (animateState) {
      if (animateState === 'visible') {
        runHeadingAnimation();
      }
    } else {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          runHeadingAnimation();
          observer.unobserve(el);
        }
      }, { threshold: 0.1 });
      observer.observe(el);
      return () => observer.unobserve(el);
    }
  }, [text, delay, type, animateState]);

  const items = type === 'char' ? Array.from(text) : text.split(' ');

  return (
    <Component ref={containerRef} className={`${className} inline-block`} style={type === 'char' ? { perspective: "1000px" } : undefined}>
      {items.map((item, index) => (
        <span
          key={index}
          className={type === 'char' ? 'animate-char inline-block' : 'animate-word inline-block mr-[0.25em] last:mr-0'}
          style={{ 
            whiteSpace: (type === 'char' && item === ' ') ? 'pre' : 'normal',
            willChange: 'transform, opacity, filter'
          }}
        >
          {item}
        </span>
      ))}
    </Component>
  );
};

interface AnimatedH1Props {
  text: string;
  className?: string;
  delay?: number;
  animateState?: 'hidden' | 'visible';
  onAnimationComplete?: () => void;
}

export const AnimatedH1 = ({ text, className = "", delay = 0, animateState, onAnimationComplete }: AnimatedH1Props) => {
  return (
    <AnimatedHeading 
      text={text} 
      className={className} 
      delay={delay} 
      as="h1" 
      type="char" 
      animateState={animateState} 
      onAnimationComplete={onAnimationComplete} 
    />
  );
};

interface AnimatedH2Props {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedH2 = ({ text, className = "", delay = 0 }: AnimatedH2Props) => {
  return <AnimatedHeading text={text} className={className} delay={delay} as="h2" type="word" />;
};

interface AnimatedWordProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedWord = ({ text, className = "", delay = 0 }: AnimatedWordProps) => {
  return <AnimatedHeading text={text} className={className} delay={delay} as="span" type="word" />;
};

interface AnimatedCharactersProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedCharacters = ({ text, className = "", delay = 0 }: AnimatedCharactersProps) => {
  return <AnimatedHeading text={text} className={className} delay={delay} as="span" type="char" />;
};

interface AnimatedParagraphProps {
  text: string;
  className?: string;
  delay?: number;
  animateState?: 'hidden' | 'visible';
}

export const AnimatedParagraph = ({ 
  text, 
  className = "", 
  delay = 0,
  animateState
}: AnimatedParagraphProps) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reset element content to original text so SplitType has a clean starting point
    el.innerText = text;

    let typeSplit: SplitType | null = null;
    try {
      typeSplit = new SplitType(el, { types: 'lines' });
    } catch (e) {
      console.warn("SplitType failed, falling back to sentence split", e);
    }

    const lines = typeSplit?.lines || [];
    
    if (!lines.length) {
      gsap.killTweensOf(el);
      gsap.set(el, { opacity: 0, y: 15 });
      gsap.to(el, { opacity: 1, y: 0, duration: 0.6, delay, ease: PREMIUM_EASE });
      return;
    }

    gsap.killTweensOf(lines);
    gsap.set(lines, {
      opacity: 0,
      y: 15,
    });

    const runParagraphAnimation = () => {
      gsap.to(lines, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        delay: delay,
        ease: PREMIUM_EASE,
      });
    };

    if (animateState) {
      if (animateState === 'visible') {
        runParagraphAnimation();
      }
    } else {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          runParagraphAnimation();
          observer.unobserve(el);
        }
      }, { threshold: 0.1 });
      observer.observe(el);
      return () => {
        observer.unobserve(el);
        if (typeSplit) typeSplit.revert();
      };
    }

    return () => {
      if (typeSplit) typeSplit.revert();
    };
  }, [text, delay, animateState]);

  return (
    <p ref={containerRef} className={className} style={{ position: 'relative' }}>
      {text}
    </p>
  );
};

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animateState?: 'hidden' | 'visible';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id?: string;
}

export const AnimatedButton = ({ 
  children, 
  className = "", 
  delay = 0, 
  animateState,
  onClick,
  id,
  ...props 
}: AnimatedButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    const icons = el.querySelectorAll('svg');
    const texts = el.querySelectorAll('.btn-txt-span');

    gsap.killTweensOf([el, icons, texts]);

    // Initial states
    gsap.set(el, { opacity: 0, scale: 0.95 });
    if (icons.length) gsap.set(icons, { opacity: 0, scale: 0.5, x: -10 });
    if (texts.length) gsap.set(texts, { opacity: 0, y: 10 });

    const runBtnTimeline = () => {
      const tl = gsap.timeline({ delay: delay });
      
      tl.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: PREMIUM_EASE
      });
      
      if (icons.length) {
        tl.to(icons, {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.4,
          ease: "back.out(1.5)"
        }, "-=0.25");
      }
      
      if (texts.length) {
        tl.to(texts, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: PREMIUM_EASE
        }, "-=0.2");
      }
    };

    if (animateState) {
      if (animateState === 'visible') {
        runBtnTimeline();
      }
    } else {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          runBtnTimeline();
          observer.unobserve(el);
        }
      }, { threshold: 0.1 });
      observer.observe(el);
      return () => observer.unobserve(el);
    }
  }, [delay, animateState, children]);

  const renderChildren = (node: React.ReactNode): React.ReactNode => {
    return React.Children.map(node, (child) => {
      if (!child) return child;
      if (typeof child === 'string' || typeof child === 'number') {
        return <span className="btn-txt-span inline-block">{child}</span>;
      }
      if (React.isValidElement(child)) {
        if (child.props.children) {
          return React.cloneElement(child, {
            ...child.props,
            children: renderChildren(child.props.children)
          });
        }
        return child;
      }
      return child;
    });
  };

  return (
    <button
      ref={buttonRef}
      className={className}
      onClick={onClick}
      id={id}
      style={{ willChange: 'transform, opacity' }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 w-full h-full">
        {renderChildren(children)}
      </span>
    </button>
  );
};

interface AnimatedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animateState?: 'hidden' | 'visible';
  href?: string;
  target?: string;
  rel?: string;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const AnimatedLink = ({ 
  children, 
  className = "", 
  delay = 0, 
  animateState,
  href,
  target,
  rel,
  id,
  onClick,
  ...props 
}: AnimatedLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = linkRef.current;
    if (!el) return;

    const icons = el.querySelectorAll('svg');
    const texts = el.querySelectorAll('.btn-txt-span');

    gsap.killTweensOf([el, icons, texts]);

    // Initial states
    gsap.set(el, { opacity: 0, scale: 0.95 });
    if (icons.length) gsap.set(icons, { opacity: 0, scale: 0.5, x: -10 });
    if (texts.length) gsap.set(texts, { opacity: 0, y: 10 });

    const runLinkTimeline = () => {
      const tl = gsap.timeline({ delay: delay });
      
      tl.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: PREMIUM_EASE
      });
      
      if (icons.length) {
        tl.to(icons, {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.4,
          ease: "back.out(1.5)"
        }, "-=0.25");
      }
      
      if (texts.length) {
        tl.to(texts, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: PREMIUM_EASE
        }, "-=0.2");
      }
    };

    if (animateState) {
      if (animateState === 'visible') {
        runLinkTimeline();
      }
    } else {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          runLinkTimeline();
          observer.unobserve(el);
        }
      }, { threshold: 0.1 });
      observer.observe(el);
      return () => observer.unobserve(el);
    }
  }, [delay, animateState, children]);

  const renderChildren = (node: React.ReactNode): React.ReactNode => {
    return React.Children.map(node, (child) => {
      if (!child) return child;
      if (typeof child === 'string' || typeof child === 'number') {
        return <span className="btn-txt-span inline-block">{child}</span>;
      }
      if (React.isValidElement(child)) {
        if (child.props.children) {
          return React.cloneElement(child, {
            ...child.props,
            children: renderChildren(child.props.children)
          });
        }
        return child;
      }
      return child;
    });
  };

  return (
    <a
      ref={linkRef}
      className={className}
      href={href}
      target={target}
      rel={rel}
      id={id}
      onClick={onClick}
      style={{ willChange: 'transform, opacity' }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 w-full h-full">
        {renderChildren(children)}
      </span>
    </a>
  );
};
