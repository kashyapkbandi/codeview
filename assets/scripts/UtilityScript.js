//alert("Helllo");

const OrgUtils = {

    OrgBaseUrl: "https://codestation-dev-ed.my.salesforce.com",
    isData: '/services/data/',
    apiVersion: 'v48.0',
    queryString: '/query/?q='
};


document.querySelector('#executeButtn').addEventListener("click", () => {
    // Event listener for the execute button
    // take the access token from the local storage session.
    let accessTokenValue = retrieveCookie(document.cookie);

    // check if query checkbox is checked or not.
 
    if (document.getElementById("soqlCheck").checked) {
        
        // If the SOQL is checked that means, the APEX should be unchecked
        // Because we will be hitting diff endpoints to handle apex vs soql.
        if (!document.getElementById("apexCheck").checked) {
            // get query / code from the text area
            var query = document.querySelector('#codequeryTextArea').value;
            var result = fetchGETCall(OrgUtils.OrgBaseUrl + OrgUtils.isData + OrgUtils.apiVersion + OrgUtils.queryString + query, 'GET', '', accessTokenValue);
        }
        else {
            alert("Please check either SOQL or APEX.");
        }
    } else
    // this means, apex checkbox is on.
    {
        // if SOQL is unchecked or not
        if (!document.getElementById("soqlCheck").checked) {

        }
        else {
            // if apex and soql are checked
            alert("Please check either SOQL or APEX.");
        }
    }



})



function retrieveCookie(cookie) {
    return cookie.split('=')[1];
}


function fetchGETCall(url, method, payload, accessToken) {
    fetch(url, {
        method: 'get',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // prepare DOM element to display the result.
            prepareDOMElement(data)

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function prepareDOMElement(result) {
   document.getElementById("resultTextArea").value = '';
   document.getElementById("resultTextArea").value = JSON.stringify(result);

}