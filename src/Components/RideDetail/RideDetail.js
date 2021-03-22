import React from 'react';
import './RideDetail.css';
import { useParams } from 'react-router';
import rideData from '../../rideData';
import GoogleMap from '../GoogleMap/GoogleMap';
import { useState } from 'react/cjs/react.development';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const RideDetail = () => {
    const [searchedForm, setSearchedForm] = useState({
        isSearched: false,
        pickFrom: '',
        pickTo: ''
    });
    const { rideName } = useParams();

    const handleBlurPlace = (e) => {
        if (e.target.name === 'pickFrom') {
            const newPickFrom = { ...searchedForm };
            newPickFrom.pickFrom = e.target.value;
            setSearchedForm(newPickFrom);
        }
        if (e.target.name === 'pickTo') {
            const newPickTo = { ...searchedForm };
            newPickTo.pickTo = e.target.value;
            setSearchedForm(newPickTo);
        }
    }
    return (
        <div className="rideDetail">
            {
                rideData.map(rides => rides.name === rideName &&
                    <div className="searchCity" key={rides.name}>
                        {
                            searchedForm.isSearched ?
                                <div>
                                    <div className="destination">
                                        <li>{searchedForm.pickFrom}</li>
                                        <div className="verticalLine"></div>
                                        <li>{searchedForm.pickTo}</li>
                                    </div>
                                    <div>
                                        <div className="trips">
                                            <img src={rides.imgUrl} alt="ride" />
                                            <h3>{rides.name}</h3>
                                            <FontAwesomeIcon className="userIcon" icon={faUser} />
                                            <h4>{rides.tripPeople1}</h4>
                                            <h3>{rides.tripPrice1}</h3>
                                        </div>
                                        <div className="trips">
                                            <img src={rides.imgUrl} alt="ride" />
                                            <h3>{rides.name}</h3>
                                            <FontAwesomeIcon className="userIcon" icon={faUser} />
                                            <h4>{rides.tripPeople2}</h4>
                                            <h3>{rides.tripPrice2}</h3>
                                        </div>
                                        <div className="trips">
                                            <img src={rides.imgUrl} alt="ride" />
                                            <h3>{rides.name}</h3>
                                            <FontAwesomeIcon className="userIcon" icon={faUser} />
                                            <h4>{rides.tripPeople3}</h4>
                                            <h3>{rides.tripPrice3}</h3>
                                        </div>
                                    </div>
                                </div> :
                                <div>
                                    <h4>Pick From</h4>
                                    <input onBlur={handleBlurPlace} type="text" name="pickFrom" placeholder="Pick From" />
                                    <h4>Pick To</h4>
                                    <input onBlur={handleBlurPlace} placeholder="Pick To" type="text" name="pickTo" />
                                    <button onClick={() => setSearchedForm({
                                        isSearched: true,
                                        pickFrom: searchedForm.pickFrom,
                                        pickTo: searchedForm.pickTo
                                    })} className="searchBtn">Search</button>
                                </div>
                        }
                    </div>)
            }
            <GoogleMap />
        </div >
    );
};

export default RideDetail;