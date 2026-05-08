const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36";
const TIMEOUT_MS = 5000;
const VERIFIED_BADGE_ASSET_ID = 102611803;

export const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const YEAR_ID_RANGES = {
  "Any year": [1, 9000000000],
  "2006": [1, 11386],
  "2007": [11387, 141897],
  "2008": [141898, 1892311],
  "2009": [1892312, 5881290],
  "2010": [5881291, 13901944],
  "2011": [13901945, 22797639],
  "2012": [22797640, 36347234],
  "2013": [36347235, 53530394],
  "2014": [53530395, 75524130],
  "2015": [75524131, 103531549],
  "2016": [103531550, 205441141],
  "2017": [205441142, 478149931],
  "2018": [478149932, 915267179],
  "2019": [915267180, 1390794501],
  "2020": [1390794502, 2259402999],
  "2021": [2259403000, 3193391431],
  "2022": [3193391432, 4195844718],
  "2023": [4195844712, 5402010909],
  "2024": [5402010910, 7794159194],
  "2025": [7794159195, 9000000000],
};

export const BADGE_ICON_URLS = {
  "Combat Initiation": "https://images.rbxcdn.com/8d77254fc1e6d904fd3ded29dfca28cb.png",
  Warrior: "https://images.rbxcdn.com/0a010c31a8b482731114810590553be3.png",
  Bloxxer: "https://images.rbxcdn.com/139a7b3acfeb0b881b93a40134766048.png",
  "Official Model Maker": "https://images.rbxcdn.com/45710972c9c8d556805f8bee89389648.png",
  Bricksmith: "https://images.rbxcdn.com/49f3d30f5c16a1c25ea0f97ea8ef150e.png",
  Homestead: "https://images.rbxcdn.com/b66bc601e2256546c5dd6188fce7a8d1.png",
  Inviter: "https://images.rbxcdn.com/01044aca1d917eb20bfbdc5e25af1294.png",
  Ambassador: "https://images.rbxcdn.com/b853909efc7fdcf590363d01f5894f09.png",
  Friendship: "https://images.rbxcdn.com/5eb20917cf530583e2641c0e1f7ba95e.png",
  Veteran: "https://images.rbxcdn.com/b7e6cabb5a1600d813f5843f37181fa3.png",
  Administrator:
    "https://static.wikia.nocookie.net/roblox/images/d/d1/Administrator_Badge_2025.png/revision/latest/scale-to-width-down/45?cb=20250508073352",
  "Welcome To The Club": "https://images.rbxcdn.com/6c2a598114231066a386fa716ac099c4.png",
};

