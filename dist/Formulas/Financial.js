"use strict";
exports.__esModule = true;
var ArgsChecker_1 = require("../Utilities/ArgsChecker");
var TypeConverter_1 = require("../Utilities/TypeConverter");
var Errors_1 = require("../Errors");
var Date_1 = require("./Date");
var Filter_1 = require("../Utilities/Filter");
/**
 * Calculates the depreciation of an asset for a specified period using the double-declining balance method.
 * @param cost - The initial cost of the asset.
 * @param salvage - The value of the asset at the end of depreciation.
 * @param life - The number of periods over which the asset is depreciated.
 * @param period - The single period within life for which to calculate depreciation.
 * @param factor - [ OPTIONAL - 2 by default ] - The factor by which depreciation decreases.
 * @returns {number} depreciation of an asset for a specified period
 * @constructor
 */
var DDB = function (cost, salvage, life, period, factor) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 4, 5, "DDB");
    cost = TypeConverter_1.TypeConverter.firstValueAsNumber(cost);
    salvage = TypeConverter_1.TypeConverter.firstValueAsNumber(salvage);
    life = TypeConverter_1.TypeConverter.firstValueAsNumber(life);
    period = TypeConverter_1.TypeConverter.firstValueAsNumber(period);
    factor = factor === undefined ? 2 : TypeConverter_1.TypeConverter.firstValueAsNumber(factor);
    if (cost < 0) {
        throw new Errors_1.NumError("Function DDB parameter 1 value is "
            + cost + ". It should be greater than or equal to 0.");
    }
    if (salvage < 0) {
        throw new Errors_1.NumError("Function DDB parameter 2 value is "
            + salvage + ". It should be greater than or equal to 0.");
    }
    if (life < 0) {
        throw new Errors_1.NumError("Function DDB parameter 3 value is "
            + life + ". It should be greater than or equal to 0.");
    }
    if (period < 0) {
        throw new Errors_1.NumError("Function DDB parameter 4 value is "
            + period + ". It should be greater than or equal to 0.");
    }
    if (period > life) {
        throw new Errors_1.NumError("Function DDB parameter 4 value is "
            + life + ". It should be less than or equal to value of Function DB parameter 3 with " + period + ".");
    }
    if (salvage >= cost) {
        return 0;
    }
    var total = 0;
    var current = 0;
    for (var i = 1; i <= period; i++) {
        current = Math.min((cost - total) * (factor / TypeConverter_1.checkForDevideByZero(life)), (cost - salvage - total));
        total += current;
    }
    return current;
};
exports.DDB = DDB;
/**
 * Calculates the depreciation of an asset for a specified period using the arithmetic declining balance method.
 * @param cost - The initial cost of the asset.
 * @param salvage - The value of the asset at the end of depreciation.
 * @param life - The number of periods over which the asset is depreciated.
 * @param period - The single period within life for which to calculate depreciation.
 * @param month - [ OPTIONAL - 12 by default ] - The number of months in the first year of depreciation.
 * @returns {number} depreciated value
 * @constructor
 */
