function logout()
{
    gapi.auth.signOut();
    location.reload();
}
function login()
{
  var myParams = {
    'clientid' : "704604537449-4b85mpoilelcccu7e1mf4feaho6jrbk7.apps.googleusercontent.com",
    'cookiepolicy' : 'single_host_origin',
    'callback' : 'loginCallback',
    'approvalprompt':'force',
    'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
  };
  gapi.auth.signIn(myParams);
}

function loginCallback(result) {
            debugger
    if(result['status']['signed_in']) {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });
        request.execute(function (resp) {
            var email = '';
            if(resp['emails']) {
                for(i = 0; i < resp['emails'].length; i++)
                {
                    if(resp['emails'][i]['type'] == 'account')
                    {
                        email = resp['emails'][i]['value'];
                    }
                }
            }

            var str = "Name:" + resp['displayName'] + "<br>";
            str += "Image:" + resp['image']['url'] + "<br>";
            str += "<img src='" + resp['image']['url'] + "' /><br>";

            str += "URL:" + resp['url'] + "<br>";
            str += "Email:" + email + "<br>";
            document.getElementById("profile").innerHTML = str;
        });

    }

}
function onLoadCallback()
{
    gapi.client.setApiKey("AIzaSyCGKXe6ORybY5kDr_hSSQBWhuY8m3KDNl8");
    gapi.client.load('plus', 'v1',function(){});
}
