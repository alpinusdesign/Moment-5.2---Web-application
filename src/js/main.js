"use strict";

// API-URL.
const url = "http://localhost/rest/index.php/";

/* = Variables = */
/* - Form navigation-bindings - */
const createToggleEl = document.getElementById("createToggle");
const updateToggleEl = document.getElementById("updateToggle");
const deleteToggleEl = document.getElementById("deleteToggle");

/* - Form bindings - */
const createFormEl = document.getElementById("createForm");
const updateFormEl = document.getElementById("updateForm");
const deleteFormEl = document.getElementById("deleteForm");

/* - Form input-bindings - */
/* - Create-form - */
const createCodeEl = document.getElementById("createCode");
const createNameEl = document.getElementById("createName");
const createProgressionEl = document.getElementById("createProgression");
const createPlanEl = document.getElementById("createPlan");
/* - Update-form - */
const updateCodeEl = document.getElementById("updateCode");
const updateNameEl = document.getElementById("updateName");
const updateProgressionEl = document.getElementById("updateProgression");
const updatePlanEl = document.getElementById("updatePlan");
/* - Delete-form - */
const deleteCodeEl = document.getElementById("deleteCode");

/* - Table-binding - */
const courseListEl = document.getElementById("courseTableBody");

/* - Functions - */
async function getCourses() {
  fetch(url)
    .then(function(response) {
      if (response.status !== 200) {
        console.log("An error has occured. Status code: " + response.status);
        return;
      }
      response.json().then(data => {
        displayCourses(data);
      });
    })
    .catch(function(err) {
      console.log("Fatal error: ", err);
    });
}

/* - Displays courses - */
function displayCourses(courses) {
  courseListEl.innerHTML = ""; // Empty the table-body element.
  updateCodeEl.innerHTML = ""; // Reset the update-form's select element.
  deleteCodeEl.innerHTML = ""; // Reset the delete-form's select element.

  courses.forEach(course => {
    /* - Update table - */
    courseListEl.insertRow(); // Add new row to table.

    if (course.PlanURL !== null) {
      // Insert row data.
      courseListEl.lastChild.innerHTML =
        "<td>" +
        course.Code +
        "</td>" +
        "<td>" +
        course.Name +
        "</td>" +
        "<td>" +
        course.Progression +
        "</td>" +
        "<td><a href=" +
        course.PlanURL +
        ">" +
        course.PlanURL +
        "</a></td>";
    } else {
      // Print a filler text if no syllabus-URL has been entered.
      courseListEl.lastChild.innerHTML =
        "<td>" +
        course.Code +
        "</td>" +
        "<td>" +
        course.Name +
        "</td>" +
        "<td>" +
        course.Progression +
        "</td><td>Ej angiven </td>";
    }

    /* - Update the update form's select element. */
    updateCodeEl.innerHTML +=
      "<option value" + course.Code + ">" + course.Code + "</option>";

    /* - Update the delete form's select element. */
    deleteCodeEl.innerHTML +=
      "<option value" + course.Code + ">" + course.Code + "</option>";
  });
}

/* = Event listeners = */
/* - Form navigation toggle - */
createToggle.addEventListener("click", function(e) {
  // Toggle nav-elements.
  e.target.classList.add("active");
  updateToggleEl.classList.remove("active");
  deleteToggleEl.classList.remove("active");
  // Toggle forms.
  createFormEl.classList.add("active");
  updateFormEl.classList.remove("active");
  deleteFormEl.classList.remove("active");
});

updateToggle.addEventListener("click", function(e) {
  // Toggle nav-elements.
  e.target.classList.add("active");
  createToggleEl.classList.remove("active");
  deleteToggleEl.classList.remove("active");
  // Toggle forms.
  updateFormEl.classList.add("active");
  createFormEl.classList.remove("active");
  deleteFormEl.classList.remove("active");
});

deleteToggle.addEventListener("click", function(e) {
  // Toggle nav-elements.
  e.target.classList.add("active");
  updateToggleEl.classList.remove("active");
  createToggleEl.classList.remove("active");
  // Toggle forms.
  deleteFormEl.classList.add("active");
  updateFormEl.classList.remove("active");
  createFormEl.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function() {
  /* */
  deleteFormEl.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the form from being submited the default way.

    console.log(deleteCodeEl.value);

    fetch(url, {
      method: "DELETE",
      body: JSON.stringify({
        code: deleteCodeEl.value
      })
    })
      .then(function(response) {
        if (response.status !== 200) {
          console.log("An error has occured. Status code: " + response.status);
          return;
        }
        response.json().then(data => {
          displayCourses(data); // Display courses on successfull fetch.
        });
      })
      .catch(function(err) {
        console.log("Fatal error: ", err);
      });
  });
  getCourses();
});

/*
document.getElementById("createForm").addEventListener("submit", function(e)
{
    e.preventDefault();
    const formData = new FormData();
    formData.append();
    
    fetch(url, {
        method: 'post',
        body: 'formData'
    }).then(
        function (response){
            if(response.status !== 200)
            {
                console.log(response.status);
                return;
            }
            response.json().then(function(data){
                displayCourses(data);
            });
        }
    ).catch(function(err){
        console.log("Fatal error: ", err);
    });
});
*/
