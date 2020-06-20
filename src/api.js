const HOST = 'https://joconor-modemlog.builtwithdark.com';

export const getStatus = async () => {
    let response = await fetch(`${HOST}/stats`);
    let data = await response.json();
    return data;
};

export const getEvents = async (from, to) => {
    let myURL = new URL(`${HOST}/events`);
    myURL.searchParams.set("from", from);
    myURL.searchParams.set("to", to);
    let urlString = myURL.toString();
    let response = await fetch(urlString);
    let data = await response.json();
    return data;
};

export const getHistogram = async () => {
    let response = await fetch(`${HOST}/fec-error-histogram`);
    let data = await response.json();
    return data;
}