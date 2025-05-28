// This file contains JavaScript functionality for Task 1, handling any interactive elements or dynamic behavior.

document.addEventListener('DOMContentLoaded', function() {
    const crossIcon = document.querySelector('.cross-icon');
    const polaroid = document.getElementById('polaroid');

    crossIcon.addEventListener('click', function() {
        polaroid.classList.toggle('showNextTab');
    });

    const radioButtons = document.querySelectorAll('input[name="option"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            alert(`You selected: ${this.value}`);
        });
    });
});