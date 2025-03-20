let submitBtn = document.querySelector('#submit');

submitBtn.addEventListener('click', () => {
    let firstName = document.getElementById("first-name").value.trim();
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
   
    const emailValidation = /^[a-zA-Z0-9]+@gmail\.com$/;
    
    if (!emailValidation.test(email)) {
        alert('Please enter a valid gmail address');
        return;
    }

    if (firstName === '' || username === '' || email === '') {
        alert('Please fill out all fields.');
        return;
    }

    let loginDetails = JSON.parse(localStorage.getItem('loginDetails')) || [];

    let emailExists = loginDetails.find(user => user.email === email);

    if (emailExists) {
        alert(' This Email is already sign in.');
    } else {
     
        let newUser = {
            id: Math.floor(Math.random() * 100),
            name: firstName,
            userName: username,
            email: email
        };

        loginDetails.push(newUser);

        localStorage.setItem('userName',`${username}`);

        localStorage.setItem('loginDetails', JSON.stringify(loginDetails));

        let link = document.createElement('a');
        link.setAttribute('href', 'movie.html');
        link.click();
    }
});
