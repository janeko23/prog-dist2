function isValidDate(dateString) {

    var datePattern = /^(19[5-9][0-9]|20[0-4][0-9]|2050)[/](0?[1-9]|1[0-2])[/](0?[1-9]|[12][0-9]|3[01])$/;

    var matchArray = dateString.match(datePattern);

    if (matchArray == null) {
        return false;
    }
    var cleanDateString = dateString.replace(/\D/g, '');

    var year = parseInt(cleanDateString.substr(0, 4));
    var month = parseInt(cleanDateString.substr(4, 2));
    var day = parseInt(cleanDateString.substr(6, 2));


    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
        daysInMonth[1] = 29;
    }

    if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
        return false;
    }
    return true;
}