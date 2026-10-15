
const backendOrigin = (
  process.env.BACKEND_API_URL || "http://localhost:8000/api/v1"
).replace(/\/api\/v1\/?$/, "");

async function proxyPlatformRequest(request, context) {
  const { path = [] } = await context.params;
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL(
    `/api/v1/${path.map(encodeURIComponent).join("/")}${incomingUrl.search}`,
    backendOrigin
  );

  const platformKey = process.env.SKUL_PLATFORM_KEY;

  if (!platformKey) {
    return Response.json(
      { success: false, error: { code: "PLATFORM_NOT_CONFIGURED", message: "Platform API is not configured on the server." } },
      { status: 503 }
    );
  }

  const headers = new Headers({
    Accept: "application/json",
    "X-Platform-Key": platformKey,
  });

  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);

  const method = request.method;
  const body = ["GET", "HEAD"].includes(method)
    ? undefined
    : await request.arrayBuffer();

  try {
    const upstream = await fetch(targetUrl, {
      method,
      headers,
      body,
      cache: "no-store",
    });

    const responseHeaders = new Headers();
    const upstreamContentType = upstream.headers.get("content-type");
    if (upstreamContentType) {
      responseHeaders.set("Content-Type", upstreamContentType);
    }

    return new Response(await upstream.arrayBuffer(), {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch {
    return Response.json(
      { success: false, error: { code: "BACKEND_UNAVAILABLE", message: "Could not reach the SKUL backend." } },
      { status: 502 }
    );
  }
}

export const GET = proxyPlatformRequest;
export const POST = proxyPlatformRequest;
export const PATCH = proxyPlatformRequest;
export const DELETE = proxyPlatformRequest;
