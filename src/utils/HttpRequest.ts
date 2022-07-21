export async function HttpRequest(url: string, method: string, data: FormData) {
  const response = await fetch(url, {
    method: method,
    body: data,
  });
  return await response.text();
}
