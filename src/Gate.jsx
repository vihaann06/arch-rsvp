import { useRef, useState } from "react";
import { findNominee } from "./nominees";

export function Gate({ onEnter }) {
  const cardRef = useRef(null);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [error, setError] = useState("");

  function shake() {
    const card = cardRef.current;
    if (!card) return;
    card.classList.remove("shake");
    void card.offsetWidth;
    card.classList.add("shake");
  }

  function submit(event) {
    event.preventDefault();
    if (!first.trim() || !last.trim()) {
      setError("Enter your first and last name.");
      shake();
      return;
    }
    const person = findNominee(first, last);
    if (!person) {
      setError("This name is not on the nomination list.");
      shake();
      return;
    }
    setError("");
    onEnter(person);
  }

  return (
    <main className="gate">
      <div className="gate-card" ref={cardRef}>
        <img className="gate-emblem" src="/emblem.png" alt="" />
        <h1 className="wordmark">Archimedes</h1>
        <p className="gate-sub">Harvard</p>
        <form onSubmit={submit} noValidate>
          <label className="field">
            <span>First name</span>
            <input
              name="given-name"
              autoComplete="given-name"
              autoCapitalize="words"
              spellCheck={false}
              value={first}
              onChange={(event) => setFirst(event.target.value)}
            />
          </label>
          <label className="field">
            <span>Last name</span>
            <input
              name="family-name"
              autoComplete="family-name"
              autoCapitalize="words"
              spellCheck={false}
              value={last}
              onChange={(event) => setLast(event.target.value)}
            />
          </label>
          <p className="form-error" role="alert">
            {error}
          </p>
          <button className="enter" type="submit">
            Enter
          </button>
        </form>
        <p className="gate-note">By nomination</p>
      </div>
    </main>
  );
}
