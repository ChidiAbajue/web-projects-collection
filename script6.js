const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const inputs = document.getElementsByTagName('input')
const submitBtn = document.getElementById("submit-btn");
form.addEventListener('submit', registerUser);
function registerUser(e){
    e.preventDefault();
    validate();
}
function validate(){
    const allFieldsFilled = checkAllFieldsFilled();
    const usernameVerified = checkUsernameVerified(3,8);
    const emailVerified = checkEmailVerified();
    const passwordVerified = checkPasswordVerified(8);

    if (allFieldsFilled && usernameVerified && emailVerified && passwordVerified){
        register();
        setTimeout(() => {
            // form.reset();
        }, 1500);
    } else {
        setTimeout(() => {
            // alert("Registration Unsuccessful!");
        }, 500);
    }
}
function checkAllFieldsFilled(){
    let verified = true;
    Array.from(inputs).forEach(input => {
        if (!input.value) {
            let msg = "'" + input.placeholder + "' field is required";
            showError(input, msg);
            verified = false;
        }
    });
    return verified;
}
function showError(inputElement, msg){
    const smallEl = inputElement.nextElementSibling;
    smallEl.textContent = msg;
    inputElement.parentElement.classList.remove('success');
    inputElement.parentElement.classList.add('error');
}
function showSuccess(inputElement){
    inputElement.parentElement.classList.remove('error');
    inputElement.parentElement.classList.add('success');
}
function checkUsernameVerified(minLength, maxLength){
    let verified = username.value.length >= minLength && username.value.length <= maxLength;
    if(verified){
        showSuccess(username);
        return true;
    } else {
        let msg = `Username must be minimum of ${minLength} and maximum of ${maxLength} characters long`;
        showError(username, msg);
        return false;
    }
}
function checkEmailVerified(){
    // Email regex that covers most common email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let verified = emailRegex.test(email.value);
    if(verified){
        showSuccess(email);
        return true;
    } else {
        let msg = "Enter a valid email";
        showError(email, msg);
        return false;
    }
}
function checkPasswordVerified(minLength){
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let verified = password.value.length >= minLength && passwordRegex.test(password.value);
    if(verified){
        showSuccess(password);
        return checkPasswordsMatch();
    } else {
        let msg = `Password must consist of letters, numbers, and symbols and must be minimum of ${minLength} characters long`;
        showError(password, msg);
        return false;
    }
}
function checkPasswordsMatch(){
    let verified = (password.value === confirmPassword.value);
    if(verified){
        showSuccess(confirmPassword);
        console.log('Benedict@1234');
        return true;
    } else {
        let msg = "Passwords do not match";
        showError(confirmPassword, msg);
        return false;
    }    
}












 function register(){
        alert("Registration Successful!")
 }