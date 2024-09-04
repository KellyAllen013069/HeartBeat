
export const formatCurrency = (num, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(num);
}

export const formatTime = (militaryTime) => {
    if (militaryTime == null) return militaryTime;
    // Parse hours and minutes from input
    militaryTime = militaryTime.substr(0,5);
    const [hours, minutes] = militaryTime.split(":").map(Number);

    // Determine AM or PM
    //const amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert from military to 12-hour format
    const twelveHour = hours % 12 || 12;

    // Create formatted string
    const formattedTime = `${twelveHour}:${minutes.toString().padStart(2, "0")}`;

    // Return formatted string
    return formattedTime;
}

export const  displayDay = (day) => {
    if (typeof day !== 'string') {
        console.error("Invalid day value:", day);
        return "";
    }
    return day.slice(0, 3).toUpperCase(); // Using slice instead of substr
}

