function calculateTime() {
    const inputDate = new Date(document.getElementById('date').value);
    const currentDate = new Date();

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

    if (result.length === 0) {
        document.getElementById('result').textContent = "Just now";
    } else {
        document.getElementById('result').textContent = `That was ${result.join(', ')} ago.`;
    }
}
