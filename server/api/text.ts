export default defineEventHandler(async (event) => {
  const { text } = await readBody(event);
  const encodedParams = new URLSearchParams();

  encodedParams.set("in", text);
  encodedParams.set("op", "in");
  encodedParams.set("cbot", "1");
  encodedParams.set("SessionID", "RapidAPI1");
  encodedParams.set("cbid", "1");
  encodedParams.set('key', 'RHMN5hnQ4wTYZBGCF3dfxzypt68rVP');
  encodedParams.set("ChatSource", "RapidAPI");
  encodedParams.set("duration", "1");

  const url = 'https://robomatic-ai.p.rapidapi.com/api';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '619624cca8msh0c9a9a85b5368a3p137753jsnbf1583a2183a',
      'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com'
    },
    body: encodedParams
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return result;
    
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.messages,
      error,
    });
  }
})