// components/DynamicIframeContainer.jsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { injectIframeResizeScript, createIframeResizeHandler } from '@/utils/iframeResizeScript';

const DynamicIframeContainer = ({ src, minHeight = 400, maxHeight = 2000 }) => {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(minHeight);
  const [isLoading, setIsLoading] = useState(true);
  const resizeObserverRef = useRef(null);

  // Function to handle postMessage from iframe using utility
  const handleMessage = useCallback((event) => {
    const handler = createIframeResizeHandler(setContainerHeight, minHeight, maxHeight);
    handler(event);
    // Also set loading to false when we receive a message
    if (event.data && event.data.type === 'iframe-resize') {
      setIsLoading(false);
    }
  }, [minHeight, maxHeight]);

  // Function to try direct content access (same-origin)
  const tryDirectAccess = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return false;

    try {
      const iframeDoc = iframe.contentWindow.document;
      const bodyHeight = iframeDoc.body.scrollHeight;
      const documentHeight = iframeDoc.documentElement.scrollHeight;
      const contentHeight = Math.max(bodyHeight, documentHeight);
      
      if (contentHeight > 0) {
        const newHeight = Math.max(minHeight, Math.min(maxHeight, contentHeight));
        setContainerHeight(newHeight);
        setIsLoading(false);
        return true;
      }
    } catch (e) {
      // Cross-origin or other access issues
      // console.log('Direct iframe access not available (cross-origin)');
    }
    return false;
  }, [minHeight, maxHeight]);

  // Function to estimate height based on iframe dimensions
  const estimateHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Try to get iframe's natural height
    const iframeHeight = iframe.offsetHeight;
    if (iframeHeight > 0) {
      const newHeight = Math.max(minHeight, Math.min(maxHeight, iframeHeight));
      setContainerHeight(newHeight);
    }
  }, [minHeight, maxHeight]);

  // Function to inject resize script into iframe using utility
  const injectResizeScript = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    
    return injectIframeResizeScript(iframe);
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Add message listener for postMessage communication
    window.addEventListener('message', handleMessage);

    const handleLoad = () => {
      setIsLoading(true);
      
      // Try different methods to get height
      setTimeout(() => {
        if (!tryDirectAccess()) {
          // If direct access fails, try to inject resize script
          injectResizeScript();
          
          // Fallback: estimate height after a delay
          setTimeout(() => {
            if (isLoading) {
              estimateHeight();
              setIsLoading(false);
            }
          }, 2000);
        }
      }, 500);
    };

    const handleResize = () => {
      if (!isLoading) {
        tryDirectAccess() || estimateHeight();
      }
    };

    // Set up event listeners
    iframe.addEventListener('load', handleLoad);
    window.addEventListener('resize', handleResize);

    // Set up ResizeObserver for container changes
    if (window.ResizeObserver) {
      resizeObserverRef.current = new ResizeObserver(() => {
        if (!isLoading) {
          tryDirectAccess() || estimateHeight();
        }
      });
      resizeObserverRef.current.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('resize', handleResize);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [src, handleMessage, tryDirectAccess, injectResizeScript, estimateHeight, isLoading]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: `${containerHeight}px`, 
        overflow: 'hidden',
        transition: 'height 0.3s ease-in-out',
        position: 'relative'
      }}
    >
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}>
          <div>Loading form...</div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={src}
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none',
          opacity: isLoading ? 0.5 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
        title="Dynamic Form"
        loading="lazy"
      />
    </div>
  );
};

export default DynamicIframeContainer;