document.addEventListener("DOMContentLoaded",()=>
{
    fetchAndDisplayCourses();

    document.getElementById("search").addEventListener("input", filterCourses);
})