function generatePassword(length, lower, upper, numbers, symbols, customWord = '') {
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()-_=+[]{};:,.<>?';

    let availableChars = '';
    if (lower) availableChars += lowerChars;
    if (upper) availableChars += upperChars;
    if (numbers) availableChars += numberChars;
    if (symbols) availableChars += symbolChars;

    if (!availableChars) return 'Please select at least one character type';

    let coreLength = length;
    if (customWord.length > 0) {
        if (customWord.length >= length) {
            return 'Custom word is too long for the password length';
        }
        coreLength = length - customWord.length;
    }

    let password = '';
    for (let i = 0; i < coreLength; i++) {
        const index = Math.floor(Math.random() * availableChars.length);
        password += availableChars[index];
    }

    if (customWord.length > 0) {
        const insertAt = Math.floor(Math.random() * (password.length + 1));
        password = password.slice(0, insertAt) + customWord + password.slice(insertAt);
    }

    return password;
}

document.getElementById('generate').addEventListener('click', () => {
    const length = parseInt(document.getElementById('length').value);
    const lower = document.getElementById('include-lower').checked;
    const upper = document.getElementById('include-upper').checked;
    const numbers = document.getElementById('include-numbers').checked;
    const symbols = document.getElementById('include-symbols').checked;
    const customWord = document.getElementById('custom-word').value.trim();

    const password = generatePassword(length, lower, upper, numbers, symbols, customWord);
    document.getElementById('result').value = password;
});

document.getElementById('copy').addEventListener('click', () => {
    const password = document.getElementById('result');
    password.select();
    password.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert('Password copied to clipboard!');
});