
export async function onRequestGet(context) {
  
  try {
    let url = await context.request.url.text();

    let paramString = url.split('?')[1];
    let queryString = new URLSearchParams(paramString);

    return new Response(paramString, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
  });
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}