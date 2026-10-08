import { useState } from "react";
import { loadRsvp, saveRsvp } from "./storage";

export function Home({ member, onLeave, covered }) {
  const [rsvp, setRsvp] = useState(() => loadRsvp(member));

  function confirm(event) {
    event.preventDefault();
    if (rsvp) return;
    setRsvp(saveRsvp(member));
  }

  return (
    <div className={covered ? "page is-covered" : "page"} inert={covered ? true : undefined}>
      <header className="nav">
        <div className="brand">
          <img src="/emblem.png" alt="" />
          <span>Archimedes</span>
        </div>
        <div className="nav-actions">
          <span className="who">
            {member.first} {member.last}
          </span>
          <button className="text-btn" type="button" onClick={onLeave}>
            Sign out
          </button>
        </div>
      </header>

      <main className="frame">
        <div className="frame-copy">
          <h1>
            Devoted to Harvard’s <em>innovators, founders, and disruptors.</em>
          </h1>
          <p className="summary">
            Archimedes is a brotherhood for high-agency individuals who want to be a part of something bigger than themselves.
          <br />
            Our core pillars are agency and kindness: pioneering, risk-taking, and controlling one’s own actions in the world.
          </p>
        </div>

        <div className="frame-rsvp">
          <button
            className={rsvp ? "rsvp-btn is-confirmed" : "rsvp-btn"}
            type="button"
            onClick={confirm}
            disabled={Boolean(rsvp)}
            aria-pressed={Boolean(rsvp)}
          >
            {rsvp ? "Confirmed for Round 1" : "RSVP for Round 1"}
          </button>
          <p className="rsvp-note">{rsvp ? "Your place is held." : "Round 1 is open to nominated members."}</p>
        </div>
      </main>
    </div>
  );
}
