export function parseEnvironmentVariables(envString) {
    if (!envString) {
        return [];
    }
    return envString
        .split('\n')
        .filter(line => line.trim() && line.includes('='))
        .map(line => {
        const [name, ...valueParts] = line.split('=');
        return {
            name: name.trim(),
            value: valueParts.join('=').trim()
        };
    });
}