var DB = function (cost, salvage, life, period, month) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 4, 5, "DB");
    cost = TypeConverter_1.TypeConverter.firstValueAsNumber(cost);
    salvage = TypeConverter_1.TypeConverter.firstValueAsNumber(salvage);
    life = TypeConverter_1.TypeConverter.firstValueAsNumber(life);
    period = TypeConverter_1.TypeConverter.firstValueAsNumber(period);
    month = month !== undefined ? Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(month)) : 12;
    if (cost < 0) {
        throw new Errors_1.NumError("Function DB parameter 1 value is "
            + cost + ". It should be greater than or equal to 0.");
    }
    if (salvage < 0) {
        throw new Errors_1.NumError("Function DB parameter 2 value is "
            + salvage + ". It should be greater than or equal to 0.");
    }
    if (life < 0) {
        throw new Errors_1.NumError("Function DB parameter 3 value is "
            + life + ". It should be greater than or equal to 0.");
    }
    if (period < 0) {
        throw new Errors_1.NumError("Function DB parameter 4 value is "
            + period + ". It should be greater than or equal to 0.");
    }
    if (month > 12 || month < 1) {
        throw new Errors_1.NumError("Function DB parameter 5 value is "
            + month + ". Valid values are between 1 and 12 inclusive.");
    }
    if (period > life) {
        throw new Errors_1.NumError("Function DB parameter 4 value is "
            + life + ". It should be less than or equal to value of Function DB parameter 3 with " + period + ".");
    }
    if (salvage >= cost) {
        return 0;
    }
    if (cost === 0 && salvage !== 0) {
        throw new Errors_1.DivZeroError("Evaluation of function DB cause a divide by zero error.");
    }
    var rate = (1 - Math.pow(salvage / cost, 1 / life));
    var initial = cost * rate * month / 12;
    var total = initial;
    var current = 0;
    var ceiling = (period === life) ? life - 1 : period;
    for (var i = 2; i <= ceiling; i++) {
        current = (cost - total) * rate;
        total += current;
    }
    if (period === 1) {
        return initial;
    }
    else if (period === life) {
        return (cost - total) * rate;
    }
    else {
        return current;
    }
};
exports.DB = DB;
/**
 * Formats a number into the locale-specific currency format. WARNING: Currently the equivalent of TRUNC, since this
 * returns numbers
 * @param number - The value to be formatted.
 * @param places - [ OPTIONAL - 2 by default ] - The number of decimal places to display.
 * @returns {number} dollars
 * @constructor
 */
var DOLLAR = function (number, places) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "DOLLAR");
    var v = TypeConverter_1.TypeConverter.firstValueAsNumber(number);
    places = places !== undefined ? TypeConverter_1.TypeConverter.firstValueAsNumber(places) : 2;
    var sign = (v > 0) ? 1 : -1;
    var divisor = sign * (Math.floor(Math.abs(v) * Math.pow(10, places)));
    var pow = Math.pow(10, places);
    if (pow === 0 && divisor !== 0) {
        throw new Errors_1.DivZeroError("Evaluation of function DOLLAR cause a divide by zero error.");
    }
    return divisor / pow;
};
exports.DOLLAR = DOLLAR;
/**
 * Converts a price quotation given as a decimal fraction into a decimal value.
 * @param fractionalPrice - The price quotation given using fractional decimal conventions.
 * @param unit - The units of the fraction, e.g. 8 for 1/8ths or 32 for 1/32nds.
 * @returns {number} decimal value.
 * @constructor
 */
var DOLLARDE = function (fractionalPrice, unit) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "DOLLARDE");
    var dollar = TypeConverter_1.TypeConverter.firstValueAsNumber(fractionalPrice);
    var fraction = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(unit));
    if (fraction === 0) {
        throw new Errors_1.DivZeroError("Function DOLLARDE parameter 2 cannot be zero.");
    }
    var result = parseInt(dollar.toString(), 10);
    result += (dollar % 1) * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10)) / fraction;
    var power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1);
    if (power === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function DOLLARDE cause a divide by zero error.");
    }
    result = Math.round(result * power) / power;
    return result;
};
exports.DOLLARDE = DOLLARDE;
/**
 * Converts a price quotation given as a decimal value into a decimal fraction.
 * @param decimalPrice - The price quotation given as a decimal value.
 * @param unit - The units of the desired fraction, e.g. 8 for 1/8ths or 32 for 1/32nds
 * @returns {number} price quotation as decimal fraction.
 * @constructor
 */
var DOLLARFR = function (decimalPrice, unit) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "DOLLARFR");
    decimalPrice = TypeConverter_1.TypeConverter.firstValueAsNumber(decimalPrice);
    unit = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(unit));
    if (unit === 0) {
        throw new Errors_1.DivZeroError("Function DOLLARFR parameter 2 cannot be zero.");
    }
    var result = parseInt(decimalPrice.toString(), 10);
    result += (decimalPrice % 1) * Math.pow(10, -Math.ceil(Math.log(unit) / Math.LN10)) * unit;
    return result;
};
exports.DOLLARFR = DOLLARFR;
/**
 * Calculates the annual effective interest rate given the nominal rate and number of compounding periods per year.
 * @param nominalRate - The nominal interest rate per year.
 * @param periodsPerYear - The number of compounding periods per year.
 * @returns {number} annual effective interest rate
 * @constructor
 */
