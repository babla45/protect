
function EncButton() {
    
    var messageBox=document.getElementById("message");
    var userName = document.querySelector(".usernameField").value;
    var password  = document.querySelector(".passwordField").value;
    
    if(userName=="") { userName="not entered"; }
    if(password=="") {  password="not entered"; }
        
    if(password!="not entered")
    {

        var enc_message=enc(password);
        var enc_username=enc(userName);
        if(userName=="not entered") enc_username=userName;
        // alert("returned value is = "+n);
        messageBox.style.display="block";
        messageBox.style.textAlign="center";
        messageBox.innerHTML="Encrypted username:\n"+enc_username+"\n\nEncrypted password:\n"+enc_message;

        document.getElementById("body").style.background="black";
        document.querySelector(".username").style.color="red";
        document.querySelector(".password").style.color="red";
        document.querySelector(".welcome-message").style.color="blue";
        
        setTimeout(function() {
            messageBox.innerHTML="";
            messageBox.style.display="none";
            document.getElementById("body").style.background="white";
            
        },55500);
    }
    
    else
    {
        //alert("You haven't filled the password field");
        messageBox.style.display="block";
        messageBox.style.textAlign="center";
        messageBox.innerHTML="Opps!\nPlease fill up the password field";
        
        document.getElementById("body").style.background="pink";
        
        setTimeout(function() {
            messageBox.innerHTML="";
            messageBox.style.display="none";
            document.getElementById("body").style.background="white";
            
        },46500);
    }
    
}

function DecButton() {
    
    var messageBox=document.getElementById("message");
    var userName = document.querySelector(".usernameField").value;
    var password  = document.querySelector(".passwordField").value;
    
    if(userName=="") { userName="not entered"; }
    if(password=="") {  password="not entered"; }
        
    if(password!="not entered")
    {

        var dec_username=dec(userName);
        var dec_message=dec(password);
        if(userName=="not entered") dec_username=userName;
        // alert("returned value is = "+n);
        messageBox.style.display="block";
        messageBox.style.textAlign="center";
        messageBox.innerHTML="Decrypted username:\n"+dec_username+"\n\nDecrypted password:\n"+dec_message;
        n++;
        document.getElementById("body").style.background="black";
        document.querySelector(".username").style.color="red";
        document.querySelector(".password").style.color="red";
        document.querySelector(".welcome-message").style.color="blue";
        
        setTimeout(function() {
            messageBox.innerHTML="";
            messageBox.style.display="none";
            document.getElementById("body").style.background="white";
            
        },55500);
    }
    
    else
    {
        //alert("You haven't filled the password field");
        messageBox.style.display="block";
        messageBox.style.textAlign="center";
        messageBox.innerHTML="Opps!\nPlease fill up the password field";
        
        document.getElementById("body").style.background="pink";
        
        setTimeout(function() {
            messageBox.innerHTML="";
            messageBox.style.display="none";
            document.getElementById("body").style.background="white";
            
        },46500);
    }
    
}



function enc(str) {

    let final_result='';
    let s=str.split('\n');
    const len=s.length,pass=55;

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
    return final_result;
}

function dec(str) {

    let final_result='';
    let s=str.split('\n');
    const len=s.length,pass=55;

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
    return final_result;
}



let s = "hello Bangladeshi people! I am here to help you today with so many helping books and with some food for the poor people living in your country";

console.log(s + "\n\n\n");
let encrypted_msg = enc(s);
let decrypted_msg = dec(encrypted_msg);

console.log("Encrypted message=" + encrypted_msg + "\n\n");
console.log("Decrypted message=" + decrypted_msg + "\n\n");