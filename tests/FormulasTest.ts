import { ARABIC, AVEDEV, AVERAGE,
    AVERAGEA, AVERAGEIF,
    CHAR, CODE, CONCATENATE, CONVERT, PEARSON,
    CORREL, COUNT, COUNTA,
    DEVSQ,
    EXPONDIST, FINV, __COMPLEX, FISHER, FISHERINV,
    MAX, MAXA, MEDIAN, MIN, MINA,
    SPLIT } from "../src/RawFormulas/RawFormulas";
import * as ERRORS from "../src/Errors"
import {assertEquals, assertArrayEquals} from "./utils/Asserts"

function catchAndAssertEquals(toExecute, expected) {
  var toThrow = null;
  try {
    toExecute();
    toThrow = true;
  } catch (actualError) {
    if (actualError.name != expected) {
      console.log(expected, "not equal to", actualError.name);
    }
  }
  if (toThrow) {
    throw new Error("expected error: " + expected);
  }
}



// Test ARABIC
assertEquals(ARABIC("XIV"), 14);
assertEquals(ARABIC("M"), 1000);
assertEquals(ARABIC("-IV"), -4);
catchAndAssertEquals(function() {
  ARABIC("b");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  ARABIC(false);
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  ARABIC(10);
}, ERRORS.VALUE_ERROR);


// Test AVEDEV
assertEquals(AVEDEV(1, 2, 4, 55), 19.75);
assertEquals(AVEDEV(1, 2, 4, "55"), 19.75);
assertEquals(AVEDEV([1, 2, 4, "55"]), 1.1111111111111112);
assertEquals(AVEDEV([1, 2, 4, "55"], [10, 10, "str"]), 3.6799999999999997);
assertEquals(AVEDEV([1, 2, 4, "55"], [10, 10]), 3.6799999999999997);
assertEquals(AVEDEV(1, 2, 4, "55", [10, [10]]), 13.777777777777777);
assertEquals(AVEDEV(1, 2, 4, "55", 10, 10), 13.77777777777778);
assertEquals(AVEDEV(1, 2, 4, 55, false), 17.040000000000003);
assertEquals(AVEDEV(1, 2, 4, 55, 0), 17.040000000000003);
assertEquals(AVEDEV(1, 2, 4, 55, true), 16.959999999999997);
assertEquals(AVEDEV(1, 2, 4, 55, 1), 16.959999999999997);
assertEquals(AVEDEV([1, 2, 4, 55, 0]), 17.040000000000003);
assertEquals(AVEDEV([1, 2, 4, 55], 0), 17.040000000000003);
catchAndAssertEquals(function() {
  AVEDEV();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  AVEDEV(10, 10, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  AVEDEV(10, 10, []);
}, ERRORS.REF_ERROR);


// Test AVERAGE
assertEquals(AVERAGE(1, 2, 4, 55), 15.5);
assertEquals(AVERAGE(1, 2, 4, "55"), 15.5);
assertEquals(AVERAGE(1, 2, 4, 55, false), 12.4);
assertEquals(AVERAGE(1, 2, 4, 55, true), 12.6);
assertEquals(AVERAGE(1, 2, 4, 55, 0), 12.4);
assertEquals(AVERAGE(1, 2, 4, 55, 1), 12.6);
catchAndAssertEquals(function() {
  AVERAGE(1, 2, 4, "str");
}, ERRORS.VALUE_ERROR);
assertEquals(AVERAGE([1, 2, 4, 55, "str"]), 15.5);
assertEquals(AVERAGE([1, 2, 4, 55, "22"]), 15.5);
assertEquals(AVERAGE([0]), 0);
catchAndAssertEquals(function() {
  AVERAGE();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  AVERAGE([]);
}, ERRORS.REF_ERROR);


// Test AVERAGEA
assertEquals(AVERAGEA(1, 2, 4, 55), 15.5);
assertEquals(AVERAGEA(1, 2, 4, "55"), 15.5);
assertEquals(AVERAGEA(1, 2, 4, 55, false), 12.4);
assertEquals(AVERAGEA(1, 2, 4, 55, true), 12.6);
assertEquals(AVERAGEA(1, 2, 4, 55, 0), 12.4);
assertEquals(AVERAGEA(1, 2, 4, 55, 1), 12.6);
catchAndAssertEquals(function() {
  AVERAGEA(1, 2, 4, "str");
}, ERRORS.VALUE_ERROR);
assertEquals(AVERAGEA([1, 2, 4, 55, "str"]), 12.4);
assertEquals(AVERAGEA([1, 2, 4, 55, "22"]), 12.4);
assertEquals(AVERAGEA([1, 2, 4, 55, 0]), 12.4);
assertEquals(AVERAGEA([0]), 0);
catchAndAssertEquals(function() {
  AVERAGEA();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  AVERAGEA([]);
}, ERRORS.REF_ERROR);


// Test AVERAGEIF
assertEquals(AVERAGEIF([1, 5, 10], '>2'), 7.5);
assertEquals(AVERAGEIF([1, 5, 10], ">4"), 7.5);
assertEquals(AVERAGEIF([1, 2, 2, 2, 2, 2, 2, 2], ">1"), 2);
assertEquals(AVERAGEIF([1, 5, 10], 5), 5);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], 5), 5);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], 10), 10);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], ">5"), 10);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "=5"), 5);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "=10"), 10);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "=     10  "), 10);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], ">0"), 5.166666666666667);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], ">=5"), 6);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "<>1"), 6);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "<10"), 4.2);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5, 44], "<=10"), 5.166666666666667);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], ">4.99"), 6);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "<4.99"), 1);
catchAndAssertEquals(function() {
  AVERAGEIF([1, 5, 5, 5, 10, 5], "=     1.0.0  ");
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  AVERAGEIF([1, 5, 5, 5, 10, 5], "=>5");
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  AVERAGEIF([1, 5, 5, 5, 10, 5], "==5");
}, ERRORS.DIV_ZERO_ERROR);


