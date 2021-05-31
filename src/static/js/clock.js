var dateTime = new Date(); //current date and time
var hour = dateTime.getHours(); ///current hour (0-23)
var hello = document.getElementById("hello");
//Loop for determining time

if (hour < 12) {
    hello.innerText("Good Morning, ");
}
if (hour >= 12) {
    hour = hour - 12; //converts to 12hr clock
    if (hour < 6) {
        hello.innerText("Good Afternoon, ")
    }
    if (hour >= 6) {
        hello.innerText("Good Evening, ");
    }
}
hello.innerTextln(", Welcome to our CS81 Semester Project!!!!<h1> ");