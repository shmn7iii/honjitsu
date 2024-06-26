import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req) {
    const token = Deno.env.get("SIZUME_API_TOKEN");
    const apiUrl = Deno.env.get("SIZUME_API_URL") +
      "/posts?perPage=30&sort=created&direction=desc&visibility=URL_ONLY";

    const response = await fetch(
      apiUrl,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      },
    );
    const data = await response.json();

    return new Response(JSON.stringify(data));
  },
};