var EFFECT = function (nominalRate, periodsPerYear) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "EFFECT");
    var rate = TypeConverter_1.TypeConverter.firstValueAsNumber(nominalRate);
    var periods = TypeConverter_1.TypeConverter.firstValueAsNumber(periodsPerYear);
    if (rate <= 0) {
        throw new Errors_1.NumError("Function EFFECT parameter 1 value is " + rate + ". It should be greater than to 0");
    }
    if (periods < 1) {
        throw new Errors_1.NumError("Function EFFECT parameter 2 value is " + periods + ". It should be greater than or equal to 1");
    }
    periods = Math.floor(periods);
    return Math.pow(1 + rate / periods, periods) - 1;
};
exports.EFFECT = EFFECT;
/**
 * Calculates the periodic payment for an annuity investment based on constant-amount periodic payments and a constant
 * interest rate.
 * @param rate - The interest rate.
 * @param periods - The number of payments to be made.
 * @param presentValue - The current value of the annuity.
 * @param futureValue [ OPTIONAL ] - The future value remaining after the final payment has been made.
 * @param endOrBeginning [ OPTIONAL - 0 by default ] - Whether payments are due at the end (0) or beginning (1) of each
 * period.
 * @returns {number}
 * @constructor
 */
var PMT = function (rate, periods, presentValue, futureValue, endOrBeginning) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 3, 5, "PMT");
    rate = TypeConverter_1.TypeConverter.firstValueAsNumber(rate);
    periods = TypeConverter_1.TypeConverter.firstValueAsNumber(periods);
    presentValue = TypeConverter_1.TypeConverter.firstValueAsNumber(presentValue);
    futureValue = futureValue ? TypeConverter_1.TypeConverter.firstValueAsNumber(futureValue) : 0;
    endOrBeginning = endOrBeginning ? TypeConverter_1.TypeConverter.firstValueAsNumber(endOrBeginning) : 0;
    var result;
    if (rate === 0) {
        result = (presentValue + futureValue) / periods;
    }
    else {
        var term = Math.pow(1 + rate, periods);
        if (endOrBeginning) {
            result = (futureValue * rate / (term - 1) + presentValue * rate / (1 - 1 / term)) / (1 + rate);
        }
        else {
            result = futureValue * rate / (term - 1) + presentValue * rate / (1 - 1 / term);
        }
    }
    return -result;
};
exports.PMT = PMT;
// TODO: Convert to real formula FV
function fv(rate, periods, payment, value, type) {
    var result;
    if (rate === 0) {
        result = value + payment * periods;
    }
    else {
        var term = Math.pow(1 + rate, periods);
        if (type) {
            result = value * term + payment * (1 + rate) * (term - 1.0) / rate;
        }
        else {
            result = value * term + payment * (term - 1) / rate;
        }
    }
    return -result;
}
/**
 * Calculates the cumulative principal paid over a range of payment periods for an investment based on constant-amount
 * periodic payments and a constant interest rate.
 * @param rate - The interest rate.
 * @param numberOfPeriods - The number of payments to be made.
 * @param presentValue - The current value of the annuity.
 * @param firstPeriod - The number of the payment period to begin the cumulative calculation. must be greater
 * than or equal to 1.
 * @param lastPeriod - The number of the payment period to end the cumulative calculation, must be greater
 * than first_period.
 * @param endOrBeginning - Whether payments are due at the end (0) or beginning (1) of each period
 * @returns {number} cumulative principal
 * @constructor
 */
