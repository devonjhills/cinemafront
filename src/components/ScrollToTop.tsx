import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
    }
  }, [pathname]);

  return null;
};
