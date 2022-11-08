const isValidRequestBody = (value) => {
    return Object.keys(value).length > 0
}

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === Number && value.trim().length === 0) return false
    return true
}

const isValidName = (/^[a-zA-Z ]*$/);

let isValidEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

module.exports={isValidRequestBody,isValid,isValidEmail,isValidName}
    
