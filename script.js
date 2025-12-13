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
	

    const seconds = secondsDifference % 60;
    const minutes = minutesDifference % 60;
    const hours = hoursDifference % 24;
    const days = daysDifference % 30;
    const months = monthsDifference % 30;


    const result = [];


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
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    
    dateInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculateTime();
        }
    });

    // Set max date to current date/time
    const now = new Date();
    const maxDateTime = now.toISOString().slice(0, 16);
    dateInput.setAttribute('max', maxDateTime);
});

