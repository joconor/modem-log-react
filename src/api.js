const HOST = 'https://joconor-modemlog.builtwithdark.com';

export const getStatus = (callback, error) => {
    fetch(`${HOST}/stats`)
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch((error) => { callback(error) })
}