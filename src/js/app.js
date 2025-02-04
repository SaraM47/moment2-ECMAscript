document.addEventListener("DOMContentLoaded",()=> {
    fetchAndDisplayCourses();

    document.getElementById("search").addEventListener("input", filterCourses);

    document.querySelectorAll(".sortable").forEach(header => {
        header.addEventListener("click", () => sortCourses(header.dataset.column));
    });
});

let coursesData = [];
let sortOrder = 1; 

async function fetchAndDisplayCourses() {
    const url = "https://webbutveckling.miun.se/files/ramschema_ht24.json";

    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Fel vid anslutning till data...");
        }

        coursesData = await response.json();
        printCourses(coursesData);

    } catch (error) {
        console.error(error);
        document.querySelector("#error").innerHTML =
      "<p>Fel vid anslutning - prova igen senare!</p>";
    }
}

function printCourses(courses) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    courses.forEach(course => {
        const coursesRow = document.createElement("tr");
        coursesRow.innerHTML = `
        <td>${course.code}</td>
        <td>${course.coursename}</td>
        <td>${course.progression}</td>
        <td><a href="${course.syllabus}" target="_blank">Visa kursplan</a></td>
        `;
        tableBody.appendChild(coursesRow);
  });
};

function filterCourses() {
    const searchText = document.getElementById("search").value.toLowerCase();
    const filteredCourses = coursesData.filter(course =>
        course.code.toLowerCase().includes(searchText) || 
        course.coursename.toLowerCase().includes(searchText)
    );
    printCourses(filteredCourses);
}