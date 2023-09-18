// import axios from 'axios';
// import { createContext, useEffect, useState } from 'react';
// export let myContext = createContext()
// const Contaxt = (props) => {
//     const [cities, setcities] = useState(["القاهرة", "المدينه المنوره", "وهران", "مراكش", "تونس"])
//     const [timings, settimings] = useState({})
//     const [selectedCity, setselectedCity] = useState("القاهرة")
//     async function getApiTimings(country, city) {
//         let params = {
//             country: country,
//             city: city,
//         };
//         await axios
//             .get("http://api.aladhan.com/v1/timingsByCity", {
//                 params: params,
//             })
//             .then(function (response) {
//                 settimings(response.data.data.timings)
//                 let date = response.data.data.date.readable;
//                 // let weekday = response.data.data.date.hijri.weekday.ar;
//                 // const fulldate = `${weekday}  ${date}`;
//                 // console.log(date);
//                 // console.log(weekday);
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }
//     const avalibleCities = [{
//         dispName: 'القاهرة',
//         apiName: "EG-C"
//     },
//     {
//         dispName: 'الإسكندرية',
//         apiName: "EG-ALX"
//     },
//     {
//         dispName: 'الرياض',
//         apiName: "SA-01"
//     },
//     {
//         dispName: 'مراكش',
//         apiName: "MA-07"
//     },
//     {
//         dispName: 'المدينه المنورة',
//         apiName: "SA-03"
//     },
//     ]
//     getApiTimings("EG", "EG-C");
//     return (
//         <div>
//             <myContext.Provider value={{ cities, timings, selectedCity }}>
//                 {props.children}
//             </myContext.Provider>
//         </div>
//     );
// };

// export default Contaxt;