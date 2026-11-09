/**
 * The one easing curve for the whole site: a fast start that settles slowly
 * ("expo out"). Framer Motion takes the array; GSAP uses "expo.out", and CSS
 * uses var(--ease-out) from app/globals.css.
 */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
