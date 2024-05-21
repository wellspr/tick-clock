const braceSeconds = document.getElementById("brace-seconds");
const braceMinutes = document.getElementById("brace-minutes");
const braceHours = document.getElementById("brace-hours");
const digitalClock = document.getElementById("digital");

const clock = document.querySelector(".clock");

const markContainer = document.querySelector(".mark-container");

for (let i=0; i<60; i++) {
    const node = markContainer.cloneNode(true);
    clock.appendChild(node);
}

const marks = document.querySelectorAll(".mark-container");
marks.forEach((mark, index) => {
    mark.classList.add(index)
    mark.setAttribute("style", `transform: rotate(${6 * index}deg)`)
})

setInterval(() => {
    let date = new Date();
    
    let seconds = date.getSeconds();
    let minutes = date.getMinutes();
    let hours = date.getHours();

    /*  angle spanned by the seconds brace during one second 
        = 360deg / 60sec = 6deg

        The rate is 6deg per second. Hence, the current angle is obtained 
        multiplying the current second value by 6: 
    */
    let secondsAngle = seconds * 6; 

    /*  angle spanned by the minutes brace during one minute 
        is equal to 360deg / 60min = 6deg / min; 
        
        During each second the minutes brace spans an additional angle of
        6deg / 60sec = 0.1 deg/sec
    */
    let minutesAngle = (minutes * 6) + (seconds * 0.1); 

    /*  angle spanned by the hours brace during one hour 
        is equal to 360deg / 12h = 30deg/h; 

        at each minute this brace rotates an additional angle of 
        30deg / 60 = 0.5deg;

        Additionally, during each second the brace rotates by 0.5deg / 60 = (1/120)deg;
    */
    let hoursAngle = (hours * 30) + (minutes * 0.5) + (seconds * 1/120); 

    braceSeconds.style.transform = `rotate(${secondsAngle}deg)`;
    braceMinutes.style.transform = `rotate(${minutesAngle}deg)`;
    braceHours.style.transform = `rotate(${hoursAngle}deg)`;

    //digitalClock.innerHTML = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    document.querySelector(".current__date").innerHTML = `${date.toLocaleDateString()}`;
    document.querySelector(".current__time").innerHTML = `${date.toTimeString()}`;
}, 1000);