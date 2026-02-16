// let entryClose = document.getElementById("entry-close");
// let entry = document.getElementById("entry");
// entryClose.addEventListener("click", () => {
//     entry.style.display = "none";
// });

let about = document.getElementById("about");
let aboutIcon = document.getElementById("about-icon");
let learnMoreMobile = document.getElementById("learn-more-mobile");
let descriptionCloseMobile = document.getElementById("close-description-mobile");
aboutIcon.addEventListener("click", () => {
    about.classList.toggle("hide");
    aboutIcon.classList.toggle("closed");
    learnMoreMobile.classList.toggle("show");
});

let control = document.getElementById("control");
let controlIcon = document.getElementById("control-icon");
controlIcon.addEventListener("click", () => {
    control.classList.toggle("hide");
    controlIcon.classList.toggle("closed");
});

let learnMore = document.getElementById("learn-more");
let descriptionClose = document.getElementById("close-description");
let description = document.getElementById("description");
learnMore.addEventListener("click", () => {
    description.classList.add("show");
});
learnMoreMobile.addEventListener("click", () => {
    description.classList.add("show");descriptionCloseMobile.classList.add("show");
});
descriptionClose.addEventListener("click", () => {
    description.classList.remove("show");
});
descriptionCloseMobile.addEventListener("click", () => {
    description.classList.remove("show");
    descriptionCloseMobile.classList.remove("show");
});


//Poem into design

const words = document.querySelectorAll(".word");
const positions = [];

function getRandomNum(min, max){
  min = Math.ceil(min); 
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let minFontSize = document.getElementById("min-font-size");
document.getElementById("min-font-size-display").innerHTML = `${minFontSize.value}`;
minFontSize.addEventListener("input", () => {
  document.getElementById("min-font-size-display").innerHTML = `${minFontSize.value}`;
  document.getElementById("min-font-size-example").style.fontSize = `${minFontSize.value}px`;
});

let maxFontSize = document.getElementById("max-font-size");
document.getElementById("max-font-size-display").innerHTML = `${maxFontSize.value}`;
maxFontSize.addEventListener("input", () => {
  document.getElementById("max-font-size-display").innerHTML = `${maxFontSize.value}`;
  document.getElementById("max-font-size-example").style.fontSize = `${maxFontSize.value}px`;
});

function setFontSize(){
    let fontSizeMax = Number(document.getElementById("max-font-size").value);
    let fontSizeMin = Number(document.getElementById("min-font-size").value);

    const words = document.querySelectorAll(".word");
    words.forEach(word => {
    let fontSize = getRandomNum(fontSizeMin, fontSizeMax);
    word.style.fontSize = `${fontSize}px`;
    });
};

function checkOverlap(rect1, rect2, padding = 20) {
  return !(rect1.right + padding < rect2.left || 
           rect1.left > rect2.right + padding || 
           rect1.bottom + padding < rect2.top || 
           rect1.top > rect2.bottom + padding);
}

// function setPositions() {
//   positions.length = 0; // Clear previous positions
  
//   words.forEach(word => {
//     let placed = false;
//     let attempts = 0;
//     const maxAttempts = 100;
    
//     while (!placed && attempts < maxAttempts) {
//         const wordWidth = word.offsetWidth;
//         const wordHeight = word.offsetHeight;

//         const maxLeft = window.innerWidth - wordWidth;
//         const maxTop = window.innerHeight - wordHeight;

//         let top = getRandomNum(0, maxTop);
//         let left = getRandomNum(0, maxLeft);
        
//         word.style.top = `${top}px`;
//         word.style.left = `${left}px`;
//         word.style.opacity = 1;
        
//         const rect = word.getBoundingClientRect();
        
//         // Check if overlaps with any existing word
//         const overlaps = positions.some(pos => checkOverlap(rect, pos));
        
//         if (!overlaps || attempts === maxAttempts - 1) {
//             positions.push(rect);
//             placed = true;
//         }
        
//         attempts++;
//         }
//     });
// }

function setPositions() {
  positions.length = 0;
  
  words.forEach(word => {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;
    
    while (!placed && attempts < maxAttempts) {
      const wordWidth = (word.offsetWidth / window.innerWidth) * 100;
      const wordHeight = (word.offsetHeight / window.innerHeight) * 100;

      const maxLeft = Math.max(0, 100 - wordWidth);
      const maxTop = Math.max(0, 100 - wordHeight);

      let top = getRandomNum(0, maxTop);
      let left = getRandomNum(0, maxLeft);
      
      word.style.top = `${top}%`;
      word.style.left = `${left}%`;

      // Force clamp on mobile
      if (window.innerWidth <= 431) {
        const rect = word.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
            word.style.left = `${window.innerWidth - rect.width}px`;
        }
        if (rect.bottom > window.innerHeight) {
            word.style.top = `${window.innerHeight - rect.height}px`;
        }
      }

      word.style.opacity = 1;
      
      const rect = word.getBoundingClientRect();
      const overlaps = positions.some(pos => checkOverlap(rect, pos));
      
      if (!overlaps || attempts === maxAttempts - 1) {
        positions.push(rect);
        placed = true;
      }
      
      attempts++;
    }
  });
}

