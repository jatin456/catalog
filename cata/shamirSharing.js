// Decode value from a given base
function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

// Lagrange interpolation to find the polynomial value at x
function lagrangeInterpolation(xValues, yValues, x) {
    let totalSum = 0;
    const n = xValues.length;

    for (let i = 0; i < n; i++) {
        let xi = xValues[i];
        let yi = yValues[i];
        let term = yi;

        for (let j = 0; j < n; j++) {
            if (j !== i) {
                term *= (x - xValues[j]) / (xi - xValues[j]);
            }
        }
        totalSum += term;
    }

    return totalSum;
}

// Find the constant term c from the polynomial defined by the given roots
function findConstantTerm(data) {
    const n = data.keys.n;
    const k = data.keys.k;

    const xValues = [];
    const yValues = [];

    for (const key in data) {
        if (key === "keys") continue;
        const base = data[key].base;
        const value = data[key].value;
        const x = parseInt(key);
        const y = decodeValue(base, value);

        xValues.push(x);
        yValues.push(y);
    }

    if (xValues.length < k || yValues.length < k) {
        throw new Error("Not enough data points to determine the polynomial.");
    }

    // Calculate the constant term c at x = 0
    return lagrangeInterpolation(xValues.slice(0, k), yValues.slice(0, k), 0);
}

// Main function to read JSON input and compute the constant term
function main() {
    // Fetch and parse the JSON files
    const fs = require('fs');
    const data1 = JSON.parse(fs.readFileSync('./data/testcase1.json', 'utf8'));
    const data2 = JSON.parse(fs.readFileSync('./data/testcase2.json', 'utf8'));

    const c1 = findConstantTerm(data1);
    const c2 = findConstantTerm(data2);

    console.log(`Constant term for test case 1: ${c1}`);
    console.log(`Constant term for test case 2: ${c2}`);
}

main();
