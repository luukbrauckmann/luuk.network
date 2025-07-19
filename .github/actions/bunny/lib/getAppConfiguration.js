export async function getAppConfiguration(token, appId) {
    return new Promise((resolve, reject) => {
        fetch(`https://api-mc.opsbunny.net/v1/namespaces/default/applications/${appId}/configuration`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': token
            },
        })
            .then(response => {
            if (response.status === 400) {
                reject(`Could not obtain app configuration: Double-check your app_id.`);
                return;
            }
            if (response.status !== 200) {
                reject(`Could not obtain app configuration: HTTP status ${response.status}.`);
                return;
            }
            response.json()
                .then(obj => {
                resolve(obj);
            })
                .catch(e => {
                console.log(e);
                reject('Could not parse JSON response.');
            });
        })
            .catch(e => {
            console.log(e);
            reject('Could not obtain app configuration.');
        });
    });
}
