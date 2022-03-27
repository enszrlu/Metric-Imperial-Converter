const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    /*     
    convertHandler should correctly read a whole number input.
    convertHandler should correctly read a decimal number input.
    convertHandler should correctly read a fractional input.
    convertHandler should correctly read a fractional input with a decimal.
    convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
    convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
    convertHandler should correctly read each valid input unit.
    convertHandler should correctly return an error for an invalid input unit.
    convertHandler should return the correct return unit for each valid input unit.
    convertHandler should correctly return the spelled-out string unit for each valid input unit.
    convertHandler should correctly convert gal to L.
    convertHandler should correctly convert L to gal.
    convertHandler should correctly convert mi to km.
    convertHandler should correctly convert km to mi.
    convertHandler should correctly convert lbs to kg.
    convertHandler should correctly convert kg to lbs. 
    */

    test('convertHandler should correctly read a whole number input.', function () {
        assert.equal(convertHandler.getNum('12mi'), 12, 'getNum should return 12 from 12mi');
    });

    test('convertHandler should correctly read a decimal number input.', function () {
        assert.equal(convertHandler.getNum('12.5mi'), 12.5, 'getNum should return 12.5 from 12.5mi');
    });

    test('convertHandler should correctly read a fractional input.', function () {
        assert.equal(convertHandler.getNum('1/2mi'), 0.5, 'getNum should return 0.5 from 1/2mi');
    });

    test('convertHandler should correctly read a fractional input with a decimal.', function () {
        assert.equal(convertHandler.getNum('1.6/2mi'), 0.8, 'getNum should return 0.8 from 1.6/2mi');
    });

    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
        assert.equal(convertHandler.getNum('1/2/2mi'), "invalid number", 'getNum should return error for 1/2/2mi');
        assert.equal(convertHandler.getNum('1/2/ami'), "invalid number", 'getNum should return error for 1/2/2mi');
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
        assert.equal(convertHandler.getNum('mi'), 1, 'getNum should return 1 for inputs without value.');
    });

    test('convertHandler should correctly read each valid input unit.', function () {
        assert.equal(convertHandler.getUnit('2mi'), "mi", 'getUnit should return mi for inputs such as 12mi');
        assert.equal(convertHandler.getUnit('3kg'), "kg", 'getUnit should return kg for inputs such as 12kg');
        assert.equal(convertHandler.getUnit('5.7km'), "km", 'getUnit should return km for inputs such as 12km');
        assert.equal(convertHandler.getUnit('2/3l'), "L", 'getUnit should return l for inputs such as 12l');
        assert.equal(convertHandler.getUnit('1.2gal'), "gal", 'getUnit should return gal for inputs such as 12gal');
        assert.equal(convertHandler.getUnit('1.555lbs'), "lbs", 'getUnit should return lbs for inputs such as 12lbs');
    });

    test('convertHandler should correctly return an error for an invalid input unit.', function () {
        assert.equal(convertHandler.getUnit('1/2mil'), "invalid unit", 'getUnit should return error for 1/2mil');
    });

    test('convertHandler should return the correct return unit for each valid input unit.', function () {
        assert.equal(convertHandler.getReturnUnit('lbs'), "kg", 'getReturnUnit should return kg for input lbs');
        assert.equal(convertHandler.getReturnUnit('kg'), "lbs", 'getReturnUnit should return lbs for input kg');
        assert.equal(convertHandler.getReturnUnit('L'), "gal", 'getReturnUnit should return gal for input l');
        assert.equal(convertHandler.getReturnUnit('gal'), "L", 'getReturnUnit should return l for input gal');
        assert.equal(convertHandler.getReturnUnit('mi'), "km", 'getReturnUnit should return km for input mi');
        assert.equal(convertHandler.getReturnUnit('km'), "mi", 'getReturnUnit should return mi for input km');
    });

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
        assert.equal(convertHandler.spellOutUnit('lbs'), "pounds", 'spellOutUnit should return pounds for input lbs');
        assert.equal(convertHandler.spellOutUnit('kg'), "kilograms", 'spellOutUnit should return kilograms for input kg');
        assert.equal(convertHandler.spellOutUnit('L'), "liters", 'spellOutUnit should return liters for input l');
        assert.equal(convertHandler.spellOutUnit('gal'), "gallons", 'spellOutUnit should return gallons for input gal');
        assert.equal(convertHandler.spellOutUnit('mi'), "miles", 'spellOutUnit should return miles for input mi');
        assert.equal(convertHandler.spellOutUnit('km'), "kilometers", 'spellOutUnit should return kilometers for input km');
    });


    test('convertHandler should correctly convert gal to L.', function () {
        assert.equal(convertHandler.convert(1, "gal"), 3.78541, 'convert should return correct value for gal to L');
    });
    test('convertHandler should correctly convert L to gal.', function () {
        assert.equal(convertHandler.convert(1, "L"), (1 / 3.78541).toFixed(5), 'convert should return correct value for L to gal');
    });
    test('convertHandler should correctly convert mi to km.', function () {
        assert.equal(convertHandler.convert(1, "mi"), 1.60934, 'convert should return correct value for mi to Km');
    });
    test('convertHandler should correctly convert km to mi.', function () {
        assert.equal(convertHandler.convert(1, "km"), (1 / 1.60934).toFixed(5), 'convert should return correct value for km to mi');
    });
    test('convertHandler should correctly convert lbs to kg.', function () {
        assert.equal(convertHandler.convert(1, "lbs"), 0.45359, 'convert should return correct value for lbs to kg');
    });
    test('convertHandler should correctly convert kg to lbs.', function () {
        assert.equal(convertHandler.convert(1, "kg"), (1 / 0.453592).toFixed(5), 'convert should return correct value for lbs to kg');
    });
});