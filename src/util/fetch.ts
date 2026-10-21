export async function fetchWithFallback(
	input: RequestInfo | URL,
	fallback: RequestInfo | URL,
	fetcher: typeof fetch = fetch,
): Promise<Response> {
	try {
		return await fetcher(input);
	} catch {
		return fetcher(fallback);
	}
}
