import { useEffect } from 'react';
import { Relay } from './relay.type';

const fetchInterceptorName = 'FETCH_INTERCEPTED';

export function useFetchApiListener(props: {
  onResponse: (data: { response: Relay.SearchResponse; url: string }) => void;
}) {
  useEffect(() => {
    const script_id = 'fetchinterceptor';
    if (document.getElementById(script_id)) return;

    const script = document.createElement('script');
    // Use the Chrome extension API to reference the file
    script.src = chrome.runtime.getURL('content-ui/injected-script.js');

    (document.head || document.documentElement).appendChild(script);

    // Listen for custom events from the injected script
    const fetchInterceptedListener = (event: any) => {
      props.onResponse(event.detail);
    };

    document.addEventListener(fetchInterceptorName, fetchInterceptedListener);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener(fetchInterceptorName, fetchInterceptedListener);
    };
  }, []);
}
