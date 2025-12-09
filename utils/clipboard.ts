/**
 * Copies text to the clipboard using the most reliable method available.
 * Handles fallback for environments where Clipboard API is restricted (e.g., iframes).
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Legacy fallback using document.execCommand
  const fallbackCopy = (text: string): boolean => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      
      // Ensure it's not visible but part of the DOM
      // We use fixed positioning to avoid scrolling to the bottom
      textArea.style.position = "fixed";
      textArea.style.left = "0";
      textArea.style.top = "0";
      textArea.style.opacity = "0";
      textArea.style.pointerEvents = "none";
      
      document.body.appendChild(textArea);
      
      textArea.focus({ preventScroll: true });
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      return successful;
    } catch (fallbackErr) {
      console.error('Fallback copy failed: ', fallbackErr);
      return false;
    }
  };

  try {
    // Try the modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    throw new Error('Clipboard API unavailable');
  } catch (err) {
    // If Clipboard API fails (NotAllowedError, etc.), use fallback
    // We don't log the error here to avoid console noise for expected permission blocks
    return fallbackCopy(text);
  }
}
