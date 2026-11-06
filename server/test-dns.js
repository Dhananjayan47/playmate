// import { setServers, getServers, promises } from "node:dns";

import { log } from "console";

// setServers(["10.118.56.47"]);

// console.log("DNS Servers:", getServers());

// async function testDNS() {
//   try {
//     const result = await promises.resolveSrv(
//       "_mongodb._tcp.cluster0.xjxpscv.mongodb.net"
//     );

//     console.log("SUCCESS:", result);
//   } catch (error) {
//     console.error("FAILED:", error);
//   }
// }

// testDNS();

const date = new Date().getTime();

const futher = new Date().getTime() + 5*60*1000;

log("current time :",date);
log("5 mins plus",futher);


log( typeof date)