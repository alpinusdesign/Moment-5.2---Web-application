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

function displayCourses(courses) {
  // Empty the table-body element.
  courseListEl.innerHTML = "";
  // Reset the update-form's select element.
  updateCodeEl.innerHTML = "";
  // Reset the delete-form's select element.
  deleteCodeEl.innerHTML = "";

  courses.forEach(course => {
    /* - Update table - */
    // Add new row to table.
    courseListEl.insertRow();
    // Insert row data.
    if(course.PlanURL !== null) // If a URL for the course plan has been entered, print it. Otherwise, print a filler text.
    {
        courseListEl.lastChild.innerHTML = "<td>"+ course.Code + "</td>" + "<td>" + course.Name + "</td>" + "<td>" + course.Progression + "</td>" + "<td><a href=" + course.PlanURL + ">" + course.PlanURL +"</a></td>";
    }
    else
    {
        courseListEl.lastChild.innerHTML = "<td>"+ course.Code + "</td>" + "<td>" + course.Name + "</td>" + "<td>" + course.Progression + "</td><td>Ej angiven </td>";
    }

    /* - Update the update form's select element. */
    updateCodeEl.innerHTML += "<option value" + course.Code + ">" + course.Code + "</option>";

    /* - Update the delete form's select element. */
    deleteCodeEl.innerHTML += "<option value" + course.Code + ">" + course.Code + "</option>";
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
