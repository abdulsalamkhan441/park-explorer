export async function fetchParkData() {
  const res = await fetch("/parkData.json");
  if (!res.ok) {
    throw new Error("Failed to load park data");
  }
  return await res.json();
}