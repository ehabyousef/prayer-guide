import axios from "axios";
import moment from "moment/moment";
import { useEffect, useState } from "react";


const Home = () => {

    const [timings, settimings] = useState({})
    const [selectedCity, setselectedCity] = useState("القاهرة")
    const [cityValue, setcityValue] = useState("cairo")
    const [countryValue, setcountryValue] = useState("EG")
    async function getApiTimings(country, city) {
        let params = {
            country: country,
            city: city,
        };
        await axios
            .get("http://api.aladhan.com/v1/timingsByCity", {
                params: params,
            })
            .then(function (response) {
                settimings(response.data.data.timings)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const avalibleCities = [{
        dispName: 'القاهرة',
        apiName: "Cairo",
        country: "EG",
    },
    {
        dispName: 'الإسكندرية',
        apiName: "Alexanderia",
        country: "EG",
    },
    {
        dispName: 'الرياض',
        apiName: "Riyadh",
        country: "SA",
    },
    {
        dispName: 'مراكش',
        apiName: "Marrakech",
        country: "MA",
    },
    {
        dispName: ' مكة',
        apiName: "Makah",
        country: "SA",
    },
    {
        dispName: ' الجزائر',
        apiName: "Algiers",
        country: "Algeria",
    },
    ]

    const handleCityName = (e) => {
        const cityObject = avalibleCities.find((city) => {
            return city.apiName == e.target.value
        })
        const countryObject = avalibleCities.find((city) => {
            return city.country == e.target.value
        })
        setselectedCity(cityObject.dispName)
        setcityValue(e.target.value)
        setcountryValue(countryObject.country)
    }

    useEffect(() => {
        getApiTimings(countryValue, cityValue);
    }, [cityValue, countryValue])

    return (
        <>
            <div className="container" style={{ height: "65vh" }}>
                <div className="row h-50">
                    <div className="d-flex flex-column flex-md-row gap-3 justify-content-evenly  align-items-md-end">
                        <div className="city text-white d-flex flex-column gap-3">
                            <h4 id="date">2023 9 sep</h4>
                            <h3 id="city-name">{selectedCity}</h3>
                        </div>
                        <div className="time text-white d-flex flex-column gap-3">
                            <h5>متبقى حتى صلاة الفجر</h5>
                            <h2>00:20:12</h2>
                        </div>
                        <div className="select">
                            <select
                                onChange={handleCityName}
                                id="city-celect"
                                className="form-select form-select-lg mb-3 bg-transparent text-white text-start"
                                style={{ minWidth: "200px" }} aria-label="Large select example">
                                {avalibleCities.map((city, ind) => {
                                    return (
                                        <option style={{ background: "#7f4f24" }} value={city.apiName} key={ind} >{city.dispName}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row row-cols-1 row-cols-md-5 g-2 my-4">
                    <div className="col">
                        <div className="card p-0" style={{ height: "100%" }}>
                            <img src="../public/image/fajr.jpg" className="card-img-top" alt="..." style={{ height: "180px" }} />
                            <div className="card-body d-flex flex-column align-items-start">
                                <p className="card-text fs-3">الفجر</p>
                                <h2 id="time-fajr" className="card-title fs-1 w-100 fw-bold">{timings.Fajr}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card p-0" style={{ height: "100%" }}>
                            <img src="../public/image/duhr.jpg" className="card-img-top" alt="..." style={{ height: "180px" }} />
                            <div className="card-body d-flex flex-column align-items-start">
                                <p className="card-text fs-3">الظهر</p>
                                <h2 id="time-duhr" className="card-title fs-1 w-100 fw-bold">{timings.Dhuhr}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card p-0" style={{ height: "100%" }}>
                            <img src="../public/image/asr.jpg" className="card-img-top" alt="..." style={{ height: "180px" }} />
                            <div className="card-body d-flex flex-column align-items-start">
                                <p className="card-text fs-3">العصر</p>
                                <h2 id="time-asr" className="card-title fs-1 w-100 fw-bold">{timings.Asr}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card p-0" style={{ height: "100%" }}>
                            <img src="../public/image/maghrap.jpg" className="card-img-top" alt="..." style={{ height: "180px" }} />
                            <div className="card-body d-flex flex-column align-items-start">
                                <p className="card-text fs-3">المغرب</p>
                                <h2 id="time-mughrap" className="card-title fs-1 w-100 fw-bold">{timings.Maghrib}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card p-0" style={{ height: "100%" }}>
                            <img src="../public/image/hesha.jpg" className="card-img-top" alt="..." style={{ height: "180px" }} />
                            <div className="card-body d-flex flex-column align-items-start">
                                <p className="card-text fs-3">العشاء</p>
                                <h2 id="time-isha" className="card-title fs-1 w-100 fw-bold">{timings.Isha}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;