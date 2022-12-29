exports.getNameOfMonth = (userDate) => {
    const date = new Date(userDate);
    return date.toLocaleDateString('default', { month: 'long' })
}