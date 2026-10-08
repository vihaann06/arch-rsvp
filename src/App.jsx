import { useCallback, useState } from "react";
import { Gate } from "./Gate";
import { Welcome } from "./Welcome";
import { Home } from "./Home";
import { findNominee } from "./nominees";
import { clearSession, loadSession, saveSession } from "./storage";

function restoreMember() {
  const saved = loadSession();
  if (!saved) return null;
  return findNominee(saved.first, saved.last);
}

export default function App() {
  const [member, setMember] = useState(restoreMember);
  const [stage, setStage] = useState(() => (restoreMember() ? "home" : "gate"));

  function enter(person) {
    saveSession(person);
    setMember(person);
    setStage("welcome");
  }

  function leave() {
    clearSession();
    setMember(null);
    setStage("gate");
  }

  const finishWelcome = useCallback(() => setStage("home"), []);

  const inside = stage === "welcome" || stage === "home";

  return (
    <>
      <div className="grain" aria-hidden="true" />
      {stage === "gate" && <Gate onEnter={enter} />}
      {member && inside && <Home member={member} onLeave={leave} covered={stage === "welcome"} />}
      {member && stage === "welcome" && <Welcome member={member} onDone={finishWelcome} />}
    </>
  );
}
