/**
 * @module mapbox-geocoding
 */
const BASE_URL = "https://api.mapbox.com/geocoding/v5/";

let ACCESS_TOKEN = null;
/**
 * Constracts the geocode/reverse geocode url for the query to mapbox.
 *
 * @param  {string}   dataset - The mapbox dataset ('mapbox.places' or 'mapbox.places-permanent')
 * @param  {string}   address - The address to geocode
 * @param  {Function} done    - Callback function with an error and the returned data as parameter
 */
const __geocodeQuery = (dataset, query, params, done) => {
    if (!ACCESS_TOKEN) {
        return done("You have to set your mapbox public access token first.");
    }
    if (!dataset) {
        return done("A mapbox dataset is required.");
    }
    if (!query) {
        return done("You have to specify the location to geocode.");
    }
    let url = BASE_URL + dataset + "/" + query + ".json?access_token=" + ACCESS_TOKEN;
    if (params && params.size > 0) {
        url += convertToParameters(params);
    }
    fetch(url).then((response) => response.json()).then((responseJson) => {
        done(null, responseJson);
    }).catch((err) => {
        return done(err);
    });
};

const convertToParameters = (data) => {
    var out = [];
    for (let [key, value] of data) {
        out.push(key + '=' + encodeURIComponent(value));
    }
    return "&" + out.join('&');
}

/**
 * Sets the mapbox access token with the given one.
 *
 * @param {string} accessToken - The mapbox public access token
 */
export const setAccessToken = (accessToken) => {
    ACCESS_TOKEN = accessToken;
}

/**
 * Geocodes the given address.
 *
 * @param  {string}   dataset - The mapbox dataset ('mapbox.places' or 'mapbox.places-permanent')
 * @param  {string}   address - The address to geocode
 * @param  {Function} done    - Callback function with an error and the returned data as parameter
 */
export const geocode = (dataset, address, params, done) => {
    __geocodeQuery(dataset, address, params, done);
};

/**
 * Reverse geocodes the given longitude and latitude.
 *
 * @param  {string}   dataset - The mapbox dataset ('mapbox.places' or 'mapbox.places-permanent')
 * @param  {string}   address - The address to geocode
 * @param  {Function} done    - Callback function with an error and the returned data as parameter
 */
export const reverseGeocode = (dataset, lng, lat, done) => {
    const query = lng + "," + lat;
    __geocodeQuery(dataset, query, null, done);
};
