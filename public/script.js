// header 
  
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 60) { 
        header.style.opacity = '0.2';  
    } else {
        header.style.opacity = '1';
    }
});


//Dark mode for body 


const toggleBtn = document.getElementById("toggle-btn");
const theme = document.body;
let darkMode = localStorage.getItem("dark-mode");


const enableDarkMode = () => {
    theme.classList.add("dark-mode-theme");
    localStorage.setItem("dark-mode" , "enabled");

};

const disableDarkMode = () =>{
    theme.classList.remove("dark-mode-theme");
    localStorage.setItem("dark-mode" , "disabled");

};

if(darkMode === "enabled"){
    enableDarkMode();
}

toggleBtn.addEventListener("click" , () =>{
    darkMode = localStorage.getItem("dark-mode");
    if(darkMode === "disabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

