//new deploy - 1

export async function onRequestGet(context) {
  
  const fetchUrl = "https://winstonbrands.test.hawksearch.net/sites/collectionsetcrwdv2/";
  
  try {
    let url = await context.request.url;

	let paramString = url.split('?')[1];
	
	if (paramString.includes('ntt=') || paramString.includes('lpurl') || paramString.includes('GetSuggestions')) 
		{
			const today = new Date();
			const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
			let secondsDiff = Math.floor((tomorrow.getTime() + 21600000 + 27000000 - today.getTime()) / 1000);
			if (secondsDiff >= 86400) {secondsDiff -= 86400;}
			const seconds = secondsDiff;
			console.log(seconds);

			let response = await fetch(fetchUrl.concat('?', paramString), {
			method: "GET",
			cf: {
				cacheTtl: seconds,
				cacheEverything: true,
				cacheKey: fetchUrl.concat('?', paramString),
					},
				});
				let headersObject = Object.fromEntries(response.headers);
				let responseHeaders = JSON.stringify(headersObject, null, 2);
				console.log(`Response headers: ${responseHeaders}`);  
				return response;
		}
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}