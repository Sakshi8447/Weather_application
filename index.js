// const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=germany&appid=dbf30cd26bd5d20808c817d9451e1acd';

const apiKey = 'dbf30cd26bd5d20808c817d9451e1acd'; // Use your own api key
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

// variables 
const inputField = document.getElementById('search');
const searchIcon = document.getElementById('search-icon');

// when user press enter key then hit the search button while typiing
inputField.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("search-icon").click();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    const greetText = document.getElementById('greetText');

    // date.innerHTML = new Date().toDateString();
    console.log(new Date());
    const d = new Date();
    const dates = d.getDate();
    console.log(dates);
    const month = d.getMonth() + 1;
    console.log(month);
    const year = d.getFullYear();
    console.log(year);

    let hours = d.getHours();
    console.log(hours);
    const minutes = d.getMinutes();
    console.log(minutes);
    const seconds = d.getSeconds();
    console.log(seconds);

    const currentTime = hours + ":" + minutes + ":" + seconds;
    console.log(currentTime);

    const todaysDate = dates + "." + month + "." + year;
    console.log(todaysDate);
    date.innerHTML = todaysDate;

    time.innerHTML = currentTime;

    if (hours >= 0 && hours < 12) {
        greetText.innerText = 'Good Morning!';
    } else if (hours >= 12 && hours < 17) {
        greetText.innerText = 'Good Afternoon!';
    } else if (hours >= 17 && hours <= 24) {
        greetText.innerText = 'Good Evening!';
    }


})

searchIcon.addEventListener('click', function () {
    const city = inputField.value;
    if (city == '') {
        document.getElementById('error').style.display = 'block';
        // display the error message for 3 seconds
        setTimeout(function () {
            document.getElementById('error').style.display = 'none';
        }, 3000);
        return;
    }
    checkWeatherCity(city);
})

async function checkWeatherCity(city) {
    hourlyUpdate(city);
    const response = await fetch(url + city + "&appid=" + apiKey);
    console.log(response);
    response.json()
        .then(data => {
            console.log(data);

            if (data.cod == 404) {
                document.getElementById('error').style.display = 'block';
                // display the error message for 3 seconds
                setTimeout(function () {
                    document.getElementById('error').style.display = 'none';
                }, 6000);
                return;
            }


            const icon = document.getElementsByClassName('icon')[0];

            icon.removeChild(icon.firstElementChild);
            var i = document.createElement('i');

            if (data.weather[0].main == 'Clouds') {
                i.classList.add('fa-brands', 'fa-cloudflare');
            }
            else if (data.weather[0].main == 'Clear') {
                i.classList.add('fa-solid', 'fa-cloud-sun');
            }
            else if (data.weather[0].main == 'Rain') {
                i.classList.add('fa-solid', 'fa-cloud-moon-rain');
            }
            else if (data.weather[0].main == 'Thunderstorm ') {
                i.classList.add('fa-solid', 'fa-cloud-bolt');
            }
            else if (data.weather[0].main == 'Drizzle') {
                i.classList.add('fa-solid', 'fa-cloud-rain');
            }
            else if (data.weather[0].main == 'Snow') {
                i.classList.add('fa-solid', 'fa-snowflake');
            }
            else if (data.weather[0].main == 'Atmosphere') {
                i.classList.add('fa-solid', 'fa-cloud');
            }
            else if (data.weather[0].main == 'Mist') {
                i.classList.add('fa-solid', 'fa-tornado');
            }
            else if (data.weather[0].main == 'Sun') {
                i.classList.add('fa-solid', 'fa-sun');
            }
            i.style.fontSize = '140px';
            icon.appendChild(i);

            console.log(data.weather[0].main);
            document.getElementById('temp').innerHTML = Math.round(data.main.temp) + "°C";
            document.getElementById('message').innerHTML = data.weather[0].description;
            document.getElementById('wind').innerHTML = data.wind.speed + " km/h";
            document.getElementById('humidity').innerHTML = data.main.humidity + "%";
            document.getElementById('rain').innerHTML = data.clouds.all + "%";
        });
}

// 5 days forecast api
// https://api.openweathermap.org/data/2.5/forecast?units=metric&q=kanpur&appid=dbf30cd26bd5d20808c817d9451e1acd

const url2 = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q='

