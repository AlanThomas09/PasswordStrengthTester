
async function checkPassword() {
    let password = document.getElementById("passwordInput").value;
    let lengthMessage = document.getElementById("lengthMessage");
    let capitalMessage = document.getElementById("capitalMessage");
    let numMessage = document.getElementById("numMessage");
    let specialMessage = document.getElementById("specialMessage");
    let pwnedMessage = document.getElementById("pwnedMessage");
    let finalMessage = document.getElementById("finalMessage");

    const isPwned = await checkPasswordPwned(password);

    clearMessages();

    if(checkPasswordLength(password)){
        lengthMessage.textContent = "Password length is good!";
    } else {
        let passlength = password.length;
        lengthMessage.textContent = `Passowrd length is too short, it is ${passlength} character(s) long`;
        return;
    }

    if(checkPasswordCapital(password)){
        capitalMessage.textContent = "Password has a capital letter!";
    } else {
        capitalMessage.textContent = "Password does not have a capital letter!";
        return;
    }

    if(checkPasswordNum(password)){
        numMessage.textContent = "Password has a number!";
    } else {
        numMessage.textContent = "Password does not have a number!";
        return;
    }

    if(checkPasswordSpecial(password)){
        specialMessage.textContent = "Password has a special character!";
    } else {
        specialMessage.textContent = "Password does not have a special character!";
        return;
    }

    if(isPwned){
        pwnedMessage.textContent = "Password has been found in any known breaches!";
        return;
    } else {
        pwnedMessage.textContent = "Password has not been found in any known breaches!";
    }

    finalMessage.textContent = "Password is strong!";

}

function checkPasswordLength(password) {
    return password.length >= 12;
}

function checkPasswordCapital(password) {
    return password.match(/[A-Z]/);
}

function checkPasswordNum(password) {
    return password.match(/[0-9]/);
}

function checkPasswordSpecial(password) {
    return password.match(/[!@#$%^&*?]/);
}

function clearMessages() {
    lengthMessage.textContent = "";
    capitalMessage.textContent = "";
    numMessage.textContent = "";
    specialMessage.textContent = "";
    pwnedMessage.textContent = "";
    finalMessage.textContent = "";
}

async function checkPasswordPwned(password) {
    // 1. Hash the password (SHA-1)
    const passwordHash = await sha1(password);
    const prefix = passwordHash.substring(0, 5).toUpperCase();
    const suffix = passwordHash.substring(5).toUpperCase();

    // 2. Call the Pwned Passwords API
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const hashes = await response.text();

    // 3. Check if the suffix exists in the response
    const found = hashes.split("\n").some(line => {
        const [hashSuffix, count] = line.split(":");
        return hashSuffix === suffix;
    });

    return found;
}


async function sha1(str) {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}


