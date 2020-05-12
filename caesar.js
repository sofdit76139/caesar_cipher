let stringEntry;
let shiftEntry;

document.querySelector("#convert-text").disabled = true;

function myString (stringToEncode, shiftFactor) {  //pass the string to encode and the shift factor
    
    let i;
    let encodedString = [];

    for (i = 0; i < stringToEncode.length; i++) {  //loop through all of the letters of the string

        let codePointNumber = stringToEncode.codePointAt(i);

        //uppercase letters

        if (65 <= codePointNumber && codePointNumber <= 90) {  //is the number of the letter in the list of the uppercase letters?

            codePointNumber = (codePointNumber + shiftFactor); //shift this number by what was specified

            if (codePointNumber <= 64) {  // if the new number is below 64, start at the other end
                codePointNumber = (26 + codePointNumber);
            } else if (codePointNumber >= 91) {  // if the new number is above 91, start at the other end
                codePointNumber = (codePointNumber -  26);
            }

        //lowercase letters

        } else if (97 <= codePointNumber && codePointNumber <= 122) {

            codePointNumber = (codePointNumber + shiftFactor);

            if (codePointNumber <= 96) {  // if the new number is below 96, start at the other end
                codePointNumber = (26 + codePointNumber); 
            } else if (codePointNumber >= 123) {  // if the new number is above 123, start at the other end
                codePointNumber = (codePointNumber - 26);
            }

        }

        let codePointLetter = String.fromCodePoint(codePointNumber); //convert number back to letter

        encodedString.push(codePointLetter); //store entries in an array

    }

    encodedString = encodedString.join('');

    return encodedString;
}

//disable the "Convert" button until both fields are filled in and the shift factor is between -25 and 25; the shift factor should only accept numbers
function disableConvertButton () {

    let checkForNumber = document.querySelector("#shift-factor-input").value;

    if (document.querySelector("#user-input").value.length === "" || document.querySelector("#shift-factor-input").value === "") {
        document.querySelector("#convert-text").disabled = true;
    } else if (parseInt(document.querySelector("#shift-factor-input").value) < -25 || parseInt(document.querySelector("#shift-factor-input").value) > 25) {
        document.querySelector("#convert-text").disabled = true;
        document.querySelector("#shift-factor-input").value = "";
        alert("The shift factor should be between -25 and 25.")
    } else if (isNaN(checkForNumber)) { 
        document.querySelector("#convert-text").disabled = true;
        document.querySelector("#shift-factor-input").value = "";
        alert("The shift factor should be a NUMBER between -25 and 25. Letters and other characters are not allowed.")
    } else {
        document.querySelector("#convert-text").disabled = false;
    }

    return;

}

//event listeners
document.querySelector("#user-input").addEventListener("keyup", function() {
    disableConvertButton();
}, false);
document.querySelector("#shift-factor-input").addEventListener("keyup", function() {
    disableConvertButton();
}, false);
document.querySelector("#convert-text").addEventListener("click", function () {  //submit both fields and convert the text
    stringEntry = document.querySelector("#user-input").value;
    shiftEntry = parseInt(document.querySelector("#shift-factor-input").value);
    disableConvertButton();
    document.querySelector("#converted-text").innerHTML = myString(stringEntry, shiftEntry);
}, false);
document.querySelector("#reset-button").addEventListener("click", function() {  //when the button is clicked, clear all
    document.querySelector("#user-input").value = "";
    document.querySelector("#shift-factor-input").value = "";
    document.querySelector("#converted-text").innerHTML = "";
}, false);
