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
        displayCourses(coursesData);

    } catch (error) {
        console.error(error);
        document.querySelector("#error").innerHTML =
      "<p>Fel vid anslutning - prova igen senare!</p>";
    }
}