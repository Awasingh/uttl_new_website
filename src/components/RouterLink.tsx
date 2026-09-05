import { useCallback, useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from "react";

export function navigateTo(to: string) {
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function useNavigate() {
  return useCallback(({ to }: { to: string }) => navigateTo(to), []);
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  activeProps?: { className?: string };
  children: ReactNode;
};

export function Link({ to, activeProps, onClick, children, className, ...props }: LinkProps) {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const isActive = currentPath === to;

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <a
      {...props}
      href={to}
      className={isActive && activeProps?.className ? activeProps.className : className}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        onClick?.(event);
        navigateTo(to);
      }}
    >
      {children}
    </a>
  );
}