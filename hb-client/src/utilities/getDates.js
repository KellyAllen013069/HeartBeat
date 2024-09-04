export const getClassDates = (day, month) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const startDate = new Date(currentYear, month - 1, 1);
    const endDate = new Date(currentYear, month, 1);
    const applicableDates = [];

    // Loop through each day from the start date to the end date
    for (let date = new Date(startDate); date < endDate; date.setDate(date.getDate() + 1)) {
        if (date.getDay() === day) {
            applicableDates.push(new Date(date));
        }
    }

    return applicableDates;
};
