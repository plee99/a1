//variables
let records = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];
const grades = ["a+", "a", "a-", "b+", "b", "b-", "c+", "c", "c-", "d", "f"];
const bounds = [];
var min = -100;
var max = 200;
var length = grades.length;
var error = document.getElementById('error');
var submitError = document.getElementById('submitError');

//check if input is a number
function validateInput(number) {
    if (isNaN(number)) {
        submitError.innerHTML = "<span style='color: red;'>"+
        "Value is not a number</span>";
    }
    else if (number > parseFloat(document.getElementById('max').value) || number < parseFloat(document.getElementById('f').value)) {
        submitError.innerHTML = "<span style='color: red;'>"+
        "Enter number within range</span>";
    }
    else {
        submitError.innerHTML = "";
        records.push(parseFloat(number));
    }
}

//check if input are within bounds
function validateBounds() {
    error.innerHTML = "";
    for (var i = 0; i < length; i++) {
        var j = i+1;
        var z = i-1;
        var grade = parseFloat(document.getElementById(grades[i]).value);
        var prevGrade;
        var nextGrade;
        if (z < 0) {
            prevGrade = parseFloat(document.querySelector('[name="max"]').value);
            nextGrade = parseFloat(document.getElementById(grades[j]).value);
            if (prevGrade > max) {
                error.innerHTML = "<span style='color: red;'>"+
                "Max is 200</span>";
            }
        }
        else if (j === length) {
            nextGrade = min;
            prevGrade = parseFloat(document.getElementById(grades[z]).value);
        }
        else {
            prevGrade = parseFloat(document.getElementById(grades[z]).value);
            nextGrade = parseFloat(document.getElementById(grades[j]).value);
        }
        if (grade >= prevGrade || grade <= nextGrade) {
            error.innerHTML = "<span style='color: red;'>"+
            "Enter valid number within range! MAX = 200, MIN = -100</span>";
        }
        else {
            bounds[i] = grade;
        }
        
    }
    return bounds;
}

//update graphics for every input
function updateHistogram() {
    
    const lower_bounds = validateBounds();
    const histogram = grades.map(() => 0);

    records.forEach((marks) => {
        let index = lower_bounds.findIndex((grade) => marks >= grade);
        histogram[index] += 1;
    });

    hist = document.getElementsByClassName("hist");
    for (var i = 0; i < histogram.length; i++) {
        var count = histogram[i] * 10;
        hist[i].style.width = count.toString() + "px";
        hist[i].innerHTML = count / 10;
    }
}


document.querySelector('[name="max"]').addEventListener("change", 
(e) => {
    updateHistogram();
});
       
grades.forEach((grade) => {
    document.getElementById(grade).addEventListener("change", 
    (e) => {
        updateHistogram();
    });
});

//update graphic for every button input
var button = document.querySelector('input[value="Submit"]');
button.addEventListener('click', function(evt) {
    evt.preventDefault();
    var input = document.getElementById('newGrade').value;
    validateInput(input);
    updateHistogram();
});

window.onload = function() {
    updateHistogram();
};

