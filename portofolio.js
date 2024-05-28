var statusText = document.getElementById("status");
var statuses = ["Fresh Graduate", "Teknik Komputer dan Jaringan"];
var index = 0;

setInterval(function () {
    index = (index + 1) % statuses.length;
    statusText.textContent = statuses[index];
}, 2000);

function toggleSidebar() {
    document.querySelector(".container").classList.toggle("open");
}

function closeSidebar() {
    document.querySelector(".container").classList.remove("open");
}

document.addEventListener("click", function (event) {
    const container = document.querySelector(".container");
    const sidebar = document.querySelector(".sidebar");
    const menuIcon = document.querySelector(".menu-icon");

    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
        closeSidebar();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const skillBars = document.querySelectorAll(".skill-percentage");
  
    function animateSkillBars() {
        skillBars.forEach(skillBar => {
            skillBar.style.width = '0';
            const percentage = skillBar.getAttribute("data-percentage");
            setTimeout(() => {
                skillBar.style.width = `${percentage}%`;
            }, 100);
        });
    }

    animateSkillBars();

    window.addEventListener("pageshow", function(event) {
        if (event.persisted) {
            animateSkillBars();
        }
    });

    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === 'visible') {
            animateSkillBars();
        }
    });
});
