// Marks to CGPA Calculation
function calculateCGPA() {
    const marksInput = document.getElementById('marksInput').value;
    const outOfMarks = parseFloat(document.getElementById('outOfMarks').value) || 100;
    
    if (!marksInput.trim()) {
        alert('Please enter marks for at least one subject');
        return;
    }

    const marks = marksInput.split(',')
        .map(mark => parseFloat(mark.trim()))
        .filter(mark => !isNaN(mark));

    if (marks.length === 0) {
        alert('Please enter valid marks');
        return;
    }

    // Calculate total marks and percentage
    const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
    const percentage = (totalMarks / (marks.length * outOfMarks)) * 100;
    
    // Convert percentage to CGPA (assuming 10 point scale)
    let cgpa = (percentage / 9.5).toFixed(2);
    
    // Cap CGPA at 10
    cgpa = Math.min(cgpa, 10);

    // Display result
    const resultDiv = document.getElementById('cgpaResult');
    document.getElementById('cgpaValue').textContent = cgpa;
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('fade-in');
}

// Overall CGPA Calculation
let semesterCount = 1;

function addSemester() {
    semesterCount++;
    const semesterInputs = document.getElementById('semesterInputs');
    const semesterDiv = document.createElement('div');
    semesterDiv.className = 'flex gap-2 mb-2 fade-in';
    semesterDiv.innerHTML = `
        <input type="number" step="0.01" class="flex-1 p-2 border rounded" placeholder="Semester ${semesterCount} CGPA">
        <button onclick="removeSemester(this)" class="bg-red-500 text-white px-3 rounded hover:bg-red-600">-</button>
    `;
    semesterInputs.appendChild(semesterDiv);
}

function removeSemester(button) {
    // Don't remove the last semester input
    if (document.querySelectorAll('#semesterInputs > div').length <= 1) {
        alert('You need at least one semester');
        return;
    }
    button.parentElement.remove();
    // Update semester numbers
    const inputs = document.querySelectorAll('#semesterInputs input');
    inputs.forEach((input, index) => {
        input.placeholder = `Semester ${index + 1} CGPA`;
    });
    semesterCount = inputs.length;
}

function calculateOverallCGPA() {
    const inputs = document.querySelectorAll('#semesterInputs input');
    const cgpas = [];
    
    inputs.forEach(input => {
        const value = parseFloat(input.value);
        if (!isNaN(value) && value >= 0 && value <= 10) {
            cgpas.push(value);
        }
    });

    if (cgpas.length === 0) {
        alert('Please enter at least one valid CGPA');
        return;
    }

    const totalCGPA = cgpas.reduce((sum, cgpa) => sum + cgpa, 0) / cgpas.length;
    
    // Display result
    const resultDiv = document.getElementById('overallCGPAResult');
    document.getElementById('overallCGPAValue').textContent = totalCGPA.toFixed(2);
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('fade-in');
}

// Allow pressing Enter in input fields
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('marksInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculateCGPA();
    });
    
    document.getElementById('outOfMarks').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') calculateCGPA();
    });
});
