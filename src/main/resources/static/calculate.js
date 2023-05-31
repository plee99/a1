let records = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

const grades = ["a+", "a", "a-", "b+", "b", "b-", "c+", "c", "c-", "d", "f"];
const bounds = [];

function LowerBounds() {
    for (var i = 0; i < grades.length; i++) {
        let grade = Number(document.getElementById(grades[i]).value);
        bounds[i] = grade;
        
    }
    return bounds;
}

function updateHistogram() {
    const lower_bounds = LowerBounds();
    const histogram = grades.map(() => 0);
    const max = Number(document.querySelector('[name="max"]').value);

    console.log(grades);
    console.log(lower_bounds);
    console.log(histogram);

    records.forEach((marks) => {
        marks = (marks/max)*100;
        let index = lower_bounds.findIndex((grade) => marks >= grade);
        histogram[index] += 1;
    });

    histogram.forEach((count, i) => {
        var hist = document.getElementById(grades[i].toUpperCase()).querySelector(".hist");
        hist.offsetWidth = ((count/records.length) % 100);
        hist.innerText = count;
    });
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

var button = document.querySelector('input[value="Submit"]');
button.addEventListener('click', function(evt) {
    evt.preventDefault();
    var input = document.getElementById('newGrade').value;
    records.push(Number(input));
    console.log(records);
    updateHistogram();
});

window.onload = function() {
    updateHistogram();
};

