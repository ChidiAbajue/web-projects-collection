const amountInput = document.getElementById('amount-input');
const initCurrencyInput = document.getElementById('init-currency');
const finalCurrencyInput = document.getElementById('final-currency');
const resultSpan = document.getElementById('result');
const timeSpan = document.getElementById('time');
const rateSpan = document.getElementById('rate');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');

let ratesList = [];
let prevCurrency = JSON.parse(localStorage.getItem('prevCurrencies')) || { 'initIndex': 0, 'finalIndex': 1 };

convertBtn.addEventListener('click', (e) => {
    e.preventDefault();
    displayResult();
});

if (swapBtn) {
    swapBtn.addEventListener('click', () => {
        const tempIndex = initCurrencyInput.selectedIndex;
        initCurrencyInput.selectedIndex = finalCurrencyInput.selectedIndex;
        finalCurrencyInput.selectedIndex = tempIndex;

        // Persist swapped indices to localStorage
        prevCurrency['initIndex'] = initCurrencyInput.selectedIndex;
        prevCurrency['finalIndex'] = finalCurrencyInput.selectedIndex;
        localStorage.setItem('prevCurrencies', JSON.stringify(prevCurrency));

        // Update result if an amount is entered
        if (amountInput.value !== '') {
            displayResult();
        }
    });
}

amountInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        displayResult();
    }
});

async function getRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        timeSpan.textContent = 'Date: ' + data.date;
        let rates = Object.entries(data.rates).sort();
        initCurrencyInput.innerHTML = '';
        finalCurrencyInput.innerHTML = '';
        ratesList = [...rates];

        rates.forEach((rate) => {
            const optionEl1 = document.createElement('option');
            optionEl1.textContent = rate[0];
            optionEl1.value = rate[1];
            initCurrencyInput.appendChild(optionEl1);

            const optionEl2 = optionEl1.cloneNode(true);
            finalCurrencyInput.appendChild(optionEl2);
        });

        // Restore saved currency indices if valid
        if (prevCurrency['initIndex'] < initCurrencyInput.options.length) {
            initCurrencyInput.selectedIndex = prevCurrency['initIndex'];
        }
        if (prevCurrency['finalIndex'] < finalCurrencyInput.options.length) {
            finalCurrencyInput.selectedIndex = prevCurrency['finalIndex'];
        }
    } catch (err) {
        resultSpan.textContent = 'Error loading exchange rates.';
    }
}

function displayResult() {
    const rawVal = amountInput.value.trim();
    if (rawVal === '') {
        resultSpan.textContent = 'Please enter an amount';
        timeSpan.style.display = 'none';
        return;
    }

    const amount = parseFloat(rawVal);
    timeSpan.style.display = 'inline-block';

    const fromCurrencyValue = parseFloat(initCurrencyInput.value);
    const finalCurrencyValue = parseFloat(finalCurrencyInput.value);
    const fromCurrencyLabel = initCurrencyInput.options[initCurrencyInput.selectedIndex].textContent;
    const finalCurrencyLabel = finalCurrencyInput.options[finalCurrencyInput.selectedIndex].textContent;

    const convertedAmt = +((amount / fromCurrencyValue) * finalCurrencyValue).toFixed(5);
    resultSpan.textContent = convertedAmt == 0 ? `${amount} ${fromCurrencyLabel} is worthless when converted to  ${finalCurrencyLabel}` : `${amount} ${fromCurrencyLabel} is ${convertedAmt} ${finalCurrencyLabel}`;
    resultSpan.style.visibility = 'visible';
    let rate = (finalCurrencyValue / fromCurrencyValue) > 1 ? +(finalCurrencyValue / fromCurrencyValue).toFixed(2) : +(finalCurrencyValue / fromCurrencyValue).toFixed(8)
    rateSpan.innerHTML = `Rate: ${rate} ${finalCurrencyLabel}/${fromCurrencyLabel}`;

    // Save selected currencies to localStorage
    prevCurrency['initIndex'] = initCurrencyInput.selectedIndex;
    prevCurrency['finalIndex'] = finalCurrencyInput.selectedIndex;
    localStorage.setItem('prevCurrencies', JSON.stringify(prevCurrency));
}

// Initial fetch on page load
getRates();