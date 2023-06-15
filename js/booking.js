let chosenTime = document.getElementById("chosen-time");
chosenTime.value = "";


const daysContainer = document.querySelector(".days"),
    nextBtn = document.querySelector(".next-btn"),
    prevBtn = document.querySelector(".prev-btn"),
    month = document.querySelector(".month"),
    todayBtn = document.querySelector(".today-btn");

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// get current date
const date = new Date();

// get current month
let currentMonth = date.getMonth();

// get current year
let currentYear = date.getFullYear();

// function to render days
function renderCalendar() {
    // get prev month current month and next month days
    date.setDate(1);
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1;

    // update current year and month in header
    month.innerHTML = `${months[currentMonth]} ${currentYear}`;

    // update days html
    let days = "";

    // prev days html
    for (let x = firstDay.getDay(); x > 0; x--) {
        days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
    }

    // current month days
    for (let i = 1; i <= lastDayDate; i++) {
        // check if its today then add today class
        if (
            i === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()
        ) {
            // if date month year matches add today
            days += `<div class="day today">${i}</div>`;
        } else {
            //else dont add today
            days += `<div class="day ">${i}</div>`;
        }
    }

    // next MOnth days
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next">${j}</div>`;
    }

    // run this function with every calendar render
    hideTodayBtn();
    daysContainer.innerHTML = days;
    processDayEvent();
    selectTime();
}

renderCalendar();

nextBtn.addEventListener("click", () => {
    // increase current month by one
    currentMonth++;
    if (currentMonth > 11) {
        // if month gets greater that 11 make it 0 and increase year by one
        currentMonth = 0;
        currentYear++;
    }
    // rerender calendar
    renderCalendar();
});

// prev monyh btn
prevBtn.addEventListener("click", () => {
    // increase by one
    currentMonth--;
    // check if let than 0 then make it 11 and deacrease year
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

// go to today
todayBtn.addEventListener("click", () => {
    // set month and year to current
    currentMonth = date.getMonth();
    currentYear = date.getFullYear();
    // rerender calendar
    renderCalendar();
});

// lets hide today btn if its already current month and vice versa

function hideTodayBtn() {
    if (
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear()
    ) {
        todayBtn.style.display = "none";
    } else {
        todayBtn.style.display = "flex";
    }
}


function processDayEvent() {
    // Get all the day elements

    const jours = document.querySelectorAll('.days .day');

    // Add click event listener to each day
    jours.forEach(day => {
        day.addEventListener('click', () => {
            // Reset color of all days
            jours.forEach(day => {
                day.style.backgroundColor = '';
            });

            // Change the color of the selected day
            day.style.backgroundColor = 'lightblue';
            let time = document.getElementById("time");
            let times = generateTime();
            let time1 = document.getElementById("1");
            let time2 = document.getElementById("2");
            let time3 = document.getElementById("3");
            let time4 = document.getElementById("4");
            let time5 = document.getElementById("5");
            let time6 = document.getElementById("6");
            time1.innerHTML = times[0];
            time2.innerHTML = times[1];
            time3.innerHTML = times[2];
            time4.innerHTML = times[3];
            time5.innerHTML = times[4];
            time6.innerHTML = times[5];


            time.style.display = "block";
            resetColors();
            chosenTime.value = "";
        });
    });
}

function generateTime() {
    const times = [];
    let i = 0;
    while (i < 6) {
        const hour = Math.floor(Math.random() * 15) + 8; // Random hour between 8 and 22
        const minutes = 0; // Random minutes

        // Format the time as a string with leading zeros
        const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        if (times.indexOf(formattedTime) != -1) {
            continue;
        } else {
            i++;
        }
        times.push(formattedTime);
    }
    times.sort((a, b) => {
        let ha = a.split(":");
        let hb = b.split(":");
        let h1 = parseInt(ha[0]);
        let h2 = parseInt(hb[0]);
        if (h1 > h2) {
            return 1;
        }
        if (h1 < h2) {
            return -1;
        }
        return 0;
    })
    return times;
}

function selectTime() {
    // Get all the day elements
    const hours = document.querySelectorAll('.hour');

    // Add click event listener to each day
    hours.forEach(hour => {
        hour.addEventListener('click', () => {
            // Reset color of all days
            hours.forEach(hour => {
                hour.style.backgroundColor = '#febf97';
            });

            // Change the color of the selected day
            hour.style.backgroundColor = 'white';
            chosenTime.value = "x";

        });
    });
}

function resetColors() {
    const hours = document.querySelectorAll('.hour');

    // Add click event listener to each day
    hours.forEach(hour => {

        hour.style.backgroundColor = '#febf97';

    });
}
function openPopup() {
    let response = checkRequired();
    if (!response) {
        alert("Date / time selection and all fields are required ");
        return;
    }
    document.getElementById("popup").style.display = "block";
}
function checkRequired() {
    let firstname = document.getElementById("firstname");
    let lastname = document.getElementById("lastname");
    let email = document.getElementById("email");
    let instructors = document.getElementById("instructors");
    let services = document.getElementById("service");
    if (firstname.value == "" || firstname.value == undefined ||
        lastname.value == "" || lastname.value == undefined ||
        email.value == "" || email.value == undefined ||
        instructors.value == "" || instructors.value == undefined ||
        service.value == "" || service.value == undefined || chosenTime.value == "") {
        return false;
    }
    return true;
}
function closePopup() {
    document.getElementById("popup").style.display = "none";
}