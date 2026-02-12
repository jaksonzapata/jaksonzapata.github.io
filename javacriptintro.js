function tickUp() {
    let counter = document.getElementById("counter");
    counter.textContent = parseInt(counter.textContent) + 1;
}

function tickDown() {
    let counter = document.getElementById("counter");
    counter.textContent = parseInt(counter.textContent) - 1;
}

function runForLoop() {
    let counter = parseInt(document.getElementById("counter").textContent);
    let result = "";
    for (let i = 0; i <= counter; i++) {
        result += i + " ";
    }
    document.getElementById("forLoopResult").textContent = result;
}

function showOddNumbers() {
    let counter = parseInt(document.getElementById("counter").textContent);
    let result = "";
    for (let i = 1; i <= counter; i++) {
        if (i % 2 !== 0) {
            result += i + " ";
        }
    }
    document.getElementById("oddNumberResult").textContent = result;
}

function addMultiplesToArray() {
    let counter = parseInt(document.getElementById("counter").textContent);
    let multiples = [];

    for (let i = counter; i >= 5; i--) {
        if (i % 5 === 0) {
            multiples.push(i);
        }
    }

    console.log(multiples);
}

function printCarObject() {
    let carType = document.getElementById("carType").value;
    let carMPG = document.getElementById("carMPG").value;
    let carColor = document.getElementById("carColor").value;

    let carObject = {
        cType: carType,
        cMPG: carMPG,
        cColor: carColor
    };

    console.log(carObject);
}

function loadCar(num) {
    let car;
    if (num === 1) {
        car = carObject1;
    } else if (num === 2) {
        car = carObject2;
    } else if (num === 3) {
        car = carObject3;
    }

    document.getElementById("carType").value = car.cType;
    document.getElementById("carMPG").value = car.cMPG;
    document.getElementById("carColor").value = car.cColor;
}

function changeColor(num) {
    let paragraph = document.getElementById("styleParagraph");
    if (num === 1) {
        paragraph.style.color = "red";
    } else if (num === 2) {
        paragraph.style.color = "green";
    } else if (num === 3) {
        paragraph.style.color = "blue";
    }
}
