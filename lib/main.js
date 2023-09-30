const axios =require("axios");
const getVpnList = () => {
    return new Promise(async (resolve, reject) => {
        const vpnGateApiUrl = "http://www.vpngate.net/api/iphone/"
        let servers = []
        let headers = []
        let countries = {}
        let returnData = {servers, countries}
    
        let {data} = await axios.get(vpnGateApiUrl);
        // if no data returned, return cache
        if(!data) reject({...returnData})
    
        // split lines
        data = data.split("\n")
        // if no data returned, return cache
        if(data.length<2) reject({...returnData})
    
        // get headers
        headers = data[1].split(",")
        headers[0] = headers[0].slice(1)
        let a = headers[headers.length-1]
        headers[headers.length-1] = a.split("\r")[0]
    
        // Clean up the data
        data = data.slice(2, data.length-2)
        
        // make object and store in list
        data.forEach(vpn => {
            let val = vpn.split(",")
            countries[val[6].toLowerCase()] = val[5]
            let obj = {}
            for(let j = 0; j < val.length; j++) {
                obj[headers[j].toLowerCase()] = val[j];
            }
            servers.push(obj)
        })
        // console.log(servers[0])
        resolve({...returnData})
    })
}

module.exports = getVpnList