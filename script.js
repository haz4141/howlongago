function calculateTime() {
    const inputDate = new Date(document.getElementById('date').value);
    const currentDate = new Date();
    const resultElement = document.getElementById('result');

    // Validate input
    if (!document.getElementById('date').value) {
        resultElement.classList.remove('show');
        setTimeout(() => {
            resultElement.textContent = '⚠️ Please select a date and time first!';
            resultElement.classList.add('show');
        }, 100);
        return;
    }

    // Check if date is in the future
    if (inputDate > currentDate) {
        resultElement.classList.remove('show');
        setTimeout(() => {
            resultElement.textContent = '🔮 This date is in the future!';
            resultElement.classList.add('show');
        }, 100);
        return;
    }

    const timeDifference = currentDate - inputDate;
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const monthsDifference = Math.floor(daysDifference / 30); // Approximation
    const yearsDifference = Math.floor(monthsDifference / 12); // Approximation


    const seconds = secondsDifference % 60;
    const minutes = minutesDifference % 60;
    const hours = hoursDifference % 24;
    const days = daysDifference % 30;
    const months = monthsDifference % 12;
    const years = yearsDifference;


    const result = [];


    if (years > 0) {
        result.push(`${years} year${years > 1 ? 's' : ''}`);
    }
    if (months > 0) {
        result.push(`${months} month${months > 1 ? 's' : ''}`);
    }
    if (days > 0) {
        result.push(`${days} day${days > 1 ? 's' : ''}`);
    }
    if (hours > 0) {
        result.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    }
    if (minutes > 0) {
        result.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    }
    if (seconds > 0) {
        result.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
    }

    // Remove show class first for re-animation
    resultElement.classList.remove('show');

    // Set new content and re-add animation
    setTimeout(() => {
        if (result.length === 0) {
            resultElement.textContent = '🎉 Just now!';
        } else {
            resultElement.textContent = `⏳ That was ${result.join(', ')} ago`;
        }
        resultElement.classList.add('show');
    }, 100);
}

// Add keyboard support for Enter key
document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date');

    dateInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            calculateTime();
        }
    });

    // Set max date to current date/time
    const now = new Date();
    const maxDateTime = now.toISOString().slice(0, 16);
    dateInput.setAttribute('max', maxDateTime);
});

// Helper function to get time difference in milliseconds
function getTimeDifference() {
    const inputDate = new Date(document.getElementById('date').value);
    const currentDate = new Date();

    if (!document.getElementById('date').value) {
        return null;
    }

    if (inputDate > currentDate) {
        return null;
    }

    return currentDate - inputDate;
}

// Format number with commas for readability
function formatNumber(num) {
    return num.toLocaleString();
}

// Show quick result with animation
function showQuickResult(label, value, unit) {
    const quickResult = document.getElementById('quick-result');
    quickResult.classList.remove('show');

    setTimeout(() => {
        quickResult.innerHTML = `
            <div class="result-label">${label}</div>
            <div class="result-value">${formatNumber(value)}</div>
            <div class="result-unit">${unit}</div>
        `;
        quickResult.classList.add('show');
    }, 100);
}

// Show error message
function showQuickError(message) {
    const quickResult = document.getElementById('quick-result');
    quickResult.classList.remove('show');

    setTimeout(() => {
        quickResult.innerHTML = `
            <div class="result-label">⚠️ Error</div>
            <div class="result-value" style="font-size: 16px;">${message}</div>
        `;
        quickResult.classList.add('show');
    }, 100);
}

// Show exact days
function showExactDays() {
    const diff = getTimeDifference();
    if (diff === null) {
        showQuickError('Please select a valid date first!');
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    showQuickResult('Total Days', days, days === 1 ? 'day' : 'days');
}

// Show exact hours
function showExactHours() {
    const diff = getTimeDifference();
    if (diff === null) {
        showQuickError('Please select a valid date first!');
        return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    showQuickResult('Total Hours', hours, hours === 1 ? 'hour' : 'hours');
}

// Show exact minutes
function showExactMinutes() {
    const diff = getTimeDifference();
    if (diff === null) {
        showQuickError('Please select a valid date first!');
        return;
    }

    const minutes = Math.floor(diff / (1000 * 60));
    showQuickResult('Total Minutes', minutes, minutes === 1 ? 'minute' : 'minutes');
}

// Show exact seconds
function showExactSeconds() {
    const diff = getTimeDifference();
    if (diff === null) {
        showQuickError('Please select a valid date first!');
        return;
    }

    const seconds = Math.floor(diff / 1000);
    showQuickResult('Total Seconds', seconds, seconds === 1 ? 'second' : 'seconds');
}
