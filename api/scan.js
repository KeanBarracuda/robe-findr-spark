import {
  cors,
  evalActive,
  getAvatarUrl,
  getHatCount,
  getIsR15,
  getRapAndItems,
  getRobloxBadges,
  getUser,
  hasPlaidHat,
  isVerified,
  json,
  pickRandomId,
  usernameMatchesMethod,
  yearIntFromCreated,
} from "./_shared.js";

async function scanOne(uid, req) {
  const user = await getUser(uid);
  if (!user) return null;

  const username = user.name;
  const match = usernameMatchesMethod(username, req.method || "random");
  if (!match.ok) return null;

  const banned = !!user.isBanned;
  if (req.ban_filter === "Only not banned" && banned) return null;
  if (req.ban_filter === "Only banned" && !banned) return null;

  const [verified, isR15, plaid, rapData, badges, hats, avatar] = await Promise.all([
    isVerified(uid),
    getIsR15(uid),
    hasPlaidHat(uid),
    getRapAndItems(uid),
    getRobloxBadges(uid),
    getHatCount(uid),
    getAvatarUrl(uid),
  ]);

  if (req.verified_filter === "Only verified" && !verified) return null;
  if (req.verified_filter === "Only unverified" && verified) return null;
  if (typeof req.rap_min === "number" && rapData.rap < req.rap_min) return null;
  if (typeof req.hat_min === "number" && hats < req.hat_min) return null;

  if (req.required_badges?.length) {
    for (const badge of req.required_badges) if (!badges.includes(badge)) return null;
  }

  const created = (user.created || "").slice(0, 10);
  const active = evalActive({
    username,
    displayName: user.displayName || "",
    isR15,
    hasPlaid: plaid,
    yearInt: yearIntFromCreated(user.created || ""),
    rapUnknown: rapData.rap === 0 && rapData.items.length === 0,
    itemsEmpty: rapData.items.length === 0,
    defaultActiveOnNoSignals: false,
  });

  if (req.active_filter === "Only active" && !active) return null;
  if (req.active_filter === "Only inactive" && active) return null;

  return {
    user_id: uid,
    username,
    display_name: user.displayName || username,
    created,
    rap: rapData.rap,
    hat_count: hats,
    verified,
    banned,
    active,
    avatar_url: avatar,
    roblox_badges: badges,
    rap_items: rapData.items,
  };
}

function sortResults(arr, sort) {
  if (!sort || sort === "None") return arr;
  const sorted = [...arr];
  switch (sort) {
    case "Username A→Z": sorted.sort((a, b) => a.username.localeCompare(b.username)); break;
    case "Username Z→A": sorted.sort((a, b) => b.username.localeCompare(a.username)); break;
    case "ID low→high": sorted.sort((a, b) => a.user_id - b.user_id); break;
    case "ID high→low": sorted.sort((a, b) => b.user_id - a.user_id); break;
    case "Created oldest→newest": sorted.sort((a, b) => a.created.localeCompare(b.created)); break;
    case "Created newest→oldest": sorted.sort((a, b) => b.created.localeCompare(a.created)); break;
    case "RAP high→low": sorted.sort((a, b) => b.rap - a.rap); break;
    case "RAP low→high": sorted.sort((a, b) => a.rap - b.rap); break;
    case "Verified Yes first": sorted.sort((a, b) => Number(b.verified) - Number(a.verified)); break;
    case "Verified No first": sorted.sort((a, b) => Number(a.verified) - Number(b.verified)); break;
    case "Banned Yes first": sorted.sort((a, b) => Number(b.banned) - Number(a.banned)); break;
    case "Banned No first": sorted.sort((a, b) => Number(a.banned) - Number(b.banned)); break;
    case "Active Yes first": sorted.sort((a, b) => Number(b.active) - Number(a.active)); break;
    case "Active No first": sorted.sort((a, b) => Number(a.active) - Number(b.active)); break;
  }
  return sorted;
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: cors });
}

export async function POST(request) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const start = Date.now();
  const req = await request.json().catch(() => null);
  if (!req) return json({ error: "Invalid JSON" }, 400);

  const year = req.year || "Any year";
  const batch = Math.max(5, Math.min(req.batch_size ?? 30, 60));
  const ids = Array.from({ length: batch }, () => pickRandomId(year));
  const settled = await Promise.allSettled(ids.map((uid) => scanOne(uid, req)));
  const results = [];
  for (const item of settled) {
    if (item.status === "fulfilled" && item.value) results.push(item.value);
  }

  return json({
    results: sortResults(results, req.sort),
    scanned: ids.length,
    matched: results.length,
    elapsed_seconds: (Date.now() - start) / 1000,
  });
}
