
export async function onRequestPost(context) {
  
  try {
    let url = await context.request.url;

    let paramString = url.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    let pretty = JSON.stringify(queryString, null, 2);
    return new Response(pretty, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
  });
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}