// Nominated members. A name is admitted only if both parts match an entry here.
// Matching ignores case and extra spaces. Replace this list when the database is connected.
export const nominees = [
  { first: "Caleb", last: "Capoccia" },
  { first: "Lucas", last: "Chu" },
  { first: "Vihaan", last: "Gupta" },
  { first: "Lucas", last: "Chu" },
];

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function findNominee(first, last) {
  const f = normalize(first);
  const l = normalize(last);
  if (!f || !l) return null;
  return nominees.find((person) => normalize(person.first) === f && normalize(person.last) === l) ?? null;
}
