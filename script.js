document.addEventListener("DOMContentLoaded", () => {
    const purchasePrice = document.getElementById("purchasePrice");
    const downPayment = document.getElementById("downPayment");
    const calculatedDownPayment = document.getElementById("calculatedDownPayment");
    const interestRate = document.getElementById("interestRate");
    const loanDuration = document.getElementById("loanDuration");
    const monthlyRent = document.getElementById("monthlyRent");
    const propertyTaxes = document.getElementById("propertyTaxes");
    const insurance = document.getElementById("insurance");
    const maintenance = document.getElementById("maintenance");
    const totalExpenses = document.getElementById("totalExpenses");
    const monthlyMortgage = document.getElementById("monthlyMortgage");
    const noi = document.getElementById("noi");
    const cashFlow = document.getElementById("cashFlow");
    const cashOnCashReturn = document.getElementById("cashOnCashReturn");
    const capRate = document.getElementById("capRate");
    const onePercentRule = document.getElementById("onePercentRule");
    const fiftyPercentRule = document.getElementById("fiftyPercentRule");

    function calculate() {
        // Inputs
        const price = parseFloat(purchasePrice.value) || 0;
        const downPaymentPercent = parseFloat(downPayment.value) || 0;
        const interest = parseFloat(interestRate.value) / 100 || 0;
        const years = parseInt(loanDuration.value) || 0;
        const rent = parseFloat(monthlyRent.value) || 0;
        const taxRate = parseFloat(propertyTaxes.value) || 0;
        const insuranceCost = parseFloat(insurance.value) || 0;

        // Calculations
        const downPaymentValue = (price * downPaymentPercent) / 100;
        const maintenanceCost = price * 0.02;
        const taxCost = (price * taxRate) / 100;
        const totalOperatingExpenses = taxCost + insuranceCost + maintenanceCost;

        // Mortgage Payment
        const loanAmount = price - downPaymentValue;
        const monthlyInterestRate = interest / 12;
        const numberOfPayments = years * 12;
        const monthlyPayment =
            (loanAmount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

        // Results
        const grossIncome = rent * 12;
        const noiValue = grossIncome - totalOperatingExpenses;
        const cashFlowValue = noiValue - monthlyPayment * 12;
        const cashOnCashReturnValue =
            ((cashFlowValue / downPaymentValue) * 100).toFixed(2);
        const capRateValue = ((noiValue / price) * 100).toFixed(2);
        const onePercentPass = rent >= price * 0.01 ? "PASS" : "FAIL";
        const fiftyPercentPass =
            totalOperatingExpenses <= grossIncome * 0.5 ? "PASS" : "FAIL";

        // Display
        calculatedDownPayment.textContent = `$${downPaymentValue.toLocaleString()}`;
        maintenance.textContent = `$${maintenanceCost.toLocaleString()}`;
        totalExpenses.textContent = `$${totalOperatingExpenses.toLocaleString()}`;
        monthlyMortgage.textContent = `$${monthlyPayment.toFixed(2).toLocaleString()}`;
        noi.textContent = `$${noiValue.toLocaleString()}`;
        cashFlow.textContent = `$${cashFlowValue.toLocaleString()}`;
        cashOnCashReturn.textContent = `${cashOnCashReturnValue}%`;
        capRate.textContent = `${capRateValue}%`;
        onePercentRule.textContent = onePercentPass;
        fiftyPercentRule.textContent = fiftyPercentPass;
    }

    // Event Listeners
    purchasePrice.addEventListener("input", calculate);
    downPayment.addEventListener("change", calculate);
    interestRate.addEventListener("input", calculate);
    loanDuration.addEventListener("change", calculate);
    monthlyRent.addEventListener("input", calculate);
    propertyTaxes.addEventListener("change", calculate);
    insurance.addEventListener("input", calculate);

    // Initial Calculation
    calculate();
});