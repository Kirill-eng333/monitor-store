
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.rating-area').forEach(area => {
        const inputs = area.querySelectorAll('input');
        if (inputs.length === 0) return;

        const name = inputs[0].name; // например rating-1
        const savedValue = localStorage.getItem(name);

        if (savedValue) {
            const inputToCheck = area.querySelector(`input[value="${savedValue}"]`);
            if (inputToCheck) {
                inputToCheck.checked = true;
            }
        }
    });
});

document.querySelectorAll('.rating-area input').forEach(input => {
    input.addEventListener('change', function () {
        const productId = this.name; // например rating-1
        const value = this.value;

        localStorage.setItem(productId, value);
    });
});