//new deploy - 1

export async function onRequestGet(context) {
  
  const fetchUrl = "https://dev.hawksearch.net/sites/collectionsetcrwdv2/";
  
  try {
    let url = await context.request.url;

	let paramString = url.split('?')[1];
	
	if (paramString.includes('ntt=') || paramString.includes('lpurl')) 
		{
			const now = new Date();
			const tomorrow = new Date();
			tomorrow.setHours(4, 0, 0, 0);
			const seconds = (tomorrow - now) / 1000;

			return fetch(fetchUrl.concat('?', paramString), {
			method: "GET",
			cf: {
				cacheTtl: seconds,
				cacheEverything: true,
				cacheKey: url,
					},
				});
		}
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}