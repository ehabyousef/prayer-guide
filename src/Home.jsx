import axios from "axios";
import moment from "moment/moment";
import 'moment/locale/ar';
import { useEffect, useState } from "react";

const Home = () => {
    const [timings, settimings] = useState({})
    const [selectedCity, setselectedCity] = useState("القاهرة")
    const [countryValue, setcountryValue] = useState("EG")
    const [cityValue, setcityValue] = useState("Cairo")
    const [date, setdate] = useState("")
    const [nextPrayer, setnextPrayer] = useState(1)
    const [remainingtime, setremainingtime] = useState("")
    const [isLoading, setisLoading] = useState(true)
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
        dispName: 'مكة',
        apiName: "Makah",
        country: "SA",
    },
    {
        dispName: 'الجزائر',
        apiName: "Algiers",
        country: "DZ",
    },
    ]
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
                counterTimer()
                setisLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setisLoading(false)
            });
    }
    const handleCityName = (e) => {
        const cityObject = avalibleCities.find((city) => {
            return city.apiName == e.target.value
        })
        const countryObject = avalibleCities.find((city) => {
            return city.apiName == e.target.value
        })
        setselectedCity(cityObject.dispName)
        setcityValue(e.target.value)
        setcountryValue(countryObject.country)
    }

    const prayerArray = [
        { key: 'Fajr', displayName: 'الفجر' },
        { key: 'Dhuhr', displayName: 'الظهر' },
        { key: 'Asr', displayName: 'العصر' },
        { key: 'Maghrib', displayName: 'المغرب' },
        { key: 'Isha', displayName: 'العشاء' },
    ]
    const counterTimer = () => {
        let prayerIndex = 2;
        const timeNow = moment();
        if (timeNow.isBefore(moment(timings.Fajr, "hh:mm")) && timeNow.isAfter(moment(timings.Dhuhr, "hh:mm"))) {
            prayerIndex = 1;
        } else if (timeNow.isBefore(moment(timings.Dhuhr, "hh:mm")) && timeNow.isAfter(moment(timings.Asr, "hh:mm"))) {
            prayerIndex = 2;
        }
        else if (timeNow.isBefore(moment(timings.Asr, "hh:mm")) && timeNow.isAfter(moment(timings.Maghrib, "hh:mm"))) {
            prayerIndex = 3;
        }
        else if (timeNow.isBefore(moment(timings.Maghrib, "hh:mm")) && timeNow.isAfter(moment(timings.Isha, "hh:mm"))) {
            prayerIndex = 4;
        }
        else {
            prayerIndex = 0;
        }
        setnextPrayer(prayerIndex);
        const nextPrayerobject = prayerArray[prayerIndex];
        const nextPrayerTimer = timings[nextPrayerobject.key];
        const nextPrayerTimeMoment = moment(nextPrayerTimer, "hh:mm")
        let remainingTime = moment(nextPrayer, "hh:mm").diff(timeNow)
        if (remainingTime < 0) {
            const midNight = moment("23:59:59", "hh:mm:ss").diff(timeNow)
            const fajrToMidNight = nextPrayerTimeMoment.diff(moment("00:00:00", "hh:mm:ss"))
            const totaldiff = midNight + fajrToMidNight
            remainingTime = totaldiff
        }
        const durationRemaining = moment.duration(remainingTime)
        setremainingtime(`${durationRemaining.seconds()} : ${durationRemaining.minutes()}  : ${durationRemaining.hours()}`)
        // console.log(durationRemaining);
        // console.log(remainingtime);
    }
    useEffect(() => {
        const interval = setInterval(() => {
            counterTimer();
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    }, [timings, selectedCity])
    useEffect(() => {
        getApiTimings(countryValue, cityValue);
        setdate(moment().format("MMM Do YYYY | h:mm a"));
    }, [cityValue, countryValue]);
    return (
        <>
            <div className="container" style={{ height: "65vh" }}>
                <div className="row h-50">
                    <div className="d-flex flex-column flex-md-row gap-3 justify-content-evenly  align-items-md-end">
                        <div className="city text-white d-flex flex-column gap-3">
                            <h4 id="date">{date}</h4>
                            <h3 id="city-name">{selectedCity}</h3>
                        </div>
                        <div className="time text-white d-flex flex-column gap-3">
                            <h5>متبقى حتى صلاة {prayerArray[nextPrayer].displayName}</h5>
                            <h2>{isLoading ? <div className="lds-facebook"><div></div><div></div><div></div></div> : remainingtime}</h2>
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
                <div className="row row-cols-1 row-cols-md-5 g-2 my-4 p-2">
                    <div className="col">
                        <div className="card p-0" style={{ height: "100%" }}>
                            <img src="../public/image/fajr.jpg" className="card-img-top" alt="..." style={{ height: "180px" }} />
                            <div className="card-body d-flex flex-column align-items-start">
                                <p className="card-text fs-3">الفجر</p>
                                <h2 id="time-fajr" className="card-title fs-1 w-100 fw-bold">{isLoading ? <div className="lds-facebook"><div></div><div></div><div></div></div> : timings.Fajr}</h2>
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