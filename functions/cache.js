//new deploy - 1

export async function onRequestGet(context) {
  
  const fetchUrl = "https://dev.hawksearch.net/sites/collectionsetcrwdv2/";
  
  try {
    let url = await context.request.url;

	let paramString = url.split('?')[1];
	
	if (paramString.includes('ntt=') || paramString.includes('lpurl')) 
		{
			const today = new Date();
			const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
			const seconds = Math.floor((tomorrow.getTime() + 18000000 - today.getTime()) / 1000);
			console.log(seconds);

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