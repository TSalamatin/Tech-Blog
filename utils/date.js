function TodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Ensure two digits for day
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
    const year = today.getFullYear();

    return `${day}/${month}/${year}`
}

module.exports = { TodayDate}