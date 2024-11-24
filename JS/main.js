const sectionsNode = document.body.children;
const sections = Array.from(sectionsNode);
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

            assignActive(links, link);
            removeActivation(Bullets);
            
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

        assignActive(colorsList, e.currentTarget);

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
let skillsBoxes = document.querySelectorAll(".our-skills .skill .progress span");
let reached = false;

window.onscroll = () => {
    // section scroll Height
    let secScrollHeight = skillsSection.offsetHeight;

    // Scroll Top of section edge height
    let secOuterHeight = skillsSection.offsetTop;

    // Visisble Content Scroll Height 
    let visibleScroll = window.innerHeight;

    // Scrolling
    let scrolling = window.scrollY;

    if(scrolling > (secScrollHeight + secOuterHeight) - visibleScroll && !reached) {
        reached = true;
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

    sections.forEach((sec) => {
        if(sec.children !== undefined && sec.children.length > 0) {
            if(sec.children[0].className === "heading-container") {

                let heading = sec.children[0].children[0];
                const secHeight = sec.offsetHeight;
                const secOuterHeight = sec.offsetTop;

                    if(scrolling > ((secOuterHeight + secHeight)/1.8) && !sec.classList.contains("visible")) {

                        heading.style.cssText = "transform: translateY(-20px); --pseudo-width: 50%;"

                    }
            }
        }
    })
    
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
});

// Scale Effect on click for testimonials
const tests = document.querySelectorAll(".testimonials .test");

tests.forEach(test => {

    test.addEventListener("click", (e) => {

        if(e.currentTarget.classList.contains("active")) {

            e.currentTarget.classList.toggle("active");

        }

        else {

            assignActive(tests, e.target);

        }

    });

});

// Bullets Customization
const Bullets = document.querySelectorAll("nav .bullets");

Bullets.forEach(bul => {
    bul.addEventListener("click", (e) => {

        if(e.currentTarget.classList.contains("active")) {

            e.currentTarget.classList.remove("active");
            localStorage.setItem("activated-bullet", "none");

        }

        else {
            const section = document.querySelector(`.${e.currentTarget.dataset.section}`);

            assignActive(Bullets, e.currentTarget);

            localStorage.setItem("activated-bullet", e.currentTarget.dataset.section);
    
            section.scrollIntoView({
                behavior: "smooth"
            }); 

        }

    })

})

const bultesOnOff = document.querySelector(".settings-box .box .bullet");
const nav = document.querySelector("nav");

bultesOnOff.addEventListener("click", (e) => {

    e.currentTarget.classList.toggle("active");

    if(e.currentTarget.classList.contains("active")) {

        nav.style.display = "block";
        localStorage.setItem("nav-display", "block");

    }
    
    else {

        nav.style.display = "none";
        localStorage.setItem("nav-display", "none");

    }

});

// Local Storage for Bullets
if(localStorage.getItem("nav-display")) {

    nav.style.display = localStorage.getItem("nav-display");

    if(localStorage.getItem("nav-display") === "none") {

        bultesOnOff.classList.remove("active");

    }


    if (localStorage.getItem("activated-bullet") !== "none"){

        document.querySelector(`.${localStorage.getItem("activated-bullet")}`).scrollIntoView({
            behavior: 'smooth'
        });

        Bullets.forEach(bul => {

            if(bul.dataset.section === localStorage.getItem("activated-bullet")) {
                bul.classList.add("active")
            }

        })
    }

}
// Reset Settings
const resetButton = document.querySelector(".reset-button");

resetButton.addEventListener("click", () => {
    localStorage.clear(); 
    sessionStorage.setItem("scrollReset", "true"); 
    window.location.reload(); 
});

// Reset scroll after reload
if (sessionStorage.getItem("scrollReset") === "true") {
    window.scrollTo(0, 0); 
    sessionStorage.removeItem("scrollReset"); 
}

// Handle activeation function
function assignActive (eleList, el) {

    eleList.forEach(el => {
        el.classList.remove("active")
    })

    el.classList.add("active");
}

function removeActivation(eleList) {
    eleList.forEach(el => {
        el.classList.remove("active");
    })
}