const FIRST_NAME_TOKENS = new Set([
  "aaron","abraham","adam","adrian","adriano","albert","alex","alexander","alfie","alfred",
  "alejandro","alonso","anderson","andres","angel","anton","armando","arthur","augusto",
  "austin","alan","barry","ben","benjamin","benny","benito","bradley","brandon","brian","bruce",
  "bruno","caleb","callum","cameron","caio","carlos","cesar","charles","chester","christian",
  "christopher","connor","cristian","daan","damian","daniel","danilo","darwin","danny","davi","david",
  "declan","dennis","dexter","diego","dirk","dominic","donald","douglas","dylan","eddy",
  "eduardo","edmund","edward","elijah","elliot","elliott","emmanuel","enrique","eric",
  "ernesto","esteban","ethan","eugene","evan","everton","fabian","felipe","fernando","filipe",
  "francis","francisco","frederick","freddy","fraser","gabriel","garrett","garry","gareth",
  "george","gonzalo","graham","gregory","grayson","guido","guillermo","guilherme","hamish",
  "harold","harry","harvey","hayden","hector","henrique","henry","howard","hugh","hugo",
  "ignacio","isaac","isaiah","ivan","jack","jackson","jacob","jaime","jamal","james","jared",
  "jason","javier","jelle","jenson","jeremiah","jeremy","jesper","jesus","joao","joaquin",
  "joel","joey","john","johnny","jimmy","johnathan","jonathan","jorge","jordan","jose",
  "jonas","joseph","josh","joshua","juan","julian","julio","justin","kaden","kauan","kees",
  "keith","kenneth","kenny","kevin","kelvin","kieran","kyle","kylan","larry","laurence",
  "lawrence","leandro","leo","leon","leonard","lewis","liam","logan","lorenzo","louis","luca",
  "luis","lucas","luciano","luke","lukey","luan","maarten","malcolm","manuel","marco",
  "marcus","mariano","mark","martin","mateo","mateus","matt","matthew","max","michael",
  "mikey","miguel","mitchell","monty","murilo","nathan","nick","nicholas","nicolas","niall",
  "nigel","noah","oliver","ollie","orlando","oscar","osvaldo","otavio","owen","parker",
  "patrick","paul","pedro","percival","philip","piers","preston","quinton","rafa","rafael",
  "ramon","raul","raymond","reinier","renato","reuben","ricardo","richard","ricky","robert",
  "rodrigo","ronald","ryan","salvador","sam","samuel","santiago","sebastian","sergio","seth",
  "simon","spencer","stanley","stephen","steven","stuart","sven","tanner","thiago","timmy",
  "terry","theodore","thomas","timothy","tobias","tomas","tommy","travis","trevor","tristan",
  "tyler","valentin","vicente","victor","vincent","vinicius","walter","wesley","weslley",
  "wilfred","will","william","wyatt","xander","xavier","zach","zachariah","zachary",
  "abigail","adela","adriana","aisling","alejandra","alicia","alexandra","alexis","aline",
  "alyssa","amanda","amber","amelia","amelie","ana","anastasia","andrea","angelica",
  "angelina","ann","anita","anna","annabelle","ariana","ashley","aubrey","audrey","autumn",
  "ava","avery","barbara","baylee","beatrice","beatriz","bella","beth","bethany","bianca",
  "blair","brenda","brianna","bridget","brooke","bruna","camila","camilla","carla","carmen",
  "caroline","carolina","cassandra","catherine","cecilia","charlotte","chloe","claire",
  "clara","clarissa","colette","consuelo","courtney","cressida","daniela","danielle",
  "daphne","delilah","diana","dorothy","eduarda","eleanor","elena","elisa","eliza",
  "elisabeth","elizabeth","ella","elsie","emily","emma","erica","estelle","eva","faith",
  "fatima","felicia","fernanda","fiona","florence","freya","gabriella","genevieve","georgia",
  "giovanna","giselle","gloria","grace","hailey","hannah","harper","heather","helena","holly",
  "imogen","ines","ingrid","irene","isabel","isabella","isadora","isidora","isla","ivy",
  "jasmine","jemima","jennifer","jessica","jill","joanna","jocelyn","josephine","julia",
  "julie","kaitlyn","karina","kate","katherine","katrina","kayla","kaylee","kendall",
  "kendra","kristen","larissa","laura","lauren","leah","leticia","liliana","lillian","linda",
  "lisa","lola","lorena","lorelei","lucia","luciana","lucy","luana","luisa","lydia",
  "madeline","magdalena","madison","magnolia","maisie","maria","marcela","mariana","marie",
  "marissa","margaret","martina","mary","matilda","megan","melanie","melissa","michelle",
  "millie","miranda","monica","monserrat","nadia","naomi","natalia","natalie","nicole","nina",
  "nora","olivia","paige","paloma","paola","patricia","penelope","pilar","priscilla",
  "rachel","rafaela","rebecca","renata","rocio","rosa","rosalie","rosanna","roxanne",
  "sabrina","samantha","sarah","savannah","scarlett","selena","serena","sharon","silvia",
  "sofia","soledad","sophia","stella","stephanie","susan","tamara","tania","taylor","teresa",
  "thais","tiffany","theodora","theresa","valentina","valeria","valerie","vanessa",
  "veronica","victoria","violet","vitoria","wendy","ximena","yasmin","yasmine","yesenia",
  "zoey","ari","ash","ashton","bailey","billy","blake","bluey","casey","charlie","chris",
  "cris","dakota","dani","devon","drew","eden","eli","ellis","finley","frances","harley",
  "jamie","jay","justice","kai","kit","lalo","lennon","marley","micah","morgan","nico",
  "peyton","phoenix","quinn","reese","remington","robin","ross","rory","rowan","riley",
  "rubin","sasha","sawyer","skyler","sterling","sydney","toby","whitney"
]);

