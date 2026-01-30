let accessToken: string | null = null;

export function setAccessToken(token: string) {
  accessToken = token;
}

export async function authFetch(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include", //  REQUIRED for refresh cookie
  });

  //  Token expired → try refresh
  if (res.status === 401) {
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) {
      throw new Error("Session expired. Login again.");
    }

    const data = await refreshRes.json();
    setAccessToken(data.accessToken);

    //  Retry original request
    return fetch(input, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: `Bearer ${data.accessToken}`,
      },
      credentials: "include",
    });
  }

  return res;
}
