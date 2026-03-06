const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const key = "site:visits";

    if (request.method === "GET") {
      const visits = parseInt((await env.COUNTER.get(key)) || "0", 10);
      return Response.json([{ visits }], { headers: CORS_HEADERS });
    }

    if (request.method === "POST") {
      const current = parseInt((await env.COUNTER.get(key)) || "0", 10);
      const next = current + 1;
      await env.COUNTER.put(key, String(next));
      return Response.json([{ visits: next }], { headers: CORS_HEADERS });
    }

    return new Response("Method not allowed", { status: 405, headers: CORS_HEADERS });
  },
};
