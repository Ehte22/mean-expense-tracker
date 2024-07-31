const validator = require("validator")

exports.customValidator = (data) => {
    let isError = false
    let error = []

    for (const key in data) {
        if (data[key] === "" && validator.isEmpty(data[key])) {
            isError = true
            error.push(`${key} is required`)
        }
    }

    if (data.tags) {
        for (let i = 0; i < data.tags.length; i++) {
            console.log(data.tags[i].key, data.tags[i].value);
            if (validator.isEmpty(data.tags[i].key) && validator.isEmpty(data.tags[i].value)) {
                isError = true
                error.push(`key or value must be required`)
            }
        }
    }

    if (data.name && !validateName(data.name)) {
        isError = true;
        error.push("Name must contain only alphabets and no spaces");
    }


    if (data.email && !validator.isEmail(data.email)) {
        isError = true
        error.push("Please enter a valid email")
    }

    if (data.phone && !validator.isMobilePhone(data.phone, "en-IN", { strictMode: false })) {
        isError = true
        error.push("Please enter a valid phone number")
    }

    if (data.password && data.cpassword) {
        if (data.password !== data.cpassword) {
            isError = true;
            error.push("Passwords do not match");
        }

    }

    return { isError, error }
}

const validateName = (name) => {
    const isAlpha = validator.isAlpha(name, 'en-US');
    const noSpaces = !/\s/.test(name);
    return isAlpha && noSpaces;
}
