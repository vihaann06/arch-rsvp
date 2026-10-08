import { useEffect } from "react";

export function Welcome({ member, onDone }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(onDone, reduce ? 600 : 2700);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="welcome" role="status" aria-live="polite">
      <div className="welcome-inner">
        <p className="welcome-kicker">Archimedes</p>
        <h1 className="welcome-title">
          Welcome, <em>{member.first}</em>
        </h1>
        <div className="welcome-rule" aria-hidden="true" />
      </div>
    </div>
  );
}
