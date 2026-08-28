// DOM Elements
const totalBalance = document.getElementById('total-balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const descInput = document.getElementById('desc-input');
const amtInput = document.getElementById('amt-input');
const addTransBtn = document.getElementById('add-trans-btn');
const transactionList = document.getElementById('transactionList')
const deleteTransactionBtns = document.getElementsByClassName('fa-close');
const transactionCards = document.getElementsByClassName('transaction');

const parseCurrency = (str) => parseFloat(str.replace(/[^0-9.-]+/g,"")) || 0;
const formatCurrency = (num) => {
    const formatted = Math.abs(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return num < 0 ? `-$${formatted}` : `$${formatted}`;
};

let transactions = [];
try {
    const stored = localStorage.getItem("transactions");
    transactions = stored ? JSON.parse(stored) : [];
} catch (e) {
    transactions = [];
}
transactions.forEach((trans) => {updateTransactions(trans)});

function updateTransactions(trans){
    let amount = trans.amt;
    const transaction = document.createElement('div');
    transaction.classList.add('transaction');
    transaction.setAttribute('data-id', trans.id);
    transaction.innerHTML = `<div class="trans-details">
                                <p id="trans-description">${trans.desc}</p>
                                <p id="trans-amount">${formatCurrency(amount)}</p>
                            </div>
                            <i class="fa fa-close"></i>`

    let balanceTemp = parseCurrency(totalBalance.textContent);

    if(amount <= 0){
        transaction.classList.add('expense');
        let expenseTemp = parseCurrency(expense.textContent);
        
        expense.textContent = formatCurrency(expenseTemp + Math.abs(amount)); 
        totalBalance.textContent = formatCurrency(balanceTemp + amount);
    } else {
        transaction.classList.add('income');
        let incomeTemp = parseCurrency(income.textContent);
        
        income.textContent = formatCurrency(incomeTemp + amount); 
        totalBalance.textContent = formatCurrency(balanceTemp + amount);
    }
    transactionList.appendChild(transaction);
}

addTransBtn.addEventListener("click", addTransaction);

transactionList.addEventListener("click", function(e) {
    if(e.target.classList.contains("fa-close")) {
        const transactionElement = e.target.closest(".transaction");
        removeTransaction(transactionElement);
    }
});

function removeTransaction(transaction) {
    const amountStr = transaction.querySelector('#trans-amount').textContent;
    const transAmt = parseCurrency(amountStr);
    const isExpense = transaction.classList.contains('expense');

    let balanceTemp = parseCurrency(totalBalance.textContent);

    if(isExpense) {
        let expenseTemp = parseCurrency(expense.textContent);
        expense.textContent = formatCurrency(expenseTemp - Math.abs(transAmt));
        totalBalance.textContent = formatCurrency(balanceTemp - transAmt);
    } else {
        let incomeTemp = parseCurrency(income.textContent);
        income.textContent = formatCurrency(incomeTemp - transAmt);
        totalBalance.textContent = formatCurrency(balanceTemp - transAmt);
    }

    transaction.remove();

    // Remove from Local Storage
    const id = transaction.getAttribute('data-id');
    transactions = transactions.filter(t => t.id != id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction(){
    let transDesc = descInput.value;
    descInput.value = '';
    let transAmt = parseFloat(amtInput.value);
    amtInput.value = '';
    
    const newId = Date.now();
    transactions.push({
        id: newId,
        desc: transDesc,
        amt: transAmt
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));

    const transaction = document.createElement('div');
    transaction.classList.add('transaction');
    transaction.setAttribute('data-id', newId);
    transaction.innerHTML = `<div class="trans-details">
                                <p id="trans-description">${transDesc}</p>
                                <p id="trans-amount">${formatCurrency(transAmt)}</p>
                            </div>
                            <i class="fa fa-close"></i>`

    let balanceTemp = parseCurrency(totalBalance.textContent);

    if(transAmt <= 0){
        transaction.classList.add('expense');
        let expenseTemp = parseCurrency(expense.textContent);
        
        expense.textContent = formatCurrency(expenseTemp + Math.abs(transAmt)); 
        totalBalance.textContent = formatCurrency(balanceTemp + transAmt);
    } else {
        transaction.classList.add('income');
        let incomeTemp = parseCurrency(income.textContent);
        
        income.textContent = formatCurrency(incomeTemp + transAmt); 
        totalBalance.textContent = formatCurrency(balanceTemp + transAmt);
    }
    transactionList.appendChild(transaction);
}