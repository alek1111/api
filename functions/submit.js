
export async function onRequestGet(context) {
  
  const fetchUrl = "https://lusearchapi-na.hawksearch.com/sites/collectionsetcrwdv2/";
  const cache = caches.default;
  
  try {
    let url = await context.request.url;

    let paramString = url.split('?')[1];
    let queryString = new URLSearchParams(paramString);
	
	let response = cache.match(fetchUrl.concat('?', paramString));
	
	if (!response) {
		return new Response('Error retreiving cache', { status: 400 })
	}
	else {
		return(response);
	}
	
    return fetch(fetchUrl.concat('?', paramString), {
      method: "GET",
	  cf: { cacheKey: fetchUrl.concat('?', paramString) },
  });
  
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}