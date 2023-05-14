const axios = require("axios");
require('dotenv').config();

const options = {
  hostname: "https://gateway.apiportal.ns.nl",
  path: "reisinformatie-api/api/v2/departures?uicCode=8400206",
  method: "GET",
};

const key = process.env.NS_API_KEY;

const config = {
    headers: { 'Ocp-Apim-Subscription-Key': key }
};

const fetchDepartures = async () => {
  const response = await axios.get("https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?uicCode=8400206", config);

  const payload = response.data['payload'];
  const departures = payload['departures'];
  return departures;
};

module.exports = {
    fetchDepartures
}
