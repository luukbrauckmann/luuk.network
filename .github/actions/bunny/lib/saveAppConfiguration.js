export async function saveAppConfiguration(token, appId, appConfig) {
    return new Promise((resolve, reject) => {
        fetch('https://api-mc.opsbunny.net/v1/namespaces/default/applications', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(appConfig),
        })
            .then(response => {
            if (response.status !== 200) {
                reject(`Could not save app configuration: HTTP status ${response.status}.`);
                return;
            }
            resolve();
        })
            .catch(e => {
            console.log(e);
            reject('Could not save app configuration.');
        });
    });
}
