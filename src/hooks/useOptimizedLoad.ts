import { useEffect, useState } from 'react';

export function useOptimizedLoad() {
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Carrega componentes pesados após o initial load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { isClient, isVisible };
}
