const today = new Date();
const allMonths = [
  "Jan",
  "Fev",
  "Mar",
  "Avr",
  "Mai",
  "Juin",
  "Juil",
  "Aout",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const daysOfWeeek = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const yearNum = document.getElementById("yearNum");
const content = document.querySelector(".wrapper");
const calendar = document.getElementById("calendar");
const monthRow = document.querySelector(".months");
const upperSection = document.querySelector(".up-section");
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const $today = new Date(currentYear, currentMonth, today.getDate());
const $btnL = document.querySelector(".triangle-left");
const $btnR = document.querySelector(".triangle-right");

yearNum.textContent = currentYear;

function changeYear() {
  if (calendar.innerHTML != "") {
    document.querySelector(".isSelected").classList.remove("isSelected");
  }
  calendar.innerHTML = "";
}

$btnL.addEventListener("click", function () {
  yearNum.textContent -= 1;
  changeYear();
});
$btnR.addEventListener("click", function () {
  yearNum.textContent -= -1;
  changeYear();
});

function goToToday() {
  const button = document.createElement("button");
  button.classList.add("btn");
  button.textContent = "Aujourd'hui";
  upperSection.appendChild(button);
}
goToToday();
const $todayBtn = document.querySelector(".btn");

function createMonthsRow() {
  allMonths.forEach((month) => {
    let monthCell = document.createElement("span");
    monthCell.classList.add(`${month}`);
    monthCell.classList.add("month");
    monthCell.textContent = month;
    monthRow.appendChild(monthCell);
  });
}
createMonthsRow();

function createWeekRow() {
  const daysRow = document.createElement("tr");
  daysOfWeeek.forEach((day) => {
    let headerCell = document.createElement("th");
    headerCell.textContent = day;
    daysRow.appendChild(headerCell);
  });
  calendar.appendChild(daysRow);
}
createWeekRow();

function createDays(year, month) {
  const startDate = new Date(year, month);
  const endDate = new Date(year, month + 1);
  let count = 0;
  let row = document.createElement("tr");
  for (let i = 0; i < startDate.getDay(); i++) {
    let emptyDay = document.createElement("td");
    emptyDay.textContent = "";
    row.appendChild(emptyDay);
    count++;
  }
  while (startDate < endDate) {
    let day = document.createElement("td");
    day.textContent = startDate.getDate();
    if (count % 7 == 0 && count != 0) {
      row = document.createElement("tr");
    }
    if (
      startDate.getDate() == today.getDate() &&
      startDate.getMonth() == currentMonth &&
      startDate.getFullYear() == currentYear
    ) {
      day.classList.add("blue");
    }
    row.appendChild(day);
    calendar.appendChild(row);
    startDate.setDate(startDate.getDate() + 1);
    count++;
  }
}

function indicateMonth(month) {
  document
    .querySelector("." + `${allMonths[month]}`)
    .classList.add("isSelected");
}

createDays(today.getFullYear(), today.getMonth());
indicateMonth(currentMonth);

for (let i = 0; i < 12; i++) {
  const $month = document.querySelector("." + `${allMonths[i]}`);
  const $months = document.querySelectorAll(".month");
  $month.addEventListener("click", function () {
    $months.forEach((month) => {
      if ($month != month) {
        month.classList.remove("isSelected");
      }
    });
    calendar.innerHTML = "";
    createWeekRow();
    createDays(yearNum.textContent, i);
    $month.classList.add("isSelected");
  });
}

$todayBtn.addEventListener("click", function () {
  changeYear();
  createWeekRow();
  createDays(today.getFullYear(), today.getMonth());
  indicateMonth(currentMonth);
  yearNum.textContent = today.getFullYear();
});
