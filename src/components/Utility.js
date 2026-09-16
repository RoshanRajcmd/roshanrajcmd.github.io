export function getYearsAndMonthsSince(dateString) {
    const startDate = new Date(dateString);
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months };
}

export function getYearsAndMonthsSinceInWords(dateString, returnShortForm = false) {
    const { years, months } = getYearsAndMonthsSince(dateString);
    let yoeInWords = "";

    if (returnShortForm) {
        if (years >= 1) {
            yoeInWords += `${years}y`;
        } else if (months >= 1) {
            yoeInWords += `${months}m`;
        }
        return yoeInWords;
    } else {
        if (years > 0 && months > 0) {
            return `${years} year${years !== 1 ? "s" : ""} and ${months} month${months !== 1 ? "s" : ""}`;
        } else if (years > 0) {
            return `${years} year${years !== 1 ? "s" : ""}`;
        } else if (months > 0) {
            return `${months} month${months !== 1 ? "s" : ""}`;
        } else {
            return "Less than a month";
        }
    }
}