var CUMPRINC = function (rate, numberOfPeriods, presentValue, firstPeriod, lastPeriod, endOrBeginning) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 6, "CUMPRINC");
    rate = TypeConverter_1.TypeConverter.firstValueAsNumber(rate);
    var periods = TypeConverter_1.TypeConverter.firstValueAsNumber(numberOfPeriods);
    var value = TypeConverter_1.TypeConverter.firstValueAsNumber(presentValue);
    var start = TypeConverter_1.TypeConverter.firstValueAsNumber(firstPeriod);
    if (start < 1) {
        throw new Errors_1.NumError("Function CUMPRINC parameter 4 value is " + start + ". It should be greater than or equal to 1.");
    }
    var end = TypeConverter_1.TypeConverter.firstValueAsNumber(lastPeriod);
    if (end < 1) {
        throw new Errors_1.NumError("Function CUMPRINC parameter 5 value is " + end + ". It should be greater than or equal to 1.");
    }
    if (end < start) {
        throw new Errors_1.NumError("Function CUMPRINC parameter 5 value is " + end + ". It should be greater than or equal to " + start + ".");
    }
    var type = TypeConverter_1.TypeConverter.firstValueAsBoolean(endOrBeginning);
    var payment = PMT(rate, periods, value, 0, type);
    var principal = 0;
    if (start === 1) {
        if (type) {
            principal = payment;
        }
        else {
            principal = payment + value * rate;
        }
        start++;
    }
    for (var i = start; i <= end; i++) {
        if (type) {
            principal += payment - (fv(rate, i - 2, payment, value, 1) - payment) * rate;
        }
        else {
            principal += payment - fv(rate, i - 1, payment, value, 0) * rate;
        }
    }
    return principal;
};
exports.CUMPRINC = CUMPRINC;
/**
 * Calculates the cumulative interest over a range of payment periods for an investment based on constant-amount
 * periodic payments and a constant interest rate.
 * @param rate - The interest rate.
 * @param numberOfPeriods - The number of payments to be made.
 * @param presentValue - The current value of the annuity.
 * @param firstPeriod - The number of the payment period to begin the cumulative calculation, must be greater
 * than or equal to 1.
 * @param lastPeriod - The number of the payment period to end the cumulative calculation, must be greater
 * than first_period.
 * @param endOrBeginning - Whether payments are due at the end (0) or beginning (1) of each period.
 * @returns {number} cumulative interest
 * @constructor
 */
var CUMIPMT = function (rate, numberOfPeriods, presentValue, firstPeriod, lastPeriod, endOrBeginning) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 6, "CUMIPMT");
    rate = TypeConverter_1.TypeConverter.firstValueAsNumber(rate);
    var periods = TypeConverter_1.TypeConverter.firstValueAsNumber(numberOfPeriods);
    var value = TypeConverter_1.TypeConverter.firstValueAsNumber(presentValue);
    var start = TypeConverter_1.TypeConverter.firstValueAsNumber(firstPeriod);
    if (start < 1) {
        throw new Errors_1.NumError("Function CUMPRINC parameter 4 value is " + start + ". It should be greater than or equal to 1.");
    }
    var end = TypeConverter_1.TypeConverter.firstValueAsNumber(lastPeriod);
    if (end < 1) {
        throw new Errors_1.NumError("Function CUMPRINC parameter 5 value is " + end + ". It should be greater than or equal to 1.");
    }
    if (end < start) {
        throw new Errors_1.NumError("Function CUMPRINC parameter 5 value is " + end + ". It should be greater than or equal to " + start + ".");
    }
    var type = TypeConverter_1.TypeConverter.firstValueAsBoolean(endOrBeginning);
    var payment = PMT(rate, periods, value, 0, type);
    var interest = 0;
    if (start === 1) {
        if (!type) {
            interest = -value;
            start++;
        }
        else {
            start++;
        }
    }
    for (var i = start; i <= end; i++) {
        if (type) {
            interest += fv(rate, i - 2, payment, value, 1) - payment;
        }
        else {
            interest += fv(rate, i - 1, payment, value, 0);
        }
    }
    interest *= rate;
    return interest;
};
exports.CUMIPMT = CUMIPMT;
/**
 * Calculates the accrued interest of a security that has periodic payments.
 * WARNING: This function has been implemented to specifications as outlined in Google Spreadsheets, LibreOffice, and
 * OpenOffice. It functions much the same as MSExcel's ACCRINT, but there are several key differences. Below are links
 * to illustrate the differences. Please see the source code for more information on differences. Links: https://quant.stackexchange.com/questions/7040/whats-the-algorithm-behind-excels-accrint, https://support.office.com/en-us/article/ACCRINT-function-fe45d089-6722-4fb3-9379-e1f911d8dc74, https://quant.stackexchange.com/questions/7040/whats-the-algorithm-behind-excels-accrint, https://support.google.com/docs/answer/3093200 .
 * @param issue - The date the security was initially issued.
 * @param firstPayment - The first date interest will be paid.
 * @param settlement - The settlement date of the security, the date after issuance when the security is
 * delivered to the buyer. Is the maturity date of the security if it is held until maturity rather than sold.
 * @param rate - The annualized rate of interest.
 * @param redemption - The redemption amount per 100 face value, or par.
 * @param frequency - The number of coupon payments per year. For annual payments, frequency = 1; for
 * semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param dayCountConvention - [ OPTIONAL - 0 by default ] - An indicator of what day count method to use.
 * 0 or omitted = US (NASD) 30/360, 1 = Actual/actual, 2 = Actual/360, 3 = Actual/365, 4 = European 30/360.
 * @returns {number}
 * @constructor
 * TODO: This function is based off of the open-source versions I was able to dig up online. We should implement a
 * TODO:     second version that is closer to what MSExcel does and is named something like `ACCRINT.MS`.
 */