export function json(res, status = 200) {
  return new Response(JSON.stringify(res), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

async function fetchJson(url, init) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const r = await fetch(url, {
      ...init,
      signal: ctrl.signal,
      headers: { "User-Agent": UA, Accept: "application/json", ...(init?.headers || {}) },
    });
    if (!r.ok) return { ok: false, status: r.status };
    const data = await r.json().catch(() => null);
    return { ok: true, status: r.status, data };
  } catch {
    return { ok: false, status: 0 };
  } finally {
    clearTimeout(t);
  }
}

export async function getUser(uid) {
  const r = await fetchJson(`https://users.roblox.com/v1/users/${uid}`);
  if (!r.ok || !r.data) return null;
  return {
    id: r.data.id,
    name: r.data.name,
    displayName: r.data.displayName,
    created: r.data.created,
    description: r.data.description,
    isBanned: !!r.data.isBanned,
  };
}

export async function getUserIdByUsername(username) {
  const r = await fetchJson("https://users.roblox.com/v1/usernames/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usernames: [username], excludeBannedUsers: false }),
  });
  if (!r.ok || !r.data?.data?.length) return null;
  return r.data.data[0].id ?? null;
}

export async function isVerified(uid) {
  const r = await fetchJson(
    `https://inventory.roblox.com/v1/users/${uid}/items/Asset/${VERIFIED_BADGE_ASSET_ID}`,
  );
  return !!(r.ok && Array.isArray(r.data?.data) && r.data.data.length > 0);
}

export async function getIsR15(uid) {
  const r = await fetchJson(`https://avatar.roblox.com/v1/users/${uid}/avatar`);
  if (!r.ok || !r.data) return null;
  const rig = String(r.data.playerAvatarType ?? r.data.rigType ?? "").trim().toUpperCase();
  if (rig === "R15") return true;
  if (rig === "R6") return false;
  return null;
}

export async function hasPlaidHat(uid) {
  const r = await fetchJson(
    `https://inventory.roblox.com/v1/users/${uid}/items/Asset/${VERIFIED_BADGE_ASSET_ID}`,
  );
  if (!r.ok) return null;
  return Array.isArray(r.data?.data) && r.data.data.length > 0;
}

export async function getAvatarUrl(uid) {
  const r = await fetchJson(
    `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${uid}&size=150x150&format=Png&isCircular=false`,
  );
  if (!r.ok || !r.data?.data?.length) return "";
  return r.data.data[0].imageUrl || "";
}

export async function getRapAndItems(uid) {
  let total = 0;
  let cursor = "";
  const items = [];
  for (let page = 0; page < 3; page++) {
    const url = `https://inventory.roblox.com/v1/users/${uid}/assets/collectibles?sortOrder=Asc&limit=100${
      cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""
    }`;
    const r = await fetchJson(url);
    if (!r.ok || !r.data) return { rap: 0, items: [] };
    for (const it of r.data.data ?? []) {
      const rap = typeof it.recentAveragePrice === "number" ? it.recentAveragePrice : 0;
      total += rap;
      items.push({ name: it.name ?? "", assetId: it.assetId, rap });
    }
    if (!r.data.nextPageCursor) break;
    cursor = r.data.nextPageCursor;
  }
  return { rap: total, items };
}

