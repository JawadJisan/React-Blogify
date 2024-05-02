export function formatDate(createdAt) {
  const date = new Date(createdAt);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
