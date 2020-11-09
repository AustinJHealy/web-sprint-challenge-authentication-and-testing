function validateUser(user) {
    let errors = [];

    if (!user.username || user.username.length < 8) {
        errors.push('Must have a minimum of eight characters');
    }
    if (!user.password || user.password.length < 8) {
        errors.push('Must have a minimum of eight characters')
    }
    return {
        isSuccessful: errors.length > 0 ? false : true,
        errors,
    }
}

module.exports = {
    validateUser
}