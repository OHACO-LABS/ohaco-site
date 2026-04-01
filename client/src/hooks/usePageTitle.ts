import { useEffect } from 'react';

const BASE_TITLE = 'OHACO';

/** Set the document title on mount, reset on unmount */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE_TITLE}` : `${BASE_TITLE} — Our House Arts Collective`;
    return () => {
      document.title = `${BASE_TITLE} — Our House Arts Collective`;
    };
  }, [title]);
}