// Test CHAR
assertEquals(CHAR(97), "a");
assertEquals(CHAR("97"), "a");
assertEquals(CHAR([97, "m"]), "a");
assertEquals(CHAR([[97], "m"]), "a");
catchAndAssertEquals(function() {
  CHAR([[], [97], "m"]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  CHAR(false);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  CHAR(10000000);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  CHAR(0);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  CHAR();
}, ERRORS.NA_ERROR);


// Test CODE
assertEquals(CODE('a'), 97);
assertEquals(CODE('aa'), 97);
assertEquals(CODE('aM'), 97);
assertEquals(CODE('#'), 35);
assertEquals(CODE(false), 70);
assertEquals(CODE(true), 84);
catchAndAssertEquals(function() {
  CODE();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CODE("a", "m");
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CODE("");
}, ERRORS.VALUE_ERROR);
assertEquals(CODE(['a']), 97);
assertEquals(CODE([['a'], 'p']), 97);


// Test CONCATENATE
assertEquals(CONCATENATE("hey", " ", "there"), "hey there");
assertEquals(CONCATENATE(["hey", " ", "there"]), "hey there");
assertEquals(CONCATENATE("hey"), "hey");
assertEquals(CONCATENATE("hey", 2), "hey2");
assertEquals(CONCATENATE("hey", false), "heyFALSE");
assertEquals(CONCATENATE([22, 14, "m", false]), "2214mFALSE");
assertEquals(CONCATENATE([22, 14, ["m", false]]), "2214mFALSE");
catchAndAssertEquals(function() {
  CONCATENATE();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CONCATENATE("10", 4, false, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  CONCATENATE([]);
}, ERRORS.REF_ERROR);


// Test CONVERT
assertEquals(CONVERT(5.1, "mm", "m"), 0.0050999999999999995);

// Test CORREL
assertEquals(CORREL([9, 5],[10, 4]), 1);
assertEquals(CORREL([10, 5, 16],[9, 3, 22]), 0.9876779373054069);
catchAndAssertEquals(function() {
  CORREL(5, 5);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  CORREL([9, true], [5, true]);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  CORREL([9, "10"], [5, "10"]);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  CORREL([9], [5]);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  CORREL();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CORREL([9, 5]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CORREL([9, 5],[10]);
}, ERRORS.NA_ERROR);


// Test PEARSON (same as CORREL)
assertEquals(PEARSON([9, 5],[10, 4]), 1);


// Test COUNT
assertEquals(COUNT([1, 5, 10, 0]), 4);
assertEquals(COUNT(1, 5, 10, 0), 4);
assertEquals(COUNT(1, 5, 10, "0"), 4);
assertEquals(COUNT(1, 5, 10, ["0", "str"]), 4);
assertEquals(COUNT(1, 5, 10, false), 4);
assertEquals(COUNT(1, 5, 10, true), 4);
assertEquals(COUNT([]), 0);
assertEquals(COUNT(["str"]), 0);
catchAndAssertEquals(function() {
  COUNT();
}, ERRORS.NA_ERROR);


// Test COUNTA
assertEquals(COUNTA(1, 2, 3), 3);
assertEquals(COUNTA(0, 1, 2, 3), 4);
assertEquals(COUNTA(0, 1, 2, 3, [], []), 6);
assertEquals(COUNTA(0, 1, 2, 3, [], ""), 6);
assertEquals(COUNTA(1, 2, "3"), 3);
assertEquals(COUNTA(1, 2, "3", ["str"]), 4);
assertEquals(COUNTA(1, 2, false), 3);
assertEquals(COUNTA(1, 2, true), 3);
assertEquals(COUNTA([]), 1);
catchAndAssertEquals(function() {
  COUNTA();
}, ERRORS.NA_ERROR);


// Test DEVSQ
assertEquals(DEVSQ(1, 2), 0.5);
assertEquals(DEVSQ([1, 2]), 0.5);
assertEquals(DEVSQ([1, [2]]), 0.5);
assertEquals(DEVSQ(1), 0);
assertEquals(DEVSQ(false), 0);
assertEquals(DEVSQ(true), 0);
assertEquals(DEVSQ(1, 2, 3, 4), 5);
assertEquals(DEVSQ([1, 2, 3, 4]), 5);
catchAndAssertEquals(function() {
  DEVSQ(1, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DEVSQ();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DEVSQ([1, 2, [], 3]);
}, ERRORS.REF_ERROR);


// Test EXPONDIST
assertEquals(EXPONDIST(4, 0.5, false), 0.06766764161830635);
assertEquals(EXPONDIST(4, 0.5, 0), 0.06766764161830635);
assertEquals(EXPONDIST(4, 0.5, true), 0.8646647167633873);
assertEquals(EXPONDIST(4, 0.5, 1), 0.8646647167633873);
assertEquals(EXPONDIST(4, 0.5, -1), 0.8646647167633873);
assertEquals(EXPONDIST([4, "str"], ["0.5"], [false]), 0.06766764161830635);
catchAndAssertEquals(function() {
  EXPONDIST("str", 0.5, "1");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  EXPONDIST(4, 0.5, "1");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  EXPONDIST();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXPONDIST(4, 0.5);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXPONDIST(4, 0.5, true, 1);
}, ERRORS.NA_ERROR);


// Test F.DIST
assertEquals(__COMPLEX["F.DIST"](15.35, 7, 6, false), 0.0003451054686025578);
assertEquals(__COMPLEX["F.DIST"](15.35, 7, 6, true), 0.9980694465675269);
assertEquals(__COMPLEX["F.DIST"](15.35, 7, 6, 1), 0.9980694465675269);
assertEquals(__COMPLEX["F.DIST"](15.35, "7", [6], 1), 0.9980694465675269);
assertEquals(__COMPLEX["F.DIST"](15.35, "7", [6], 10), 0.9980694465675269);
catchAndAssertEquals(function() {
  __COMPLEX["F.DIST"](15.35, 7, 6, "10");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  __COMPLEX["F.DIST"](-15.35, 7, 6, 1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  __COMPLEX["F.DIST"](15.35, 7, 6);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  __COMPLEX["F.DIST"]();
}, ERRORS.NA_ERROR);


// Test FINV
assertEquals(FINV(0.42, 2, 3), 1.174597274485816);


// Test FISHER
assertEquals(FISHER(0.962), 1.972066740199461);
assertEquals(FISHER([0.962]), 1.972066740199461);
assertEquals(FISHER("0.962"), 1.972066740199461);
assertEquals(FISHER(0), 0);
assertEquals(FISHER(false), 0);
assertEquals(FISHER(0.92), 1.589026915173973);
catchAndAssertEquals(function() {
  FISHER("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  FISHER(1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  FISHER(-1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  FISHER();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  FISHER(0.55, 0.1);
}, ERRORS.NA_ERROR);


// Test FISHERINV
assertEquals(FISHERINV(0.962), 0.7451676440945232);
assertEquals(FISHERINV(0.962), 0.7451676440945232);
assertEquals(FISHERINV([0.962]), 0.7451676440945232);
assertEquals(FISHERINV("0.962"), 0.7451676440945232);
assertEquals(FISHERINV(0), 0);
assertEquals(FISHERINV(false), 0);
assertEquals(FISHERINV(true), 0.761594155955765);
assertEquals(FISHERINV(0.92), 0.7258974148490807);
catchAndAssertEquals(function() {
  FISHER("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  FISHER();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  FISHER(0.55, 0.1);
}, ERRORS.NA_ERROR);


// Test MAX
assertEquals(MAX(100, 22), 100);
assertEquals(MAX(100, "22"), 100);
assertEquals(MAX(-100, false), 0);
assertEquals(MAX(-100, true), 1);
assertEquals(MAX(100, [101, 2]), 101);
assertEquals(MAX(100, [101, 2, "10000"]), 101);
assertEquals(MAX(100, ["10000"]), 100);
catchAndAssertEquals(function() {
  MAX(100, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  MAX([]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  MAX();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MAX(100, "str");
}, ERRORS.VALUE_ERROR);

// Test MAXA
assertEquals(MAXA(100, 22, 44), 100);


// Tes MEDIAN
assertEquals(MEDIAN(100, 22, 54), 54);
assertEquals(MEDIAN(100, 22, "54"), 54);
assertEquals(MEDIAN(100, 22), 61);
assertEquals(MEDIAN(2), 2);
assertEquals(MEDIAN(false), 0);
assertEquals(MEDIAN(1, 1, 2, 6, 6, 9, 5), 5);
assertEquals(MEDIAN(6, 6, 1, 1, 2, 9), 4);
assertEquals(MEDIAN(1, 1, 2, [5, 6, 6, 9]), 5);
catchAndAssertEquals(function() {
  MEDIAN(1, 1, 2, 5, "mmm", 6, 6, 9);
}, ERRORS.VALUE_ERROR);
assertEquals(MEDIAN(1, 1, 2, [5, "mmm", 6, 6, 9]), 5);
assertEquals(MEDIAN(1, 1, 2, ["mm"]), 1);
assertEquals(MEDIAN(100, 22, 1, 14), 18);
assertEquals(MEDIAN(100, 22, 1, 1), 11.5);
assertEquals(MEDIAN(100, 22, 1), 22);
assertEquals(MEDIAN(100, 22, [54]), 54);
assertEquals(MEDIAN(100, 22, ["str"]), 61);
catchAndAssertEquals(function() {
  MEDIAN(10, 22, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  MEDIAN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MEDIAN(["str"]);
}, ERRORS.NUM_ERROR);


// Test MIN
assertEquals(MIN(100, 22, 44), 22);
assertEquals(MIN(100, "22"), 22);
assertEquals(MIN(100, false), 0);
assertEquals(MIN(100, true), 1);
assertEquals(MIN(100, [101, 2]), 2);
assertEquals(MIN(100, [101, 2, "-10"]), 2);
assertEquals(MIN(100, ["-10"]), 100);
catchAndAssertEquals(function() {
  MIN(100, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  MIN([]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  MIN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MIN(100, "str");
}, ERRORS.VALUE_ERROR);


// Test MINA
assertEquals(MINA(100, 22, 44), 22);


// Test SPLIT
assertArrayEquals(SPLIT("1,2,3", ","), ['1', '2', '3']);
assertArrayEquals(SPLIT("little kitty cat", "i"), ['l', 'ttle k', 'tty cat']);
assertArrayEquals(SPLIT("father sister berzerker", "er", true), ['fath', ' sist', ' b', 'z', 'k']);
assertArrayEquals(SPLIT("father sister berzerker", "er", [true]), ['fath', ' sist', ' b', 'z', 'k']);
assertArrayEquals(SPLIT("father  sister   berzerker", "er", true), ['fath', '  sist', '   b', 'z', 'k']);
assertArrayEquals(SPLIT(["father sister berzerker"], ["er"], true), ['fath', ' sist', ' b', 'z', 'k']);
catchAndAssertEquals(function() {
  SPLIT([], "er");
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  SPLIT("er", "er", true, 10);
}, ERRORS.NA_ERROR);