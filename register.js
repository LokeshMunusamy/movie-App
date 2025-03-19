let submitBtn = document.querySelector('#submit');

submitBtn.addEventListener('click', () => {
    // console.log(true);

    let firstName = document.getElementById("first-name").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;

    console.log(email, username, firstName);

    let loginDetails = JSON.parse(localStorage.getItem('loginDetails')) || [];

    let emailExists = loginDetails.find(user => user.email === email);

    if (emailExists) {
        alert('Email is already in use. Please use a different email.');
    } else {
        
        loginDetails.push({
            id: Math.floor(Math.random() * 100),  
            name: firstName,
            userName: username,
            email: email
        });

        
        localStorage.setItem('loginDetails', JSON.stringify(loginDetails));

        let link = document.createElement('a');
        link.setAttribute('href', 'movie.html');
        link.click();
    }
});
