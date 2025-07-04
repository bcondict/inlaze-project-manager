interface FetchObject {
  url: string;
  headers: Record<string, string>;
  method: string;
  body?: Record<string, unknown>;
}

export const fetchHandler = async <T>(fetchObject: FetchObject): Promise<T> => {
  if (fetchObject.method === "GET") {
    return fetch(fetchObject.url, {
      method: fetchObject.method,
      headers: fetchObject.headers,
    })
      .then((data) => data.json())
      .then((res) => res)
      .catch((error) => console.log(error));
  }

  return fetch(fetchObject.url, {
    method: fetchObject.method,
    headers: fetchObject.headers,
    body: JSON.stringify(fetchObject.body),
  })
    .then((data) => data.json())
    .then((res) => res)
    .catch((error) => console.log(error));
};
