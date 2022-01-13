function getLikes() {
  try {
    var likes = getLikesAPI();
    setFBLikes(likes);
  }
  catch (err) {
    MailApp.sendEmail("kn35roby@gmail.com","Facebook Exception", err.toString() + "\r\n" + err.stack.toString());
  }
}


function sendVersettoFBwithPicture() {
  let dayObj = getLiturgicDay();
  let htmlVerse = "\n\n"+dayColor[dayObj.color]+"  "+stringColorMailingList[dayObj.color]+ "  " +dayColor[dayObj.color]+"\n" + getDayFullES().toString().replace(/###/g,"\n");
  htmlVerse += "\n\n#Oremos\n"+lastVerseFullES().toString().replace(/###/g,"\n");
  

  //image treatment
  var file = null
  let folder = DriveApp.getFolderById(ImageFolder);
  
  let findfile = folder.getFilesByName(dayObj.special+".jpg");
  if (findfile.hasNext()) {
    file=findfile.next().getBlob();
  } else {
    file=folder.getFilesByName(dayObj.baseImage).next().getBlob();
  }

  try {
    
    getLikes();
    postMessageWithPicture(htmlVerse, file);
  }
  catch (err) {
    MailApp.sendEmail("kn35roby@gmail.com","Facebook Exception", err.toString() + "\r\n" + err.stack.toString());
  }
}


function sendUserCount() {
  try {
    var messagge = getWeekMsgES().toString().replace(/<TOT>/, getAllUsers()).replace(/###/g,"\r\n");
    let file = DriveApp.getFolderById(ImageFolder).getFilesByName("candele.jpg").next().getBlob();
    
    getLikes();
    result = postMessagewithFeelingAndPicture(messagge, file, "feeling-joyful");
    Logger.log(result);
  }
  catch (err) {
    MailApp.sendEmail("kn35roby@gmail.com","Mail2FB Exception", err.toString() + "\r\n" + err.stack.toString());
  }
}


