import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { COMMUNITIES } from '../components/Communities/communityData';

const isCommunityPage = (pathname: string) => COMMUNITIES.some(({ path }) => path === pathname);

function ScrollToTop() {
  const { pathname } = useLocation();
  const previous = useRef(pathname);

  useLayoutEffect(() => {
    const from = previous.current;
    previous.current = pathname;
    // Switching between the community pages (the pills) keeps your place on the page.
    if (isCommunityPage(from) && isCommunityPage(pathname)) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
