
export async function getConfig() {
    let serverUrl;
    if (import.meta.env.MODE === 'production') {
        serverUrl = import.meta.env.VITE_SERVER_URL;
    } else {
        const config = await import('../config.dev.js');
        serverUrl = config.serverUrl;
    }

    return {
        "template" : `${serverUrl}/template`,
        "upload": `${serverUrl}/classrooms`
    };
}