var ACCRINT = function (issue, firstPayment, settlement, rate, redemption, frequency, dayCountConvention) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 6, 7, "ACCRINT");
    issue = TypeConverter_1.TypeConverter.firstValueAsDateNumber(issue);
    // "firstPayment" param is only here to check for errors for GS implementation.
    // In MSE, there is a 7th (zero-indexed-6th) param that indicates the calculation-method to use, which indicates
    // weather the total accrued interest starting at the first_intrest date, instead of the issue date.
    firstPayment = TypeConverter_1.TypeConverter.firstValueAsDateNumber(firstPayment);
    if (firstPayment < 0) {
        throw new Errors_1.NumError("Function ACCRINT parameter 2 value is " + firstPayment
            + ". It should be greater than 0.");
    }
    settlement = TypeConverter_1.TypeConverter.firstValueAsDateNumber(settlement);
    if (issue > settlement) {
        throw new Errors_1.NumError("Function ACCRINT parameter 1 (" + issue.toString()
            + ") should be on or before Function ACCRINT parameter 3 (" + settlement.toString() + ").");
    }
    rate = TypeConverter_1.TypeConverter.firstValueAsNumber(rate);
    // redemption, aka "par"
    redemption = TypeConverter_1.TypeConverter.firstValueAsNumber(redemption);
    // The frequency parameter also does not affect the resulting value of the formula in the GS implementation.
    // In MSE, frequency is used to calculate a more accurate value, by breaking apart the year, and computing interest
    // on an on-going basis. In this implementation, we use YEARFRAC to get a numerical value that encompasses the
    // functionality of "frequency".
    frequency = TypeConverter_1.TypeConverter.firstValueAsNumber(frequency);
    // dayCountConvention, aka "basis"
    dayCountConvention = dayCountConvention !== undefined ? TypeConverter_1.TypeConverter.firstValueAsNumber(dayCountConvention) : 1;
    var factor = Date_1.YEARFRAC(issue, settlement, dayCountConvention);
    return redemption * rate * factor;
};
exports.ACCRINT = ACCRINT;
/**
 * Returns the arithmetic-declining depreciation rate. Use this function to calculate the depreciation amount for one
 * period of the total depreciation span of an object. Arithmetic declining depreciation reduces the depreciation amount
 * from period to period by a fixed sum.
 * @param cost - The initial cost of an asset.
 * @param salvage - the value of an asset after depreciation.
 * @param life - The period fixing the time span over which an asset is depreciated.
 * @param period - The period for which the depreciation is to be calculated.
 * @returns {number}
 * @constructor
 */
