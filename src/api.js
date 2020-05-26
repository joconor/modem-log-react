const HOST = 'https://joconor-modemlog.builtwithdark.com';

export const getStatus = async () => {
    let response = await fetch(`${HOST}/stats`);
    let data = await response.json();
    return data;
}