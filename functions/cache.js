//new deploy - 1

export async function onRequestGet(context) {
  
  const fetchUrl = "https://lusearchapi-na.hawksearch.com/sites/collectionsetcrwdv2/";
  
  try {
    let url = await context.request.url;

    let paramString = url.split('?')[1];
	
    return fetch(fetchUrl.concat('?', paramString), {
      method: "GET",
  });
  
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}