let entryClose = document.getElementById("entry-close");
let entry = document.getElementById("entry");
entryClose.addEventListener("click", () => {
    entry.style.display = "none";
});

let about = document.getElementById("about");
let aboutIcon = document.getElementById("about-icon");
let aboutClose = document.getElementById("about-close");
aboutIcon.addEventListener("click", () => {
    about.classList.toggle("show");
    aboutIcon.classList.toggle("opened");
})

let control = document.getElementById("control");
let controlIcon = document.getElementById("control-icon");
controlIcon.addEventListener("click", () => {
    control.classList.toggle("show");
    controlIcon.classList.toggle("opened");
})


//Poem into design]

const words = document.querySelectorAll(".word");
const positions = [];

function getRandomNum(min, max){
  min = Math.ceil(min); 
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

function setPositions() {
  positions.length = 0; // Clear previous positions
  
  words.forEach(word => {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;
    
    while (!placed && attempts < maxAttempts) {
      let top = getRandomNum(0, 90);
      let left = getRandomNum(0, 85);
      
      word.style.top = `${top}%`;
      word.style.left = `${left}%`;
      word.style.opacity = 1;
      
      const rect = word.getBoundingClientRect();
      
      // Check if overlaps with any existing word
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
    let rotation = document.getElementById("rotation").value;
    if (rotation === "Yes") {
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
  i += 0.1;
  });
};

function setColor() {
    const marloweWord = document.querySelectorAll(".marlowe-word");
    let id = 1;
    let color= 0;
    let colorPref = document.getElementById("color").value;
    if (colorPref === "color"){
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

// createButton.addEventListener("click", setColor);
// createButton.addEventListener("click", setTransition);
// createButton.addEventListener("click", setFontSize);
// // createButton.addEventListener("click", setTopVal);
// // createButton.addEventListener("click", setLeftVal);
// createButton.addEventListener("click", checkForRotation);
// createButton.addEventListener("click", setPositions);

function create() {
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
            loading.innerHTML = "COMPLETED!"}, 32200);
        setTimeout(() => {
            loading.style.display = "none"}, 35200);
        }
};


createButton.addEventListener("click", create);


let resetButton= document.getElementById('reset-button');
resetButton.addEventListener("click", () => {
  words.forEach(word => {
    word.style.transitionDelay = '0s';
    word.style.opacity= 0;
  });
  loading.style.display = "none";
});

//easter egg bruh

function easterEgg() {
    let t=0;
    let l=0;
    let direction = 1;
    words.forEach(word => {
        word.style.top = `calc(30px + ${t}%)`;
        word.style.left = `calc(30px + ${l}%)`;
        word.style.opacity = 1;

        t += 2;
        l += direction;
        
        if(l >= 85){
            direction = -1;
            }
        

        if(l < 0){
            direction = 1;
            }
        }
  );
}

// document.addEventListener("keypress", function(event){

//    if (event.key === 'l') {
//     let id = 1;
//     let color= 0;
//     while (id < 323) {
//         let target= document.getElementById(`${id}`);
//         target.style.color= `hsl(${color} 30% 30%)`;
//         color += 5;
//         id++;
//         }
//     words.forEach(word => {
//             word.style.transform = 'rotate(0deg)';
//             word.style.fontSize = '20px';
//         });
//     setTransition();
//     easterEgg();
//    }
// })

// let fontSizeMax = Number(document.getElementById("max-font-size").value);
// let fontSizeMin = Number(document.getElementById("min-font-size").value);
// if (fontSizeMax < fontSizeMin) {
//     let id = 1;
//     let color= 0;
//     while (id < 323) {
//         let target= document.getElementById(`${id}`);
//         target.style.color= `hsl(${color} 30% 30%)`;
//         color += 5;
//         id++;
//         }
//     words.forEach(word => {
//             word.style.transform = 'rotate(0deg)';
//             word.style.fontSize = '20px';
//         });
//     setTransition();
//     easterEgg();
//    };


function playEasterEgg() {
    
}