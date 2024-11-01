import axios from "axios";
import { locationInterface } from "@/typeInterfaces/users.interface";



export const defaultUserLocation: locationInterface = {
    ip: "0.0.0.0",
    city: "unknown",
    region: "unknown",
    country: "unknown",
    isp: "unknown",
    lat: 0,
    lon: 0,
    usedIps: ["0.0.0.0"]
};

export async function getUserLocation() {
    try {
        const response = (await axios.get("http://ip-api.com/json")).data;
        // const response: IpApiResponse = (await axios.get("http://ip-api.com/json")).data;
    
        const location: locationInterface = {
            ip: response.query,
            city: response.city,
            region: response.regionName,
            country: response.country,
            isp: response.isp || response.org,
            lat: response.lat,
            lon: response.lon,
            usedIps: [response.query]
        };

        return location;
    } catch (error) {
        console.log(error);
    }
}

export async function getCountries() {
    try {
        const url = "https://restcountries.com/v3.1/all?fields=name,flags,idd";
        // const response: countryInterface[] = (await axios.get(`${url}`)).data;
        const response = (await axios.get(`${url}`)).data;
        // console.log(response);

        response.sort((a: any, b: any) => {
            if (a.name.common < b.name.common) return -1;
            if (a.name.common > b.name.common) return 1;
            return 0;
        });
        
        return response;
    } catch (error: any) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
        // return [];
    }
}

export async function getUserIP() {
    const res = await axios.get("https://api.ipify.org/?format=json");
    return res.data?.ip;
}
