//new deploy - 1

export async function onRequestGet(context) {
  
    const cacheUrl = new URL("https://lusearchapi-na.hawksearch.com/sites/collectionsetcrwdv2/");
    
	let url = await context.request.url;

    let paramString = url.split('?')[1];
	
    // Construct the cache key from the cache URL
    const cacheKey = new Request(cacheUrl.toString().concat('?', paramString), {
          method: "GET",
        });
    const cache = caches.default;

    // Check whether the value is already available in the cache
    // if not, you will need to fetch it from origin, and store it in the cache
    let response = await cache.match(cacheKey);

    if (!response) {
      console.log(
        `Response for request url: ${context.request.url} not present in cache. Fetching and caching request.`
      );
      // If not in cache, get it from origin
      response = await fetch(cacheKey);

      // Must use Response constructor to inherit all of response's fields
      response = new Response(response.body, response);

      // Cache API respects Cache-Control headers. Setting s-max-age to 10
      // will limit the response to be in cache for 10 seconds max

      // Any changes made to the response here will be reflected in the cached value
      response.headers.append("Cache-Control", "s-maxage=1000");

      ctx.waitUntil(cache.put(cacheKey, response.clone()));
    } else {
      console.log(`Cache hit for: ${context.request.url}.`);
    }
    return response;
}