export async function getRobloxBadges(uid) {
  const r = await fetchJson(`https://accountinformation.roblox.com/v1/users/${uid}/roblox-badges`);
  if (!r.ok || !Array.isArray(r.data)) return [];
  return r.data.map((b) => b.name).filter(Boolean);
}

export async function getHatCount(uid) {
  let total = 0;
  let cursor = "";
  for (let page = 0; page < 5; page++) {
    const params = new URLSearchParams({ limit: "100", sortOrder: "Desc" });
    if (cursor) params.set("cursor", cursor);
    const r = await fetchJson(`https://inventory.roblox.com/v2/users/${uid}/inventory/8?${params.toString()}`);
    if (!r.ok || !r.data) return total;
    total += (r.data.data ?? []).length;
    if (!r.data.nextPageCursor) break;
    cursor = r.data.nextPageCursor;
  }
  return total;
}

export function evalActive(args) {
  const distinctDisplay = !!args.displayName.trim() && args.displayName !== args.username;
  const oldPrivateInv = args.yearInt !== null && args.yearInt <= 2014 && args.rapUnknown && args.itemsEmpty;

  if (args.hasPlaid === true) return true;
  if (distinctDisplay) return true;
  if (oldPrivateInv) return true;
  if (args.isR15 === false) return true;
  if (args.isR15 === true) return false;
  return !!args.defaultActiveOnNoSignals;
}

const isDigit = (ch) => ch >= "0" && ch <= "9";
const isAlpha = (ch) => /^[a-zA-Z]$/.test(ch);

function countTrailingDigits(s) {
  let c = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (isDigit(s[i])) c++;
    else break;
  }
  return c;
}

function endsInExactNDigits(uname, n) {
  if (uname.length < n) return false;
  const tail = uname.slice(-n);
  for (const ch of tail) if (!isDigit(ch)) return false;
  if (uname.length > n && isDigit(uname[uname.length - n - 1])) return false;
  return true;
}

