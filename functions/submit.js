//new deploy - 1

export async function onRequestGet(context) {
  
  const fetchUrl = "https://lusearchapi-na.hawksearch.com/sites/collectionsetcrwdv2/";
  
  try {
    let url = await context.request.url;

    let paramString = url.split('?')[1];
	
    let response = new Response(fetch(fetchUrl.concat('?', paramString), {
      method: "GET",
	  cf: { cacheTtl: 1200,
			cacheEverything: true,
			cacheKey: fetchUrl.concat('?', paramString) },
  }));
  
  console.log(response.header);
  console.log(response.url);
  console.log(response.body);
  
  return response.header;
  
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}