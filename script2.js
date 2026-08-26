// DOM elements
const generateBtn = document.getElementById('generate-btn');
const paletteContainer = document.querySelector('.palette-container');


// Generate Palette on Refresh
generatePalette();

generateBtn.addEventListener("click", generatePalette);
paletteContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("copy-btn")){
        const hexValue= e.target.previousElementSibling.textContent;
        navigator.clipboard.writeText(hexValue)
        .then(()=>showCopySuccess(e.target))
        .catch((err) => console.log(err));
    } else if (e.target.classList.contains("color")){
        console.log(e)
        const hexValue= e.target.nextElementSibling.querySelector(".hex-value").textContent;
        // We put the hexValue text into the clipboard then we call showcopysuccess and pass
        //  in the copy-btn object by finding its position relative to the clicked element then we catch any errors during copy operation.
        // the next element is a color-info div, we query for the .copy-btn element and pass it into showcopysuccess
        navigator.clipboard.writeText(hexValue)
        .then(()=>showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
        .catch((err) => console.log(err));
    }
})
function showCopySuccess(copyBtnObject){
    //receives the copybtn object, replaces its icon to a tick icon for a set period
    copyBtnObject.classList.remove('far', 'fa-copy')
    copyBtnObject.classList.add('fas', 'fa-check')
    copyBtnObject.style.color ='#48bb78';
    setTimeout(() => {
        copyBtnObject.classList.remove('fas', 'fa-check');
        copyBtnObject.classList.add('far', 'fa-copy');
        copyBtnObject.style.color='';
    }, 1500)
}
function generatePalette(){
    const colors = [];
    for(let i=0; i<5; i++){
        colors.push(generateRandomColor())
    };
    updatePaletteDisplay(colors);
};
function updatePaletteDisplay(colors){
    //so we get the children elements of the paletteContainer which comes in an HTML Array
    //Array.from converts it to normal array so we can use forEach method
    //foreach box in the array, we shift the colors[0] into a temporary variable
    //we use that variable to update the hex value text and bg color
    // if you shift multiple times in one iteration, you get different color in background and the hex value text
    Array.from(paletteContainer.children).forEach(box => {
        let tempColorVar = colors.shift();
        box.getElementsByClassName('hex-value')[0].textContent=tempColorVar;
        box.getElementsByClassName('color')[0].style.backgroundColor=tempColorVar;
    })
}
function generateRandomColor(){
    const letters = "0123456789ABCDEF";
    let color = "#"
    for(let i=0; i<6; i++){
        color += letters[Math.floor(Math.random() * 16)]
    };
    return color;
}