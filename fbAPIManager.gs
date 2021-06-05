
function doGet(e) {
  Logger.log(e);
}
//Wait for authorizatoins?????????
function getAppToken() {
  var url = "https://graph.facebook.com/oauth/access_token?client_id="+fbAppId+"&client_secret="+fbAppPwd+"&grant_type=client_credentials";
  var result = callFB('post', url);
  var objJFB = JSON.parse(result);
  var url= 'https://graph.facebook.com/v10.0/'+pageId+'/feed?message=Prova&access_token='+encodeURI(objJFB.access_token);
  return callFB('post', url);
  Logger.log(result.toString());  

}

function getLongLivingAppToken() {
  var url = "https://graph.facebook.com/v10.0/oauth/access_token?grant_type=fb_exchange_token&client_id="+fbAppId+"&client_secret="+fbAppPwd+"&fb_exchange_token="+fbAppToken;
  var result = callFB('post', url);
  Logger.log(result.toString());
}

function getMessages() {
  var url= 'https://graph.facebook.com/v10.0/'+pageId+'/feed?access_token='+encodeURI(fbAppToken);
  callFB('get', url);

}

function getLikesAPI() {
  var url= 'https://graph.facebook.com/v9.0/'+pageId+'?fields=fan_count,followers_count&access_token='+encodeURI(fbAppToken);
  let result = callFB('get', url);
  return Math.max(JSON.parse(result).fan_count,JSON.parse(result).followers_count);

}

function getMe() {
  var url= 'https://graph.facebook.com/v10.0/'+me+'/accounts?access_token='+fbUserToken;
  callFB('get', url);
} 

function getMessages() {
  var url= 'https://graph.facebook.com/v10.0/'+pageId+'/feed?access_token='+encodeURI(fbAppToken);
  callFB('get', url);
}

function postMessage(text) {
  var url= 'https://graph.facebook.com/v10.0/'+pageId+'/feed?message='+text+'&access_token='+encodeURI(fbAppToken);
  callFB('post', url);
}

function postMessageHappy(text) {
  var url= 'https://graph.facebook.com/v10.0/'+pageId+'/feed?message='+text+'&og_action_type_id=383634835006146&og_object_id=241047402726961&access_token='+encodeURI(fbAppToken);
  return callFB('post', url);
}

function postMessagewithFeelingAndPicture(text,file,feeling) {
  var action = ""
  switch (feeling){
    case "happy" : action = "528297480516636"; break;
    case "joyful" : action = "477906418922117"; break;
    case "loved" : action = "123103951186111"; break;
    case "peaceful" : action = "112626832239338"; break;
  }
  var url= 'https://graph.facebook.com/v10.0/'+pageId+'/photos';
    var dataJSON = {
    'source': file,
    'message' : text,
    'og_action_type_id': '383634835006146',
    'og_object_id': action,
    'access_token': encodeURI(fbAppToken)
  }

  return callFBwithData('post', url, dataJSON);
}

function postMessageWithPicture (text, file) {
  var url= 'https://graph.facebook.com/v10.0/'+pageId+'/photos';
    var dataJSON = {
    'source': file,
    'message' : text,
    'access_token': encodeURI(fbAppToken)
  }
  return callFBwithData ('post', url, dataJSON);
}

function callFB(method, url) {
  //Logger.log(url);
  var option = {
  'method' : method,
  'muteHttpExceptions' : true,
  };
  var result = UrlFetchApp.fetch(url, option);
  //Logger.log(result.getAllHeaders());
  Logger.log(result);
  return result;
}

function callFBwithData(method, url, data) {
  //Logger.log(url);
  var option = {
  'method' : method,
  'muteHttpExceptions' : true,
  'payload' : data
  };
  var result = UrlFetchApp.fetch(url, option);
  return result;
}

//TO ADD FEELINGS
////https://developers.facebook.com/docs/graph-api/reference/v9.0/page/feed/feelings#objects
//og_action_type_id=383634835006146&og_object_id=241047402726961 = Felicissimo!
//og_action_type_id=383634835006146&og_object_id=387086391386101 = Pieno di gioia

//change icon
//og_icon_id=1561198480803111 = Bibbia
//og_icon_id=963051530439695 = Uova di pasqua
//og_icon_id=250821078407713 = Albero di Natale
//og_icon_id=554424167979437 = Chiesa
