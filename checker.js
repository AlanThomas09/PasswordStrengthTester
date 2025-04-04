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

    let strongPassword = checkPasswordLength(password) && checkPasswordCapital(password) && checkPasswordNum(password) && checkPasswordSpecial(password) && !isPwned;
    if(strongPassword) {
        setMessage(finalMessage, "Password is strong!", "goodMessage");
        return;
    } else {
        setMessage(finalMessage, "Password is not strong!", "badMessage");
    }

    if(checkPasswordLength(password)){
        setMessage(lengthMessage, "Password Length is good!", "goodMessage");
    } else {
        setMessage(lengthMessage, `Password Length is ${password.length} characters long. Recommended length is 12 characters or more.`, "badMessage");
    }

    if(checkPasswordCapital(password)){
        setMessage(capitalMessage, "Password contains a capital letter!", "goodMessage");
    } else {
        setMessage(capitalMessage, "Password does not contain a capital letter!", "badMessage");
    }

    if(checkPasswordNum(password)){
        setMessage(numMessage, "Password contains a number!", "goodMessage");
    } else {
        setMessage(numMessage, "Password does not contain a number!", "badMessage");
    }

    if(checkPasswordSpecial(password)){
        setMessage(specialMessage, "Password contains a special character!", "goodMessage");
    } else {
        setMessage(specialMessage, "Password does not contain a special character!", "badMessage");
    }

    if(isPwned){
        setMessage(pwnedMessage, "Password has been compromised!", "badMessage");
    } else {
        setMessage(pwnedMessage, "Password has not been compromised!", "goodMessage");
    }
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

function setMessage(element, text, className) {
    element.style.animation = 'none';
    element.offsetHeight;
    element.style.animation = null;
    element.textContent = text;
    element.className = className;
}

function clearMessages() {
    const messages = [
        lengthMessage, capitalMessage, numMessage, 
        specialMessage, pwnedMessage, finalMessage
    ];
    
    messages.forEach(msg => {
        msg.textContent = "";
        msg.className = "";
        msg.style.animation = 'none';
    });
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
