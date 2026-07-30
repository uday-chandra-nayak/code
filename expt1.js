const users = [
  { id: 101, name: " Ada ", scores: [10, 20, 30] },
  { id: 102, name: "", scores: [5, 0, 15] },
  { id: 103, name: null, scores: [7, 14] },
  { id: 104, /* name missing on purpose */ scores: [3, 3, 3, 3] },
  { id: 105, name: "Grace", scores: [] }
];

// ---------- Functions ----------

// 1. normalizeName
function normalizeName(value) {
  if (value === null || value === undefined || (typeof value === "string" && value.trim() === "")) {
    return "Unknown";
  }
  return value.trim();
}

// 2. averageScore
function averageScore(scores) {
  if (!Array.isArray(scores)) {
    throw new Error("scores must be an array");
  }
  if (scores.length === 0) {
    return null;
  }
  const sum = scores.reduce((total, score) => total + score, 0);
  const average = sum / scores.length;
  return Math.round(average * 100) / 100;
}

// 3. buildUserSummary
function buildUserSummary(user) {
  if (typeof user !== "object" || user === null) {
    throw new Error("user must be an object");
  }

  const scores = Array.isArray(user.scores) ? user["scores"] : [];

  return {
    id: user.id,
    name: normalizeName(user.name),
    scoreCount: scores.length,
    avg: averageScore(scores)
  };
}

// 4. summarizeUsers
function summarizeUsers(userArray) {
  if (!Array.isArray(userArray)) {
    throw new Error("userArray must be an array");
  }
  return userArray.map(buildUserSummary);
}

// 5. safeSummarizeUsers
function safeSummarizeUsers(userArray) {
  try {
    const data = summarizeUsers(userArray);
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

// 6. getUserDisplayNameById
function getUserDisplayNameById(userArray, id) {
  if (!Array.isArray(userArray)) {
    throw new Error("userArray must be an array");
  }
  if (typeof id !== "number") {
    throw new Error("id must be a number");
  }

  const found = userArray.find(user => user.id === id);
  if (!found) {
    throw new Error("user not found");
  }

  return normalizeName(found.name);
}


console.log(normalizeName(" Ada "));
console.log(normalizeName("   "));                 
console.log(normalizeName(null));                  
console.log(averageScore([10, 20, 30]));           
console.log(averageScore([]));                     

console.log(buildUserSummary(users[0]));           
console.log(buildUserSummary(users[3]));           

console.log(safeSummarizeUsers(users).ok);         
console.log(getUserDisplayNameById(users, 105));   
console.log(safeSummarizeUsers("not an array"));   