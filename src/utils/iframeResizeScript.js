// Utility script to inject into iframes for height detection
// This script can be used when you have control over the iframe content

export const iframeResizeScript = `
(function() {
  'use strict';
  
  let lastHeight = 0;
  let timeoutId = null;
  
  function getContentHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
  }
  
  function sendHeight() {
    const height = getContentHeight();
    
    // Only send if height has changed significantly (avoid unnecessary updates)
    if (Math.abs(height - lastHeight) > 5) {
      lastHeight = height;
      
      try {
        window.parent.postMessage({
          type: 'iframe-resize',
          height: height,
          width: document.documentElement.scrollWidth || document.body.scrollWidth
        }, '*');
      } catch (e) {
        console.warn('Could not send height message to parent:', e);
      }
    }
  }
  
  function debouncedSendHeight() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(sendHeight, 100);
  }
  
  // Send height immediately if document is ready
  if (document.readyState === 'complete') {
    sendHeight();
  } else {
    window.addEventListener('load', sendHeight);
  }
  
  // Send height on content changes
  const observer = new MutationObserver(debouncedSendHeight);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });
  
  // Send height on window resize
  window.addEventListener('resize', debouncedSendHeight);
  
  // Send height when images load (common cause of height changes)
  document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.complete) {
        sendHeight();
      } else {
        img.addEventListener('load', sendHeight);
        img.addEventListener('error', sendHeight);
      }
    });
  });
  
  // Send height when forms change (for dynamic form content)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('change', debouncedSendHeight);
    form.addEventListener('input', debouncedSendHeight);
  });
  
  // Send height when CSS animations complete
  document.addEventListener('animationend', debouncedSendHeight);
  document.addEventListener('transitionend', debouncedSendHeight);
  
  // Periodic check as fallback
  setInterval(sendHeight, 2000);
  
  // Expose function for manual triggering
  window.iframeResizeTrigger = sendHeight;
})();
`;

// Function to inject the resize script into an iframe
export const injectIframeResizeScript = (iframe) => {
  if (!iframe || !iframe.contentWindow) return false;
  
  try {
    const iframeDoc = iframe.contentWindow.document;
    const script = iframeDoc.createElement('script');
    script.textContent = iframeResizeScript;
    script.type = 'text/javascript';
    
    if (iframeDoc.head) {
      iframeDoc.head.appendChild(script);
    } else {
      // If head doesn't exist yet, wait for it
      const checkHead = () => {
        if (iframeDoc.head) {
          iframeDoc.head.appendChild(script);
        } else {
          setTimeout(checkHead, 10);
        }
      };
      checkHead();
    }
    
    return true;
  } catch (e) {
    console.warn('Could not inject resize script into iframe:', e);
    return false;
  }
};

// Function to create a message handler for iframe resize events
export const createIframeResizeHandler = (setHeight, minHeight = 400, maxHeight = 2000) => {
  return (event) => {
    // Verify origin for security
    const allowedOrigins = [
      'https://forms.littlelives.com',
      'https://littlelives.com',
      window.location.origin
    ];
    
    if (!allowedOrigins.includes(event.origin)) {
      return;
    }
    
    if (event.data && typeof event.data === 'object') {
      if (event.data.type === 'iframe-resize' && typeof event.data.height === 'number') {
        const newHeight = Math.max(minHeight, Math.min(maxHeight, event.data.height));
        setHeight(newHeight);
      }
    }
  };
};
