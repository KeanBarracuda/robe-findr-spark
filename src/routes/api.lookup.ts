import { createFileRoute } from "@tanstack/react-router";
import { BADGE_ICON_URLS, type LookupResponse } from "@/lib/rfinder-data";
import {
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
} from "@/lib/roblox.server";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/lookup")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: cors }),
      POST: async ({ request }) => {
        const json = (await request.json().catch(() => ({}))) as { username?: string };
        const username = (json.username || "").trim();
        if (!username || username.length > 50) {
          const err: LookupResponse = { ok: false, error: "Invalid username" };
          return new Response(JSON.stringify(err), {
            status: 400,
            headers: { "Content-Type": "application/json", ...cors },
          });
        }

        const uid = await getUserIdByUsername(username);
        if (!uid) {
          const err: LookupResponse = { ok: false, error: "User not found" };
          return new Response(JSON.stringify(err), {
            status: 404,
            headers: { "Content-Type": "application/json", ...cors },
          });
        }

        const user = await getUser(uid);
        if (!user) {
          const err: LookupResponse = { ok: false, error: "Failed to fetch user info" };
          return new Response(JSON.stringify(err), {
            status: 502,
            headers: { "Content-Type": "application/json", ...cors },
          });
        }

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

        const body: LookupResponse = {
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
          roblox_badges: badges.map((name) => ({
            name,
            icon_url: BADGE_ICON_URLS[name] || "",
          })),
          rap_items: rapData.items,
        };
        return new Response(JSON.stringify(body), {
          status: 200,
          headers: { "Content-Type": "application/json", ...cors },
        });
      },
    },
  },
});
