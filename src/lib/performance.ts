/**
 * Utilitários de performance para componentes light
 */

// Preload de imagens críticas
export function preloadImage(src: string) {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
}

// Lazy load de componentes com Intersection Observer
export function lazyLoadComponent(
  element: HTMLElement,
  callback: () => void,
  options?: IntersectionObserverInit
) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(entry.target);
      }
    });
  }, options);

  observer.observe(element);
  return observer;
}

// Otimização de fontes
export function optimizeFonts() {
  if (typeof window === 'undefined') return;

  // Font Face Observer alternativo simples
  document.fonts.ready.then(() => {
    document.documentElement.classList.add('fonts-loaded');
  });
}

// Reduzir reflows
export function batchDOM(callback: () => void) {
  if (typeof window === 'undefined') return;

  requestAnimationFrame(() => {
    callback();
  });
}

// Cache de dados
const cache = new Map<string, any>();

export function memoize<T>(key: string, factory: () => T): T {
  if (!cache.has(key)) {
    cache.set(key, factory());
  }
  return cache.get(key);
}
