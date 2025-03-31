# PasswordStrengthTester

A web-based password strength testing tool that helps users create secure passwords by checking multiple security criteria and verifying against known data breaches.

## Features

- **Minimum Length Check**: Ensures password is at least 12 characters long
- **Character Variety Checks**:
  - Capital letters
  - Numbers
  - Special characters (!@#$%^&*?)
- **Data Breach Check**: Verifies if the password has appeared in known data breaches using the HaveIBeenPwned API
- **Real-time Feedback**: Provides immediate visual feedback for each security point

## How It Works

1. Enter your password in the input field
2. The tool instantly checks:
   - Password length (minimum 12 characters)
   - Presence of capital letters
   - Presence of numbers
   - Presence of special characters
   - Whether the password has been exposed in known data breaches
3. Receive immediate feedback on each point
4. Get a final verdict on password strength

## Security

- Password checking is performed client-side
- For breach checking, passwords are never sent in plain text
- Uses k-anonymity model with SHA-1 hashing for secure API queries
- Implements the HaveIBeenPwned API for breach verification

## Technologies Used

- HTML5
- CSS3
- JavaScript
- HaveIBeenPwned API

## Usage

Simply open `index.html` in a web browser to start using the password strength tester.