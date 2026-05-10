import {
  BADGE_ICON_URLS,
  cors,
  evalActive,
  getAvatarUrl,
  getHatCount,
  getIsR15,
  getRapAndItems,
  getRobloxBadges,
  getUser,
  getUserIdByUsername,
  hasPlaidHat,
  isVerified,
} from "./_shared.js";

function sendJson(res, payload, status = 200) {
  res.statusCode = status;
  for (const [key, value] of Object.entries({ "Content-Type": "application/json", ...cors })) {
    res.setHeader(key, value);
  }
  res.end(JSON.stringify(payload));
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    for (const [key, value] of Object.entries(cors)) res.setHeader(key, value);
    res.end();
    return;
  }
  if (req.method !== "POST") return sendJson(res, { ok: false, error: "Method not allowed" }, 405);

  const body = await readJsonBody(req).catch(() => ({}));
  const username = String(body.username || "").trim();
  if (!username || username.length > 50) return sendJson(res, { ok: false, error: "Invalid username" }, 400);

  const uid = await getUserIdByUsername(username);
  if (!uid) return sendJson(res, { ok: false, error: "User not found" }, 404);

  const user = await getUser(uid);
  if (!user) return sendJson(res, { ok: false, error: "Failed to fetch user info" }, 502);

  const [verified, isR15, plaid, rapData, badges, hats, avatar] = await Promise.all([
    isVerified(uid),
    getIsR15(uid),
    hasPlaidHat(uid),
    getRapAndItems(uid),
    getRobloxBadges(uid),
    getHatCount(uid),
    getAvatarUrl(uid),
  ]);

  const created = (user.created || "").slice(0, 10);
  const yearInt = created ? parseInt(created.slice(0, 4), 10) : null;
  const active = evalActive({
    username: user.name,
    displayName: user.displayName || "",
    isR15,
    hasPlaid: plaid,
    yearInt,
    rapUnknown: rapData.rap === 0 && rapData.items.length === 0,
    itemsEmpty: rapData.items.length === 0,
    defaultActiveOnNoSignals: true,
  });

  return sendJson(res, {
    ok: true,
    user_id: uid,
    username: user.name,
    display_name: user.displayName || user.name,
    created,
    rap: rapData.rap,
    hat_count: hats,
    verified,
    banned: !!user.isBanned,
    active,
    avatar_url: avatar,
    roblox_badges: badges.map((name) => ({ name, icon_url: BADGE_ICON_URLS[name] || "" })),
    rap_items: rapData.items,
  });
}
