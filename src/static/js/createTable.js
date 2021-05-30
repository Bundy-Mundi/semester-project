const TABLE = document.getElementById("table");
console.log(TABLE);

let CLASS_SCHEDULE = [{
    Week: 1,
    Begins: "03/08",
    Topics: ["Introduction", " Chapter 1: Values, Types, Operators", " Assignment 1 due 11:59pm 03/14"]
}, {
    Week: 2,
    Begins: "03/15",
    Topics: ["Chapter 2: Programming Structure", "  Assignment 2 due 11:59pm 03/21"]
}, {
    Week: 3,
    Begins: "03/22",
    Topics: ["Chapter 3: Functions", "  Assignment 3 due 11:59pm 03/28"]
}, {
    Week: 4,
    Begins: "03/29",
    Topics: ["Chapter 4: Data Structure // Objects and Arrays", "  Assignment 4 due 11:59pm 04/04"]
}, {
    Week: 5,
    Begins: "04/05",
    Topics: ["Chapter 5: Higher Functions", "  Assignment 5 due 11:59pm 04/11", "  Test 1: Tuesday 12am(04/06) - Friday 12:00pm (04/09)"]
}, {
    Week: 6,
    Begins: "04/19",
    Topics: ["Chapter 6: The Secret Life Of Objects", " Chapter 8: Bugs and Errors ", " Assignment 6 due 11:59pm 04/25"]
}, {
    Week: 7,
    Begins: "04/26",
    Topics: ["Chapter 13: JavaScript and the Browser ", " Chapter 14: The Document Object Model ", "  Assignment 7 due 11:59pm 05/02"]
}, {
    Week: 8,
    Begins: "05/03",
    Topics: ["Chapter 11: Asynchronous Programming ", " Chapter 15: Handling Events ", "  Assignment 8 due 11:59pm 05/09"]
}, {
    Week: 9,
    Begins: "05/10",
    Topics: ["Chapter 18: HTTP and Forms ", "  Assignment 9 due 11:59pm 05/16"]
}, {
    Week: 10,
    Begins: "05/17",
    Topics: ["Chapter 20: Node.js // Express.js ", "  Assignment 10 due 11:59pm 05/23"]
}, {
    Week: 11,
    Begins: "05/24",
    Topics: ["JQuery // AJAX (Lecture Notes) ", "  Bonus Assignment due 11:59pm 05/30 (but you may submit until the end of the semester"]
}, {
    Week: 12,
    Begins: "05/31",
    Topics: ["No Assignment ", "  Test 2: Monday 12am (05/31) - Thursday 11:59pm(06/03)", " Please take this week to finish up your semester project as well ", " Semester Project due Saturday 11:59pm(06/05) "]
}, {
    Week: 13,
    Begins: "06/06",
    Topics: ["SEMESTER ENDS!!!!!!!"]
},

];

function buildTable(data) { //create function for table

    /* thead */
    let table = document.createElement("table");

    let row = document.createElement("tr");

    let thead = document.createElement('thead');

    let th1 = document.createElement("th");

    let weekCols = document.createTextNode("Week");

    let th2 = document.createElement("th");

    let beginCols = document.createTextNode("Begins");

    let th3 = document.createElement("th");

    let chpCols = document.createTextNode("Chapters/Topic[Eloquent Javascript 3rd Edition]");

    // Styling
    table.className = "mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden";
    thead.className = "bg-gray-50";
    row.className = "text-gray-600 text-left";
    th1.className = "font-semibold text-sm uppercase px-6 py-4";
    th2.className = "font-semibold text-sm uppercase px-6 py-4";
    th3.className = "font-semibold text-sm uppercase px-6 py-4"; 

    th1.appendChild(weekCols);

    th2.appendChild(beginCols);

    th3.appendChild(chpCols);

    row.appendChild(th1);

    row.appendChild(th2);

    row.appendChild(th3);

    thead.appendChild(row);

    table.appendChild(thead);

    /* tbody */ 
    let tbody = document.createElement("tbody");

    // Styling
    tbody.className = "divide-y divide-gray-200";

    for (let i = 0; i < data.length; i++)
    { //create row elements
        let row = document.createElement("tr");

        let td1 = document.createElement("td");

        let weekCols = document.createTextNode(data[i].Week);

        let td2 = document.createElement("td");

        let beginCols = document.createTextNode(data[i].Begins);

        let td3 = document.createElement("td");

        for (let j = 0; j < data[i].Topics.length; j++) { //matching rows to columns

            let br = document.createElement("br"); //break element to create paragraph

            let chpCols = document.createTextNode(data[i].Topics[j]); //match row to corresponding column

            td3.appendChild(br);

            td3.appendChild(chpCols);

            td3.appendChild(br);
        }

        td1.appendChild(weekCols);

        td2.appendChild(beginCols);

        // Styling
        row.className = "hover:bg-gray-200";
        td1.className = "px-6 py-4 font-thin text-sm";
        td2.className = "px-6 py-4 font-thin text-sm";
        td3.className = "px-6 py-4 font-thin text-sm"; 

        row.appendChild(td1);

        row.appendChild(td2);

        row.appendChild(td3);

        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    return table;
}
TABLE.appendChild(buildTable(CLASS_SCHEDULE));