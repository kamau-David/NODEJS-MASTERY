// When steps DON'T depend on each other, run them in PARALLEL, not sequentially.
function fetchWithDelay(name, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error(`${name} failed`));
      else resolve(`${name} done`);
    }, ms);
  });
}

async function demoAll() {
  console.log("--- Promise.all: fails fast if ANY promise rejects ---");
  try {
    const results = await Promise.all([
      fetchWithDelay("A", 100),
      fetchWithDelay("B", 200),
      fetchWithDelay("C", 150),
    ]);
    console.log("All succeeded:", results, "(took ~200ms, not 450ms - ran in parallel)");
  } catch (e) {
    console.log("Promise.all rejected:", e.message);
  }
}

async function demoAllSettled() {
  console.log("\n--- Promise.allSettled: waits for ALL, never rejects ---");
  const results = await Promise.allSettled([
    fetchWithDelay("D", 100),
    fetchWithDelay("E", 100, true), // this one fails
    fetchWithDelay("F", 100),
  ]);
  results.forEach((r) => console.log(r.status, r.value || r.reason.message));
}

async function demoRace() {
  console.log("\n--- Promise.race: resolves/rejects as soon as ONE settles ---");
  const result = await Promise.race([
    fetchWithDelay("Slow", 500),
    fetchWithDelay("Fast", 100),
  ]);
  console.log("Race winner:", result);
}

(async () => {
  await demoAll();
  await demoAllSettled();
  await demoRace();
})();
