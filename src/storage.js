const SESSION = "archimedes-session";

export function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data?.first || !data?.last) return null;
    return { first: data.first, last: data.last };
  } catch {
    return null;
  }
}

export function saveSession(member) {
  sessionStorage.setItem(SESSION, JSON.stringify({ first: member.first, last: member.last }));
}

export function clearSession() {
  sessionStorage.removeItem(SESSION);
}

function rsvpKey(member) {
  return `archimedes-rsvp:${member.first.toLowerCase()}|${member.last.toLowerCase()}`;
}

export function loadRsvp(member) {
  try {
    const raw = localStorage.getItem(rsvpKey(member));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveRsvp(member) {
  const record = {
    first: member.first,
    last: member.last,
    round: 1,
    confirmedAt: new Date().toISOString(),
  };
  localStorage.setItem(rsvpKey(member), JSON.stringify(record));
  return record;
}
