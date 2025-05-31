const apiBaseUrl = import.meta.env.VITE_APP_API_URL;
import type { HttpMethodType, PathParams, HeadersType } from "@/shared/api/types.ts";
const headersDefault: HeadersType = { "Content-Type": "application/json" };

export async function fetchData<TBody = unknown>(
	url: string,
	method: HttpMethodType = 'GET',
	pathParams: PathParams = {},
	body: TBody | null = null,
	headers: HeadersType = headersDefault
): Promise<any> {
	let data = null;
	try {
		let processedUrl: string = url;
		for (const key in pathParams) {
			processedUrl = processedUrl.replace(`:${key}`, encodeURIComponent(pathParams[key]));
		}
		const isFormData = body instanceof FormData;
		const fetchHeaders = isFormData ? {} : headers;

		const result = await fetch(`${apiBaseUrl}/${processedUrl}`, {
			method,
			credentials: 'include',
			headers: fetchHeaders,
			...(body && method !== 'GET' && { body: isFormData ? body : JSON.stringify(body) }),
		})
		data = await result.json();
	} catch (e) {
		console.log('Fetch request error:', e);
	}
	return data;
}
