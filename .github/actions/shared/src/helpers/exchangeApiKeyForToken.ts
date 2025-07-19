export async function exchangeApiKeyForToken(apiKey: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch('https://api.bunny.net/apikey/exchange', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'AccessKey': apiKey,
      },
      body: JSON.stringify({ AccessKey: apiKey }),
    })
      .then(response => {
        if (response.status === 401) {
          reject('Invalid api_key.');
          return;
        }

        if (response.status !== 200) {
          reject(`Could not obtain access token: HTTP status ${response.status}.`);
          return;
        }

        response.json()
          .then(obj => {
            resolve(obj.Token);
          })
          .catch(e => {
            console.log(e);
            reject('Could not parse JSON response.');
          })
        ;
      })
      .catch(e => {
        console.log(e);
        reject('Could not obtain access token.');
      });
  });
}