function setRotation(){
  words.forEach(word => {
  let degNum = getRandomNum(1, 4);
  if (degNum ===1){
    let deg=0;
    word.style.transform = `rotate(${deg}deg)`;
  } else if (degNum===2){
    let deg=90;
    word.style.transform = `rotate(${deg}deg)`;
  } else if (degNum===3){
    let deg=180;
    word.style.transform = `rotate(${deg}deg)`;
  } else {
    let deg=270;
    word.style.transform = `rotate(${deg}deg)`;
  };
  });
};

function checkForRotation(){
    let rotation = document.getElementById("rotation");
    if (rotation.checked) {
        setRotation();
    } else {
        words.forEach(word => {
            word.style.transform = 'rotate(0deg)';
        });
    }
}



function setTransition(){
  const words = document.querySelectorAll(".word");
  let i=0.1;
  words.forEach(word => {
  
    word.style.transitionDelay = `${i}s`;
  i += 0.02;
  });
};

function setColor() {
    const marloweWord = document.querySelectorAll(".marlowe-word");
    let id = 1;
    let color= 0;
    let colorPref = document.getElementById("color");
    if (colorPref.checked){
        while (id < 323) {
        let target= document.getElementById(`${id}`);
        target.style.color= `hsl(${color} 30% 30%)`;
        color += 5;
        id++;
        }
    } else {
        let id = 1;
        const marloweWords = document.querySelectorAll(".marlowe-word");
        while (id < 323) {
        let target= document.getElementById(`${id}`);
        target.style.color= `#000000`;
        id++
        }
        words.forEach(word => {
            word.style.color = '#000000';
            marloweWords.forEach(marloweWord => {
                marloweWord.style.color = '#2c2c2c';
            })
        });
    }

}

let loading = document.getElementById("loading");


let createButton= document.getElementById('create-button');

function create() {
    document.body.classList.remove("easter-egg");
    document.documentElement.classList.remove("easter-egg");
    document.getElementById("texts").style.height = '100vh';
    window.scrollTo({ top: 0, behavior: 'instant' });

    words.forEach(word => {
        word.style.transitionDelay = '0s';
        word.style.opacity = 0;
    });

    if (getComputedStyle(about).display === "block"){
        about.classList.add("hide");
        aboutIcon.classList.add("closed");
    };
    if (getComputedStyle(description).display === "flex") {
        description.classList.remove("show");
    };
    if (getComputedStyle(learnMoreMobile).display === "flex") {
        learnMoreMobile.classList.add("show");
    };
    let fontSizeMax = Number(document.getElementById("max-font-size").value);
    let fontSizeMin = Number(document.getElementById("min-font-size").value);
    if (fontSizeMax < fontSizeMin) {
        let id = 1;
        let color= 0;
        while (id < 323) {
            let target= document.getElementById(`${id}`);
            target.style.color= `hsl(${color} 30% 30%)`;
            color += 5;
            id++;
            }
        words.forEach(word => {
                word.style.transform = 'rotate(0deg)';
                word.style.fontSize = '20px';
            });
        setTransition();
        easterEgg();
    } else {
        loading.innerHTML = "CREATING...";
        loading.style.display = "flex";
        setColor();
        setTransition();
        setFontSize();
        checkForRotation();
        setPositions();
        setTimeout(() => {
            loading.innerHTML = "COMPLETED!"}, 6540);
        setTimeout(() => {
            loading.style.display = "none"}, 7540);
        }
};


createButton.addEventListener("click", create);


let resetButton= document.getElementById('reset-button');
// resetButton.addEventListener("click", () => {
//     document.body.classList.remove("easter-egg");
//     document.documentElement.classList.remove("easter-egg");
//   words.forEach(word => {
//     word.style.transitionDelay = '0s';
//     word.style.opacity= 0;
//   });
//   loading.style.display = "none";
// });

resetButton.addEventListener("click", () => {
    document.body.classList.remove("easter-egg");
    document.documentElement.classList.remove("easter-egg");
    document.getElementById("texts").style.height = '100vh';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    words.forEach(word => {
        word.style.transitionDelay = '0s';
        word.style.opacity = 0;
    });
    loading.style.display = "none";
});

let printButton= document.getElementById("print-button");
printButton.addEventListener("click", () => {
    window.print();
});

//easter egg bruh

// function easterEgg() {
//     document.body.classList.add("easter-egg");
//     document.documentElement.classList.add("easter-egg");
//     if (getComputedStyle(control).display === "block"){
//         control.classList.add("hide");
//         controlIcon.classList.add("closed");
//     };
//     let t=0;
//     let l=0;
//     let direction = 1;
    
//     words.forEach(word => {
//         word.style.top = `calc(100px + ${t}%)`;
//         word.style.left = `calc(30px + ${l}%)`;
//         word.style.opacity = 1;

//         t += 2;
//         l += direction;
        
//         if(l >= 85){
//             direction = -1;
//             }
        

//         if(l < 0){
//             direction = 1;
//             }
//         }
//   );
// }

function easterEgg() {
    document.body.classList.add("easter-egg");
    document.documentElement.classList.add("easter-egg");
    
    let t = 10;
    let l = 0;
    let direction = 1;
    
    // Set texts height to fit all words
    const totalWords = words.length;
    document.getElementById("texts").style.height = `${totalWords * 3}vh`;
    
    words.forEach(word => {
        word.style.top = `${t}vh`;
        word.style.left = `calc(30px + ${l}%)`;
        word.style.opacity = 1;
        t += 3;
        l += direction;
        if (l >= 85) direction = -1;
        if (l < 0) direction = 1;
    });
}