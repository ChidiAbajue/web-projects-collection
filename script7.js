// DOM Elements - all the elements we need from HTML
const passwordDisplay = document.getElementById("display");
const lengthSlider = document.getElementById("length");
const lengthLabel = document.getElementById("length-label");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById('strength-label')

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

generateButton.addEventListener('click', updateDisplay)
lengthSlider.addEventListener('input', () => {
    lengthLabel.textContent = lengthSlider.value
})
copyButton.addEventListener('click', () => {
    if (!passwordDisplay.value) return;
    navigator.clipboard.writeText(passwordDisplay.value)
        .then(() => showCopySuccess(copyButton))
        .catch(err => console.log(err));
})

function showCopySuccess(copyBtnObject){
    copyBtnObject.classList.remove('far', 'fa-copy')
    copyBtnObject.classList.add('fas', 'fa-check')
    copyBtnObject.style.color ='#48bb78';
    setTimeout(() => {
        copyBtnObject.classList.remove('fas', 'fa-check');
        copyBtnObject.classList.add('far', 'fa-copy');
        copyBtnObject.style.color='';
    }, 1500)
}

function updateDisplay(){
    const charList = getCharList()
    if(charList===''){
        alert('Please select at least one character type!')
        return
    }
    const newPassword = generatePassword(charList, lengthSlider.value)
    const passwordStrength = checkPasswordStrength(newPassword)
    passwordDisplay.value = newPassword
}
function getCharList(){
    let charList = ''
    if(uppercaseCheckbox.checked) charList += uppercaseLetters
    if(lowercaseCheckbox.checked) charList += lowercaseLetters
    if(numbersCheckbox.checked) charList += numberCharacters
    if(symbolsCheckbox.checked) charList += symbolCharacters
    return charList
}
function generatePassword(charList, length){
    let newPassword = ''
    length = Number(length)
    for(let i = 0; i < length; i++){
        newPassword += charList[Math.floor(Math.random() * charList.length)]
    }
    return newPassword
}
function checkPasswordStrength(newPassword){
    let score = 0
    let passwlength = newPassword.length
    score += Math.min(passwlength * 2, 40)
    if(/[A-Z]/.test(newPassword)) score += 15
    if(/[a-z]/.test(newPassword)) score += 15
    if(/[0-9]/.test(newPassword)) score += 15
    if(/[!@#$%^&*()-_=+[\]{}|;:,.<>?/]/.test(newPassword)) score += 15
    if(passwlength < 8) score= Math.floor(score * 0.7)
    setStrength(score)
}
function setStrength(score){
    let strength = ''
    let color = ''
    let weakColor = 'var(--color-weak)'
    let mediumColor = 'var(--color-medium)'
    let strongColor = 'var(--color-strong)'
    if (score <= 40) {
        strength = "Weak"
        color = weakColor
    } else if (score <= 70) {
        strength = "Medium"
        color = mediumColor
    } else if (score <= 100) {
        strength = "Strong"
        color = strongColor
    }
    strengthBar.style.width = score + '%'
    strengthBar.style.backgroundColor = color
    strengthText.textContent = strength;
    strengthText.style.color = color
}
updateDisplay()