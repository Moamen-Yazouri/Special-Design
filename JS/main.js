const landingPage = document.querySelector(".landing-page");
const links = document.querySelectorAll(".links li a");
let arrayOfImages = [];
let imageIndex = 1;
// Getting the background images
for(let i = 1; i < 5; i++) {
    arrayOfImages.push(`../images/0${i}.jpg`);
}

// Activaion Link On Hover
activationOnHover(links);

function activationOnHover (links) {
    for (const link of links) {
        link.addEventListener("click", () => {

            links.forEach(link => {
                if(link.classList.contains("active")) {
                    link.classList.remove("active")
                }
            });

            link.classList.add("active")
        });
    }
}

const settingsBox = document.querySelector(".settings-box");
const settingsToggel = document.querySelector(".settings-box .settings-toggel i");

settingsToggel.addEventListener("click", () => {

    settingsToggel.classList.toggle("fa-spin")
    settingsBox.classList.toggle("open");
});

const colorsList = document.querySelectorAll(".settings-box .settings-content .box .colors li");

const colorItem = localStorage.getItem("color");
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

let changeIntervalId;
function changeBgcImage(arr, index) {

    changeIntervalId = setInterval(() => {
        if (index == arr.length) { 
            index = 0;    
        } 
        landingPage.style.backgroundImage = `url(${arr[index++]})`;
    }, 3500);
    
}

// On Off customization
const onOff = document.querySelector(".on-off");
onOff.addEventListener("click", () => {

    onOff.classList.toggle("active");

    if(onOff.classList.contains("active")) {
        // Change bgc Image every 3.5 seconds
        changeBgcImage(arrayOfImages, imageIndex);

        localStorage.setItem("changeBgc", "active");
    }
    else {
        localStorage.setItem("changeBgc", "not-active");
        clearInterval(changeIntervalId);
    }
});

// Retrive the selected change status from local storage
const changBgcState = localStorage.getItem("changeBgc");

// Assigning it.
if(changBgcState === "active") {

    onOff.classList.add('active');
    // Change bgc Image every 3.5 seconds
    changeBgcImage(arrayOfImages, imageIndex);

}

let skillsSection = document.querySelector(".our-skills");
let skillsBoxes = document.querySelectorAll(".our-skills .skill .progress span")
window.onscroll = () => {
    // section scroll Height
    let secScrollHeight = skillsSection.offsetHeight;

    // Scroll Top of section edge height
    let secOuterHeight = skillsSection.offsetTop;

    // Visisble Content Scroll Height 
    let visibleScroll = window.innerHeight;

    // Scrolling
    let scrolling = window.scrollY;

    if(scrolling > (secScrollHeight + secOuterHeight) - scrolling) {
        skillsBoxes.forEach(skill => {
            const width = skill.getAttribute("data-progress")

            let percent = document.createElement("span");
            percent.className = "percent";
            percent.textContent = `${width}`
            
            skill.style.width = width;

            setTimeout(() => {
                skill.parentElement.appendChild(percent)
            }, 200)
        })
    }
}   

let images = document.querySelectorAll(".gallery .container img");

images.forEach(img => {
    img.addEventListener("click", (e) => {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        // Create PopUp box
        let popUpBox = document.createElement("div");
        popUpBox.className = "popup-box";
        overlay.appendChild(popUpBox);

        if(img.alt !== null) {
            
            let h2 = document.createElement("h2");

            h2.textContent = img.alt;

            popUpBox.appendChild(h2)
        }

        let close = document.createElement("div");
        close.className = "close-btn";
        close.textContent = "X";
        popUpBox.appendChild(close)
        popUpBox.appendChild(e.target);
    });
});
// Close the popUp customization
document.addEventListener("click", (e) => {
    if(e.target.className === "close-btn") {
        pop = e.target.parentElement;
        over = pop.parentElement;
        over.remove();
    }
})

