import { describe, expect, test, vi } from "vitest";
import { fetchWithFallback } from "./fetch";

describe("fetchWithFallback", () => {
	test("uses the fallback URL when the primary fetch rejects", async () => {
		const fetcher = vi
			.fn<typeof fetch>()
			.mockRejectedValueOnce(new TypeError("fetch failed"))
			.mockResolvedValueOnce(new Response("snippet"));

		const response = await fetchWithFallback(
			"https://gh-code.developers.cloudflare.com/cloudflare/docs/main/example.js",
			"https://raw.githubusercontent.com/cloudflare/docs/main/example.js",
			fetcher,
		);

		expect(await response.text()).toBe("snippet");
		expect(fetcher).toHaveBeenCalledTimes(2);
		expect(fetcher).toHaveBeenLastCalledWith(
			"https://raw.githubusercontent.com/cloudflare/docs/main/example.js",
		);
	});
});
