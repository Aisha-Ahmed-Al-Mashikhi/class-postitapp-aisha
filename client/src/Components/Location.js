import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
    const [ip, setIp] = useState(null);
    const [geoData, setGeoData] = useState(null);
    const [currency, setCurrency] = useState("");
    const [languages, setLanguages] = useState("");
    // Fetch IP
    const fetchIpAddress = async () => {
        try {
            const response = await axios.get("https://api.ipify.org?format=json");
            setIp(response.data.ip);
        } catch (error) {
            console.error("Error fetching IP:", error.message);
        }
    };

    // Fetch Geo Location
    const getGeoLocationData = async () => {
        try {
            const response = await axios.get(`http://ip-api.com/json/${ip}`);
            setGeoData(response.data);

            if (geoData.country === "Oman") {
                setCurrency("OMR");
            } else if (geoData.country === "Qatar") {
                setCurrency("QAR");
            } else if (geoData.country === "UAE") {
                setCurrency("AED");
            } else {
                setCurrency("USD");
            }
            if (geoData.city === "Salalah") {
                setLanguages("Gabali");
            } else if (geoData.city === "Muscat") {
                setLanguages("Arabic");
            } else {
                setLanguages("English");
            }

        } catch (error) {
            console.error("Error fetching geolocation:", error.message);
        }
    };

    // When component loads → fetch IP
    useEffect(() => {
        fetchIpAddress();
    }, []);

    // When IP changes → fetch location
    useEffect(() => {
        if (ip) {
            getGeoLocationData();
        }
    }, [ip]);

    return (
        <div className="location">
            <p>Location Information</p>

            {ip ? <p>IP Address: {ip}</p> : <p>Loading IP...</p>}

            {geoData ? (
                <div>
                    City: {geoData.city} <br />
                    Region: {geoData.regionName} <br />
                    Country: {geoData.country} <br />
                    Currency: {currency} <br />
                    ISP: {geoData.isp}<br />
                    Languages: {languages}
                </div>
            ) : (
                <p>Loading Geo Data...</p>
            )}
        </div>
    );
};

export default Location;
