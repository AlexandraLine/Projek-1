document.addEventListener("DOMContentLoaded", function() {
    const skillBars = document.querySelectorAll(".skill-percentage");

    skillBars.forEach(skillBar => {
        const percentage = skillBar.getAttribute("data-percentage");
        skillBar.style.width = `${percentage}%`;
    });
});