export function usernameMatchesMethod(username, method) {
  const uname = username;
  const lower = uname.toLowerCase();

  if (method === "random") return { ok: true, reason: "method=random" };
  if (method === "numberless") {
    const hasDigit = [...uname].some(isDigit);
    return hasDigit ? { ok: false, reason: "contains digits" } : { ok: true, reason: "no digits" };
  }
  if (method === "numbers") {
    const hasDigit = [...uname].some(isDigit);
    return hasDigit ? { ok: true, reason: "has digit" } : { ok: false, reason: "no digits" };
  }
  if (method === "ends_in_123") {
    return uname.endsWith("123") ? { ok: true, reason: "ends with 123" } : { ok: false, reason: "no 123" };
  }
  if (method === "ends_in_1_digit") return endsInExactNDigits(uname, 1) ? { ok: true, reason: "ends in 1 digit" } : { ok: false, reason: "" };
  if (method === "ends_in_2_digits") return endsInExactNDigits(uname, 2) ? { ok: true, reason: "ends in 2 digits" } : { ok: false, reason: "" };
  if (method === "ends_in_4_digits") return endsInExactNDigits(uname, 4) ? { ok: true, reason: "ends in 4 digits" } : { ok: false, reason: "" };
  if (method === "4digits_real_name") {
    const trailing = countTrailingDigits(lower);
    if (trailing !== 4) return { ok: false, reason: "need exactly 4 trailing digits" };
    const namePart = lower.slice(0, -4);
    if (!namePart || ![...namePart].every(isAlpha)) return { ok: false, reason: "name part not pure letters" };
    if (!FIRST_NAME_TOKENS.has(namePart)) return { ok: false, reason: `'${namePart}' not a real name` };
    return { ok: true, reason: `real name '${namePart}' + 4 digits` };
  }
  if (method === "year") {
    if (uname.length < 4) return { ok: false, reason: "too short" };
    const last4 = uname.slice(-4);
    if (![...last4].every(isDigit)) return { ok: false, reason: "no 4-digit tail" };
    if (uname.length > 4 && isDigit(uname[uname.length - 5])) return { ok: false, reason: "more than 4 trailing digits" };
    const year = parseInt(last4, 10);
    if (year >= 1970 && year <= 2017) return { ok: true, reason: `year ${year}` };
    return { ok: false, reason: `year ${year} out of range` };
  }
  if (method === "double") {
    if (!uname.length || !isDigit(uname[uname.length - 1])) return { ok: false, reason: "must end with digits" };
    const digitsLen = countTrailingDigits(uname);
    if (digitsLen < 1) return { ok: false, reason: "no trailing digits" };
    const core = uname.slice(0, -digitsLen);
    const letterRepeat = core.match(/([A-Za-z]{3,})\1/);
    if (letterRepeat) return { ok: true, reason: `repeated '${letterRepeat[1]}'` };
    const digitRepeat = core.match(/(\d{2})\1/);
    if (digitRepeat) return { ok: true, reason: `repeated '${digitRepeat[1]}'` };
    return { ok: false, reason: "no repeated chunk" };
  }
  if (method === "double_real_name") {
    let i = lower.length;
    while (i > 0 && isDigit(lower[i - 1])) i--;
    const base = lower.slice(0, i);
    const lettersOnly = [...base].filter(isAlpha).join("");
    if (!lettersOnly) return { ok: false, reason: "no letters" };
    for (const name of FIRST_NAME_TOKENS) {
      if (lettersOnly === name + name) return { ok: true, reason: `doubled real name '${name}'` };
    }
    return { ok: false, reason: "not a doubled real name" };
  }
  if (method === "real_name") {
    let endingType;
    if (lower.endsWith("123")) {
      endingType = "123";
    } else {
      const trailing = countTrailingDigits(lower);
      if (trailing < 2 || trailing > 4) return { ok: false, reason: `${trailing} trailing digits (need 2–4 or '123')` };
      endingType = `${trailing}_digits`;
    }
    const lettersOnly = [...lower].filter(isAlpha).join("");
    if (!lettersOnly) return { ok: false, reason: "no letters" };
    const allHits = [];
    for (const name of FIRST_NAME_TOKENS) {
      let start = 0;
      while (true) {
        const idx = lettersOnly.indexOf(name, start);
        if (idx === -1) break;
        allHits.push({ name, start: idx, end: idx + name.length });
        start = idx + 1;
      }
    }
    if (!allHits.length) return { ok: false, reason: "no name token" };
    allHits.sort((a, b) => b.end - b.start - (a.end - a.start));
    const n = lettersOnly.length;
    const covered = new Array(n).fill(false);
    const tokens = new Set();
    for (const { name, start, end } of allHits) {
      let newCov = false;
      for (let i = start; i < end; i++) if (!covered[i]) { newCov = true; break; }
      if (!newCov) continue;
      for (let i = start; i < Math.min(end, n); i++) covered[i] = true;
      tokens.add(name);
    }
    if (!tokens.size) return { ok: false, reason: "no token contributed" };
    let extra = 0;
    for (let i = 0; i < n; i++) if (!covered[i]) extra++;
    if (extra < 1) return { ok: false, reason: `extra_letters=${extra}` };
    return { ok: true, reason: `tokens=${[...tokens].sort()} +${extra} letters, ${endingType}` };
  }
  if (method === "nonstop") return { ok: true, reason: "nonstop" };
  return { ok: true, reason: "fallback" };
}

export function pickRandomId(year) {
  const range = YEAR_ID_RANGES[year] ?? YEAR_ID_RANGES["Any year"];
  const [lo, hi] = range;
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

export function yearIntFromCreated(created) {
  if (!created) return null;
  const y = parseInt(created.slice(0, 4), 10);
  return Number.isFinite(y) ? y : null;
}
