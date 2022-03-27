
function ConvertHandler() {

  this.getNum = function (input) {

    if ((input.match(/\//g) || []).length > 1) return "invalid number"

    let result;
    let regex = /(.*\d+|)(gal|lbs|mi|l|kg|km)/;
    const match = input.match(regex);

    if (match == null || match.length !== 3 || match[0] !== input) {
      let regex2 = /(.*\d+)(.*)/;
      const match2 = input.match(regex2);
      if (match2 == null || match2.length !== 3 || match2[0] !== input) {
        return "invalid number"
      }
      try {
        result = parseFloat(eval(match2[1]).toFixed(5));

      } catch (error) {
        return "invalid number"
      }
      return parseFloat(eval(match2[1]).toFixed(5));
    }

    if (match[1] === "") match[1] = 1;

    try {
      result = parseFloat(eval(match[1]).toFixed(5));

    } catch (error) {
      return "invalid number"
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;

    let regex = /(.*\d+|)(gal|lbs|mi|l|kg|km)/;
    const match = input.match(regex);

    if (match == null || match.length !== 3 || match[0] !== input) {
      let regex2 = /(.*\d+)(gal|lbs|mi|l|kg|km)/;
      const match2 = input.match(regex2);
      if (match2 == null || match2.length !== 3 || match2[0] !== input) {
        return "invalid unit"
      }

      if (match2[2] == "l") match2[2] = "L"

      return match2[2];
    }


    result = match[2]

    if (result == "l") result = "L"

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    switch (initUnit) {
      case "gal":
        result = 'L';
        break;

      case "lbs":
        result = "kg";
        break;

      case "mi":
        result = "km"
        break;
      case "L":
        result = 'gal';
        break;

      case "kg":
        result = "lbs";
        break;

      case "km":
        result = "mi";
        break;
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    switch (unit) {
      case "gal":
        result = 'gallons';
        break;

      case "lbs":
        result = "pounds";
        break;

      case "mi":
        result = "miles"
        break;

      case "L":
        result = 'liters';
        break;

      case "kg":
        result = "kilograms";
        break;

      case "km":
        result = "kilometers";
        break;
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "gal":
        result = galToL * initNum;
        break;

      case "lbs":
        result = lbsToKg * initNum;
        break;

      case "mi":
        result = miToKm * initNum;
        break;
      case "L":
        result = initNum / galToL;
        break;

      case "kg":
        result = initNum / lbsToKg;
        break;

      case "km":
        result = initNum / miToKm;
        break;
    }


    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);

    return result;
  };

}

module.exports = ConvertHandler;
