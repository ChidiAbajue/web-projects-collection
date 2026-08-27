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


addTransBtn.addEventListener("click", addTransaction);
function addTransaction(){
    let transDesc = descInput.value;
    let transAmt = parseFloat(amtInput.value);
    console.log(typeof(transAmt))
    const transaction = document.createElement('div');
    transaction.classList.add('transaction');
    transaction.innerHTML = `<div class="trans-details">
                                <p id="trans-description">${transDesc}</p>
                                <p id="trans-amount">$${transAmt}</p>
                            </div>
                            <i class="fa fa-close"></i>`
    if(transAmt <= 0){
        transaction.classList.add('expense');
        let expenseTemp = Array.from(expense.textContent).slice(1,-1).join('');
        let balanceTemp = Array.from(totalBalance.textContent).slice(1,-1).join('');
        expenseTemp = parseFloat(expenseTemp.replace(",", ""))
        balanceTemp = parseFloat(balanceTemp.replace(",", ""))
        expense.textContent = `$${expenseTemp + parseFloat(transAmt)}` 
        totalBalance.textContent = `$${balanceTemp + parseFloat(transAmt)}`
        console.log(balanceTemp);
    } else {
        transaction.classList.add('income');
        let incomeTemp = Array.from(income.textContent).slice(1,-1).join('');
        let balanceTemp = Array.from(totalBalance.textContent).slice(1,-1).join('');
        incomeTemp = parseFloat(incomeTemp.replace(",", ""))
        balanceTemp = parseFloat(balanceTemp.replace(",", ""))
        income.textContent = `$${incomeTemp + parseFloat(transAmt)}` 
        totalBalance.textContent = `$${balanceTemp + parseFloat(transAmt)}`
        console.log(balanceTemp);
    }
    console.log(transaction);
    


    transactionList.appendChild(transaction);
}