let loginButton = document.querySelector('#login-btn');

let memory = JSON.parse(localStorage.getItem('loginDetails')) || [];

loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    let email = document.querySelector('#email').value.trim();

    let signInName;
    
    let userExists = memory.find(user => user.email === email);

    if (userExists) {
        signInName = userExists.name;
        let link = document.createElement('a');
        link.setAttribute('href','movie.html');
        link.click();
    } else {
        // console.log(false);
       
        alert('Email not match please sign in the account');
    }

    // document.querySelector('.show-name').textConten = signInName;
    // let a = document.querySelector('.show-name').textContent;
    // console.log(a);
    
});

