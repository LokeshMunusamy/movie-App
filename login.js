let loginButton = document.querySelector('#login-btn');

let memory = JSON.parse(localStorage.getItem('loginDetails')) || [];


loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    let email = document.querySelector('#email').value.trim();
    
    let userExists = memory.find(user => user.email === email);

    if (userExists) {
       localStorage.setItem('userName',`${userExists.userName}`);

        console.log(userExists.userName);
        

        let link = document.createElement('a');
        link.setAttribute('href','movie.html');
        link.click();
    } else {
        alert('Email not match please sign in the account');
    }
    
});