async function hourlyUpdate(city) {
    const response = await fetch(url2 + city + "&appid=" + apiKey);
    console.log(response);
    const temp_hour = document.getElementsByClassName('temp_hour');
    const weathertypeHour = document.getElementsByClassName('weathertype_hour'); // collections will return 
    // we can access using array[0], array[1] etc
    const timeHour = document.getElementsByClassName('time_hour');

    response.json()
        .then(data => {
            console.log(data);
            for (let i = 0; i < 8; i++) {

                // console.log(weather_type + " " + temp + " " + date & time)
                console.log(data.list[i].weather[0].main + " " + data.list[i].main.temp + " " + data.list[i].dt_txt);
                // date variable which contains the date and time in string format
                const date = data.list[i].dt_txt;

                const d = new Date(date); // convert the string into date object

                const hours = d.getHours();
                console.log(hours);
                timeHour[i].innerHTML = hours + ":00";
                temp_hour[i].innerHTML = Math.round(data.list[i].main.temp) + "°C";
                weathertypeHour[i].innerHTML = data.list[i].weather[0].main; // weather type - cloudy, sunny, clear etc

            }
        });

}
// const hourly = document.getElementsByClassName('hourly-forecast')[2];
// console.log(hourly);



// call the function

// when user press enter key then hit the search button - completed
// error message keliye settimeout use karna hai - completed

// change the icons - accoring to the weather - cloudy, sun, rain, mist, drizzle - completed
// handle the incorrect cityname entered by the user -  completed

// 5 days forecast data update
// hourly data update - completed

// update the good mornnig text according to the time using DOMContentLoad - completed
// Update the date and time  - completed



// 15 December 2023
// 5 days forecast api ko call karna hai
// hourly data container main starting list ke 6 items show krne hai
// for(int i=0;i<6;i++){
//     lists[i].main.temp;
// }
// 5 days forecast container main individual day ke liye ek dialog box (similiar to ad) create krna hai with the close 




// html and css part
// 5 days forecast - pop up dialog box create krna hai 
// days ko update krna hai according to the today's date - simple logic - completed

// js part
// according to the api response - iterate over the list array and if the date == tomorrow'date then take the next 8 items form the list array and display it in the dialog box

// 17 - 8 items = 24 / 3 = 8 items 

// sun
// mon
// tue
// wed
// thu

function nextFiveDays() {
    const weekname = document.getElementsByClassName('weekname');
    let now = new Date();
    let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const currentIndex = now.getDay();
    let dayString = days[now.getDay()];
    // console.log(dayString);
    var n = 6;
    for (let i = 0; i < n; i++) {
        console.log(days[(currentIndex + i + 1) % 7]);
        weekname[i].innerHTML = days[(currentIndex + i) % 7];
    }

}

function nextfiveDate() {
    let dates = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    const d = new Date();
    const date = d.getDate(); // 16
    var arr = [];
    for (let i = 0; i < 5; i++) {
        arr.push(dates[(date + i) % 31]);
        console.log(dates[(date + i) % 31]);
    }
    return arr;
}

function nextfiveDate30() {
    let dates = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
    const d = new Date();
    // d.setDate(27);
    const date = d.getDate(); // 16
    var arr = [];
    for (let i = 0; i < 5; i++) {
        arr.push(dates[(date + i) % 30]);
        console.log(dates[(date + i) % 30]);
    }
    return arr;
}

async function fiveDaysForecast(city) {
    const response = await fetch(url2 + city + "&appid=" + apiKey);
    response.json()
        .then(data => {
            console.log(data);

            const d = new Date();
            // d.setMonth(1);
            // d.setDate(27);
            const months = d.getMonth() + 1;
            if (months == 1 || months == 3 || months == 5 || months == 7 || months == 8 || months == 10 || months == 12) {
                console.log("31 days");
                console.log(nextfiveDate());
            }
            else {
                console.log("30 days");
                console.log(nextfiveDate30());
            }
            const dates = d.getDate();
            console.log(dates + 1);
            // next day kon si date hai - completed


            // list ko iterate krke next date ka time 3:00 nikalana hai and uska temp use krna hai

        });
}

fiveDaysForecast('kanpur');

// 0 - Sun
// 1 - mon
// 2 - tue
// 3 - wed
// 4 - thu
// 5 - fri
// 6 - sat


// 0%7 - 0
// 1%7 - 1
// 2%7 - 2
// 3%7 - 3
// 4%7 - 4
// 5%7 - 5
// 6%7 - 6
// 7%7 - 0
// 8%7 - 1
// 14%7 - 0

nextFiveDays();
