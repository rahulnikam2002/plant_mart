export const validationByRegex = (text, regexPattern) => {
    const regex = new RegExp(regexPattern);
    return regex.test(text)
}