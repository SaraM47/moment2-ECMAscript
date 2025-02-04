document.addEventListener("DOMContentLoaded",()=> {
    fetchAndDisplayCourses();

    document.getElementById("search").addEventListener("input", filterCourses);

    document.querySelectorAll(".sortable").forEach(header => {
        header.addEventListener("click", () => sortCourses(header.dataset.column));
    });
});

