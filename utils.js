function generateDueDate(){
    // Get the current date
    const currentDate = new Date();

    // Add two days to the current date
    const futureDateInMs = currentDate.getTime() + (2 * 24 * 60 * 60 * 1000);
    return new Date(futureDateInMs);
}

function generateUniqueId() {
    // Generate a random 16-digit alphanumeric string
    let id = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
}

module.exports = {
    generateDueDate,
    generateUniqueId
}