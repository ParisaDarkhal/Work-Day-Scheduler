// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  let now = dayjs();

  let startTime = 9;
  let endTime = 18;

  let currentDate = now.format("MM-DD-YYYY");
  // let currentHour = dayjs().format("hA");
  let currentHour = dayjs().startOf("day").hour();
  // console.log("currentHour :>> ", currentHour);
  let mainContainer = $(".main-container");
  let workHours = [];

  for (let hour = startTime; hour < endTime; hour++) {
    workHours.push(dayjs().startOf("day").hour(hour).format("hA"));
  }

  for (let i = 0; i < workHours.length; i++) {
    $(mainContainer).append(generateRow(workHours[i]));

    let myNewDiv = $("#hour-" + parseInt(workHours[i]));

    if (workHours[i] === currentHour) {
      myNewDiv.addClass("present");
    } else if (dayjs(workHours[i]).isBefore(currentHour)) {
      myNewDiv.addClass("past");
    } else {
      myNewDiv.addClass("future");
    }
  }

  $(mainContainer).click($("button"), function () {
    console.log("i am clicked");
  });
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  function generateRow(hour) {
    let newDiv =
      "<div id='hour-" +
      parseInt(hour) +
      "' class='row time-block'>" +
      "<div class='col-2 col-md-1 hour text-center py-3'>" +
      hour +
      "</div>" +
      "<textarea class='col-8 col-md-10 description' rows='3'>" +
      "</textarea>" +
      "<button class='btn saveBtn col-2 col-md-1' aria-label='save'>" +
      "<i class='fas fa-save' aria-hidden='true'></i></button>" +
      "</div>";

    return newDiv;
  }
});