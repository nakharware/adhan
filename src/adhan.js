var salahNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
var salahTimes = ["02:45", "13:10", "17:05", "21:15", "22:50"]



window.onload = function() {
    initialise();
}

function initialise() {
    const currentDate = new Date();

    const currentTime = currentDate.toLocaleTimeString("en-EN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
    });

    for(let row=0; row < salahNames.length; row++) {
        let salah = document.createElement("div");
        salah.id = salahNames[row];
        salah.innerText = salahNames[row];
        salah.classList.add("column");
        document.getElementById("timetable").append(salah);

        let time = document.createElement("div");
        time.id = salahNames[row] + "-time";
        time.innerText = salahTimes[row];
        time.classList.add("column");
        document.getElementById("timetable").append(time);
    }

    let timeStamp = document.getElementById("currentTime");
    timeStamp.innerText = currentTime;
}