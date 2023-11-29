//new deploy - 1

export async function onRequestGet(context) {
  
  const fetchUrl = "https://lusearchapi-na.hawksearch.com/sites/collectionsetcrwdv2/";
  
  try {
    let url = await context.request.url;

    let paramString = url.split('?')[1];
	
    return fetch(fetch.concat('?', paramString), {
      method: "GET",
	  cf: { cacheTtl: 1200,
			cacheEverything: true,
	  }
  });
  
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}