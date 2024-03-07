//new deploy - 1

export async function onRequestGet(context) {
  
  const fetchUrl = "https://lusearchapi-na.hawksearch.com/sites/collectionsetcrwdv2/";
  
  try {
    let url = await context.request.url;
	
	if (url.includes("NTT=") || url.includes("LPURL=")) 
		{

		let paramString = url.split('?')[1];
	
		return fetch(fetchUrl.concat('?', paramString), {
		method: "GET",
		cf: {
			// Always cache this fetch regardless of content type
			// for a max of 300 seconds before revalidating the resource
			cacheTtl: 300,
			cacheEverything: true,
			//Enterprise only feature, see Cache API for other plans
			cacheKey: url,
				},
			});
		}
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}