import bus from './images/bus.png';
import bike from './images/bike.png';
import train from './images/train.png';
import car from './images/car.png';

const rideData = [{
    name: "Bike",
    imgUrl: `${bike}`,
    des: "This is a cool bike",
    tripPrice1: '$87',
    tripPrice2: '$76',
    tripPrice3: '$98',
    tripPeople1: 4,
    tripPeople2: 5,
    tripPeople3: 3

},
{
    name: "Bus",
    imgUrl: `${bus}`,
    des: "this is bus and heavy",
    tripPrice1: '$45',
    tripPrice2: '$34',
    tripPrice3: '$50',
    tripPeople1: 4,
    tripPeople2: 5,
    tripPeople3: 3

},
{
    name: "Car",
    imgUrl: `${car}`,
    des: "this car runs fast",
    tripPrice1: '$90',
    tripPrice2: '$86',
    tripPrice3: '$100',
    tripPeople1: 4,
    tripPeople2: 5,
    tripPeople3: 3
},
{
    name: "Train",
    imgUrl: `${train}`,
    des: "this is long train",
    tripPrice1: '$60',
    tripPrice2: '$53',
    tripPrice3: '$70',
    tripPeople1: 4,
    tripPeople2: 5,
    tripPeople3: 3
}]

export default rideData;