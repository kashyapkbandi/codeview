//alert("Helllo");

const OrgUtils = {

    OrgBaseUrl:"https://codestation-dev-ed.my.salesforce.com",
    isData:'/services/data/',
    apiVersion:'v48.0',
    queryString:'/query/?q='
};


document.querySelector('#executeButtn').addEventListener("click",()=>{
// Event listener for the execute button
// take the access token from the local storage session.
let accessTokenValue= retrieveCookie(document.cookie);

// get query / code from the text area
var query = document.querySelector('#codequeryTextArea').value;

fetchCall(OrgUtils.OrgBaseUrl+OrgUtils.isData+OrgUtils.apiVersion+OrgUtils.queryString+query)



})



function retrieveCookie(cookie) {
    return cookie.split('=')[1];
}


function fetchCall(url,method,payload,accessToken)
{
    fetch(url, {
        method: 'get',
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer "+accessToken
        }
      })
    .then(response => response.json())
.then(data => {
console.log('Success:', data);
})
.catch((error) => {
console.error('Error:', error);
});
}