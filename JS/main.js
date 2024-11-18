const landingPage = document.querySelector(".landing-page");
const links = document.querySelectorAll(".links li a");
let arrayOfImages = [];
let imageIndex = 0;
// Getting the background images
for(let i = 1; i < 5; i++) {
    arrayOfImages.push(`../images/0${i}.jpg`);
}

// Change bgc Image every 3.5 seconds
changeBgcImage(arrayOfImages, imageIndex);

// Activaion Link On Hover
activationOnHover (links);

function changeBgcImage(arr, index) {
    setInterval(() => {
        if (index == arr.length) { 
            index = 0;    
        } 
        landingPage.style.backgroundImage = `url(${arr[index++]})`;
    }, 5500);
    
}
function activationOnHover (links) {
    for (const link of links) {
        link.addEventListener("mouseenter", () => {
            link.classList.add("active")
        });

        link.addEventListener("mouseleave", () => {
            link.classList.remove("active")
        });
    }
}

const settingsBox = document.querySelector(".settings-box");
const settingsToggel = document.querySelector(".settings-box .settings-toggel i");
const colorItem = localStorage.getItem("color");

settingsToggel.addEventListener("click", () => {

    settingsToggel.classList.toggle("fa-spin")
    settingsBox.classList.toggle("open");
});

const colorsList = document.querySelectorAll(".settings-box .settings-content .box .colors li");

if(colorItem) {
    
    colorsList.forEach(li => {
        if(li.dataset.color === colorItem) {
            li.classList.add("active");
        }
        else {
            li.classList.remove("active");
        }
    });

    document.documentElement.style.setProperty("--main-color", colorItem);
}
colorsList.forEach(li => {

    li.addEventListener("click", (e) => {
        colorsList.forEach(li => {
            if(li.classList.contains("active")) {
                li.classList.remove("active");
                localStorage.removeItem("color");
            }
        });

        e.currentTarget.classList.add("active");
        document.documentElement.style.setProperty("--main-color", e.currentTarget.dataset.color);
        localStorage.setItem("color", e.currentTarget.dataset.color)
    });

});
