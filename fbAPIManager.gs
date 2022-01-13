
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
  var url= 'https://graph.facebook.com/v10.0/'+pageId+'?fields=fan_count,followers_count&access_token='+encodeURI(fbAppToken);
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
  var action = "";
  let og_icon = null;
  switch (feeling){
    case "feeling-happy" : og_action = "383634835006146"; og_object = "528297480516636"; break;
    case "feeling-joyful" : og_action = "383634835006146"; og_object = "477906418922117"; break;  //count
    case "feeling-loved" : og_action = "383634835006146"; og_object = "123103951186111"; break;   //Ordinario L
    case "feeling-peaceful" : og_action = "383634835006146"; og_object = "112626832239338"; break;  
    case "feeling-greatful" : og_action = "383634835006146"; og_object = "118365354995398"; break;  //Ordinario B
    case "feeling-blessed" : og_action = "383634835006146"; og_object = "525497104142297"; break;  //"baciato dalla fortuna"
    case "feeling-asleep" : og_action = "383634835006146"; og_object = "303442589773009"; break;  //Compieta
    case "feeling-guilty" : og_action = "383634835006146"; og_object = "137611796392379"; break; 
    case "feeling-blissful" : og_action = "383634835006146"; og_object = "387086391386101"; break;  //Ordinario G
    case "feeling-miserable" : og_action = "383634835006146"; og_object = "571661296183476"; break;  //Ordinario D
    case "looking_for-meaning_of_live" : og_action = "809473052422320"; og_object = "702785553174397"; break;
    case "looking_for-prayers" : og_action = "601369976565963"; og_object = "642209422517607"; break;
    case "looking_for-God" : og_action = "601369976565963"; og_object = "688923214487282";  og_icon = "1561198480803111"; break;  //Memoria
    case "looking_for-Christmas" : og_action = "601369976565963"; og_object = "1000015966680809";  og_icon = "1561198480803111"; break; //Avvento
    case "looking_for-Easter" : og_action = "601369976565963"; og_object = "817166444993021"; break;  //Quaresima
    case "attending-Sunday_mass" : og_action = "668012816568345"; og_object = "1078040888880229"; break;
    case "attending-mass" : og_action = "668012816568345"; og_object = "1162279090464707"; break;
    case "celebrates-Christmas" : og_action = "742120442490915"; og_object = "1000015966680809"; break;  // tempo di Natale
    case "celebrates-special_day" : og_action = "742120442490915"; og_object = "752044064878373"; break;  //Feste
    case "celebrates-Easter" : og_action = "742120442490915"; og_object = "817166444993021"; break;  // tempo di Pasqua

  }
  var url= 'https://graph.facebook.com/v10.0/'+pageId+'/photos';
    var dataJSON = {
    'source': file,
    'message' : text,
    'og_action_type_id': og_action,
    'og_object_id': og_object,
    'access_token': encodeURI(fbAppToken)
  }
  if (og_icon) { dataJSON.og_icon_id =og_icon; }

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
