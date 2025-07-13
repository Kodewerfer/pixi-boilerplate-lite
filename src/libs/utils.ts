export function getWindowDimensions() {
  // Check for browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('Window object is not defined');
  }
  
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}