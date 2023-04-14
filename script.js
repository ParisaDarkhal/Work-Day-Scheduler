// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // displaying the current date in the header of the page.
  let now = dayjs().format("MM/DD/YYYY");
  $("#currentDay").html(now);
  let startTime = 9;
  let endTime = 18;

  let currentHour = dayjs().format("H");
  let mainContainer = $(".main-container");
  let workHours = [];

  for (let hour = startTime; hour < endTime; hour++) {
    workHours.push(hour);
  }

  for (let i = 0; i < workHours.length; i++) {
    $(mainContainer).append(generateRow(workHours[i]));
    //getting any user input that was saved in localStorage and set the values of the corresponding textarea elements.
    let inputText = $("#hour-" + workHours[i] + " .description");

    if (localStorage.getItem("textInput" + workHours[i])) {
      $(inputText).val(localStorage.getItem("textInput" + workHours[i]));
      $(inputText).text(localStorage.getItem("textInput" + workHours[i]));
    }

    $(inputText).change(function (event) {
      $(inputText).val(event.target.value);
      $(inputText).text(inputText.val());

      localStorage.setItem("textInput" + workHours[i], inputText.val());
    });
    // applying the past, present, or future class to each time block by comparing the id to the current hour, using day.js.
    let myNewDiv = $("#hour-" + workHours[i]);

    if (workHours[i] == currentHour) {
      myNewDiv.addClass("present");
    } else if (workHours[i] < currentHour) {
      myNewDiv.addClass("past");
    } else {
      myNewDiv.addClass("future");
    }
  }

  //getting the save btn, adding event listener and assign the function to save input from text area
  $(mainContainer).click($("button"), function () {
    console.log("I am clicked");
  });

  // when the page is loading, generates the rows and assigns all the sub-divs and sub-components to it
  function generateRow(hour) {
    let hour12ver;
    if (hour < 12) {
      hour12ver = hour + "AM";
    } else if (hour === 12) {
      hour12ver = hour + "PM";
    } else {
      hour12ver = hour - 12 + "PM";
    }

    let newDiv =
      "<div id='hour-" +
      hour +
      "' class='row time-block'>" +
      "<div class='col-2 col-md-1 hour text-center py-3'>" +
      hour12ver +
      "</div>" +
      "<textarea class='col-8 col-md-10 description' rows='3' value=''>" +
      "</textarea>" +
      "<button class='btn saveBtn col-2 col-md-1' aria-label='save'>" +
      "<i class='fas fa-save' aria-hidden='true'></i></button>" +
      "</div>";

    return newDiv;
  }
});
