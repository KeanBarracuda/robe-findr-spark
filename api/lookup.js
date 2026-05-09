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
  json,
} from "./_shared.js";

export const config = { runtime: "edge" };
export const runtime = "edge";

export default async function handler(request) {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (request.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  const body = await request.json().catch(() => ({}));
  const username = String(body.username || "").trim();
  if (!username || username.length > 50) return json({ ok: false, error: "Invalid username" }, 400);

  const uid = await getUserIdByUsername(username);
  if (!uid) return json({ ok: false, error: "User not found" }, 404);

  const user = await getUser(uid);
  if (!user) return json({ ok: false, error: "Failed to fetch user info" }, 502);

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

  return json({
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
