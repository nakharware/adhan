var salahNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
var salahTimes = ["02:45", "13:10", "17:05", "21:15", "22:50"]



window.onload = function() {
    initialise();
}

function initialise() {
    getTimes();
    for(let row=0; row < salahNames.length; row++) {
        let salah = document.createElement("div");
        salah.id = salahNames[row];
        salah.innerText = salahNames[row];
        salah.classList.add("column");
        document.getElementById("timetable").append(salah);

        let time = document.createElement("div");
        time.id = salahNames[row] + "-time";
        //time.innerText = salahTimes[row];
        time.classList.add("column");
        document.getElementById("timetable").append(time);
    }
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
}

function updateTable() {
    for(let row=0; row < salahNames.length; row++) {
        let time = document.getElementById(salahNames[row] + "-time");
        time.innerText = salahTimes[row];
    }
}

function updateCurrentTime() {
    const currentDate = new Date();

    const currentTime = currentDate.toLocaleTimeString("en-EN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
    });

    let timeStamp = document.getElementById("currentTime");
    timeStamp.innerText = currentTime;
}

function getTimes() {
    const apiUrl = 'https://api.aladhan.com/v1/calendarByCity/2024/6?city=London&country=United%20Kingdom&method=2';
    let salahJSONObj;
    const today = new Date();
    const formatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' });
    const formattedDate = formatter.format(today).replace(/\//g, "-");
    
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        salahJSONObj = data.data; //JSON.parse(data);
        //console.log(salahJSONObj);
        for(let day=0; day < salahJSONObj.length; day++) {
            let currentDate = salahJSONObj[day].date.gregorian.date;
            if(currentDate == formattedDate) {
                for(let index = 0; index < salahTimes.length; index++) {
                    salahTimes[index] = salahJSONObj[day].timings[salahNames[index]];
                }
            }        
        }
        updateTable();
    })
    .catch(error => {
        console.error('Error:', error);
    });   
}