
// getting variables
var userPin = document.getElementById("user_pin");
var numKeys = document.getElementsByClassName("numKeys");
var currentBalance = 150000;
var isWithdrawing = false;




// setting keypad values to input fiels
for (var i = 0; i < numKeys.length; i++) {
    numKeys[i].addEventListener("click", function(key) {
        if (!isWithdrawing && userPin.value.length < 4) {
            userPin.value += key.target.value;
        } else if (isWithdrawing) {
            var withdrawalInput = document.getElementById("withdrawal_amount");
            withdrawalInput.value += key.target.value;
        }
    });
}




//clear button function
function clearBtn() {
    if (isWithdrawing) {
        document.getElementById("withdrawal_amount").value = "";
    } else {
        userPin.value = "";
    }
}




//cancel button function
function cancelBtn() {
    userPin.value = "";
    document.getElementById("withdrawal_amount").value = "";
    document.getElementById("pinError").innerHTML = "Transaction cancelled, thanks for using our services";
    document.getElementById("pinError").style.color = "rgb(0, 19, 42)";
    document.getElementById("pinError").style.padding = "1rem 0";

    document.getElementById("withdrawal_section").style.display = "none";
    isWithdrawing = false;
}




//enter button function
function enterBtn() {
    if (!isWithdrawing) {
        if (userPin.value.length === 4) {
            document.getElementById("input_user").style.display = "none";
            document.getElementById("transaction").style.display = "block";
            document.getElementById("buttons").style.display = "flex";
        } else {
            document.getElementById("pinError").innerHTML = "Your PIN is invalid, please enter a correct PIN";
        }
    } else {
        processWithdrawal();
    }
}




//user balance function
function userBalance() {
    document.getElementById("buttons").style.display = "none";
    document.getElementById("transaction").style.display = "none";
    document.getElementById("display").style.display = "block";
    document.getElementById("userBalShow").innerHTML = "Your current balance is " + currentBalance;
    document.getElementById("date").innerHTML = "Date: " + new Date().toLocaleString();
    document.getElementById("date").style.fontSize = "10px";
}




//user details function
function details() {
    document.getElementById("buttons").style.display = "none";
    document.getElementById("transaction").style.display = "none";
    document.getElementById("display").style.display = "block";
    document.getElementById("userBalShow").innerHTML = "Your current balance is " + currentBalance;
    document.getElementById("date").innerHTML = "Date: " + new Date().toLocaleString();
    document.getElementById("date").style.fontSize = "10px";
}




// withdrawal function
function withdrawal() {
    document.getElementById("buttons").style.display = "none";
    document.getElementById("transaction").style.display = "none";
    document.getElementById("withdrawal_section").style.display = "block";
    document.getElementById("withdrawal_amount").value = "";
    isWithdrawing = true;
}

function processWithdrawal() {
    var amount = parseInt(document.getElementById("withdrawal_amount").value);
    var errorMessage = document.getElementById("withdrawalError");

    if (isNaN(amount) || amount < 500 || amount > 50000) {
        errorMessage.innerHTML = "Please enter a valid amount between 500 - 50000.";
    } else if (amount > currentBalance) {
        errorMessage.innerHTML = "Insufficient funds. Please enter a lower amount.";
    } else {
        currentBalance -= amount;
        alert("Transaction successful! Your new balance is: " + currentBalance);
        document.getElementById("money_boxx").innerHTML = `<img src="./assets/money.gif" width="40px">`;
        userBalance();
        document.getElementById("withdrawal_section").style.display = "none";
        isWithdrawing = false;
    }
}




// user pin change function
function pinChange() {
    var newPin = prompt("Enter your new 4-digit PIN:");
    if (newPin.length === 4 && !isNaN(newPin)) {
        alert("Your PIN has been changed successfully.");
        userPin.value = "";
    } else {
        alert("Invalid PIN. Please enter a 4-digit number.");
    }
}



// money trasfer function
function moneyTransfer() {
    var recipientAccount = prompt("Enter recipient account number:");
    var amount = parseInt(prompt("Enter amount to transfer:"));
    
    if (amount > 0 && amount <= currentBalance) {
        currentBalance -= amount;
        alert("Transfer successful! Your new balance is: " + currentBalance);
        userBalance();
    } else {
        alert("Invalid transfer amount. Please check your balance and try again.");
    }
}




// other transfer function
function otherTransactions() {
    alert("Other transaction options coming soon!");
}
