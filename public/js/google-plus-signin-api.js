function logout() {
    gapi.auth.signOut();
    location.reload();
}

function login() {
  var myParams = {
    'clientid' : '1035533829067-nie5rpjn00bj5m64442l4p8t6l9o50bk.apps.googleusercontent.com',
    'cookiepolicy' : 'single_host_origin',
    'callback' : 'loginCallback',
    'approvalprompt':'force',
    'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
  };
  gapi.auth.signIn(myParams);
}

function loginCallback(result) {
    if(result['status']['signed_in']) {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });
        debugger
        request.done(function (response){
            debugger
            // if (response.status === 'true') {
            // window.location = '/bookmarks';
            // }
        });
        request.execute(function (resp) {
            var email = '';
            if(resp['emails']) {
                for(i = 0; i < resp['emails'].length; i++) {
                    if(resp['emails'][i]['type'] == 'account'){
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
function onLoadCallback() {
    gapi.client.setApiKey('AIzaSyBCOVwBDcKvimPn_SLHGjUWbcGKbn32H6E');
    gapi.client.load('plus', 'v1',function(){});
}

gapi.client.load('plus','v1', function(){
 var request = gapi.client.plus.people.list({
   'userId': 'me',
   'collection': 'visible'
 });
 request.execute(function(resp) {
   console.log('Num people visible:' + resp.totalItems);
 });
});