import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Liste des chemins à exclure (peut être une route dynamique)
  const excludedPaths = [/^\/recipes\/\d+$/]; // regex qui matche /recipes/123

  const isExcluded = excludedPaths.some((pattern) => pattern.test(pathname));

  useEffect(() => {
    if (!isExcluded) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, isExcluded]);

  return null;
};

export default ScrollToTop;