var SYD = function (cost, salvage, life, period) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 4, "SYD");
    cost = TypeConverter_1.TypeConverter.firstValueAsNumber(cost);
    salvage = TypeConverter_1.TypeConverter.firstValueAsNumber(salvage);
    life = TypeConverter_1.TypeConverter.firstValueAsNumber(life);
    period = TypeConverter_1.TypeConverter.firstValueAsNumber(period);
    // Return error if period is lower than 1 or greater than life
    if (period > life) {
        throw new Errors_1.NumError("Function SYD parameter 4 value is " + period +
            ". It should be less than or equal to value of Function SYD parameter 3 with " + life + ".");
    }
    if (period < 1) {
        throw new Errors_1.NumError("Function SYD parameter 4 value is " + period + ". It should be greater than 0.");
    }
    period = Math.floor(period);
    return (cost - salvage) * (life - period + 1) * 2 / (life * (life + 1));
};
exports.SYD = SYD;
/**
 * Returns the straight-line depreciation of an asset for one period. The amount of the depreciation is constant during
 * the depreciation period.
 * @param cost - The initial cost of the asset.
 * @param salvage - The value of an asset at the end of the depreciation.
 * @param life - The depreciation period determining the number of periods in the deprecation of the asset.
 * @returns {number}
 * @constructor
 */
var SLN = function (cost, salvage, life) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "SYD");
    cost = TypeConverter_1.TypeConverter.firstValueAsNumber(cost);
    salvage = TypeConverter_1.TypeConverter.firstValueAsNumber(salvage);
    life = TypeConverter_1.TypeConverter.firstValueAsNumber(life);
    if (life === 0) {
        throw new Errors_1.DivZeroError("Function SLN parameter 3 cannot be zero.");
    }
    return (cost - salvage) / life;
};
exports.SLN = SLN;
/**
 * Returns the net present value of an investment based on a series of periodic cash flows and a discount rate.
 * @param rate - The discount rate for a period.
 * @param values - The values representing deposits or withdrawals.
 * @returns {number}
 * @constructor
 * TODO: This function can return results that are prone to floating point precision errors.
 */
var NPV = function (rate) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 2, "SYD");
    var range = Filter_1.Filter.flattenAndThrow(values).map(function (value) {
        try {
            return TypeConverter_1.TypeConverter.valueToNumber(value);
        }
        catch (e) {
            throw new Errors_1.ValueError("Function NPV parameter 8 expects number values. But '" + value + "' is " + (typeof value)
                + " and cannot be coerced to a number.");
        }
    });
    var value = 0;
    for (var j = 0; j < range.length; j++) {
        value += range[j] / Math.pow(1 + rate, j);
    }
    return value;
};
exports.NPV = NPV;
/**
 * Returns the number of payment for an investment. Number is based on constant-amount payments made periodically and a
 * constant interest rate.
 * @param rate - The interest rate.
 * @param payment - The amount of each payment.
 * @param present - THe current value.
 * @param future - [OPTIONAL] - The future value remaining after the final payment has been made.
 * @param type [OPTIONAL 0 by default] - 1 indicates payments are due at the beginning of each period. 0 indicates
 * payments are due at the end of each period.
 * @returns {number}
 * @constructor
 */
var NPER = function (rate, payment, present, future, type) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 3, 5, "NPER");
    rate = TypeConverter_1.TypeConverter.firstValueAsNumber(rate);
    payment = TypeConverter_1.TypeConverter.firstValueAsNumber(payment);
    present = TypeConverter_1.TypeConverter.firstValueAsNumber(present);
    type = (typeof type === 'undefined') ? 0 : TypeConverter_1.TypeConverter.firstValueAsNumber(type);
    future = (typeof future === 'undefined') ? 0 : TypeConverter_1.TypeConverter.firstValueAsNumber(future);
    var num = payment * (1 + rate * type) - future * rate;
    var den = (present * rate + payment * (1 + rate * type));
    if (den === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function NPER cause a divide by zero error.");
    }
    var div = Math.log(1 + rate);
    var logNumDen = Math.log(num / den);
    if (isNaN(logNumDen)) {
        throw new Errors_1.NumError("Parameters given function NPER are not possible.");
    }
    return logNumDen / div;
};
exports.NPER = NPER;
