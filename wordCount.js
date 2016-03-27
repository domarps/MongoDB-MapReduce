/*Submit the first 20 words based on frequency for resumes queried for the New York location*/

/* { "_id" : "", "value" : 52256 }
{ "_id" : "and", "value" : 9995 }
{ "_id" : "•", "value" : 7398 }
{ "_id" : "in", "value" : 3313 }
{ "_id" : "of", "value" : 3274 }
{ "_id" : "to", "value" : 2806 }
{ "_id" : "the", "value" : 2580 }
{ "_id" : "with", "value" : 1805 }
{ "_id" : "Microsoft", "value" : 1604 }
{ "_id" : "&", "value" : 1511 }
{ "_id" : "for", "value" : 1440 }
{ "_id" : "a", "value" : 1276 }
{ "_id" : "-", "value" : 1231 }
{ "_id" : "MS", "value" : 1095 }
{ "_id" : "[…]", "value" : 942 }
{ "_id" : "SKILLS", "value" : 922 }
{ "_id" : "*", "value" : 892 }
{ "_id" : "Office", "value" : 731 }
{ "_id" : "Excel,", "value" : 728 }
{ "_id" : "Skills", "value" : 702 } */


use cs410mp3;
var MyMap = function() {
 	var additionalInfo = this.additionalInfo;
	var stop_words = ["a","about","above","according","across","after","afterwards","again","against","albeit","all","almost","alone","along","already","also","although","always","am","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anywhere","apart","are","around","as","at","av","be","became","because","become","becomes","becoming","been","before","beforehand","behind","being","below","beside","besides","between","beyond","both","but","by","can","cannot","canst","certain","cf","choose","contrariwise","cos","could","cu","day","do","does","doesn't","doing","dost","doth","double","down","dual","during","each","either","else","elsewhere","enough","et","etc","even","ever","every","everybody","everyone","everything","everywhere","except","excepted","excepting","exception","exclude","excluding","exclusive","far","farther","farthest","few","ff","first","for","formerly","forth","forward","from","front","further","furthermore","furthest","get","go","had","halves","hardly","has","hast","hath","have","he","hence","henceforth","her","here","hereabouts","hereafter","hereby","herein","hereto","hereupon","hers","herself","him","himself","hindmost","his","hither","hitherto","how","however","howsoever","i","ie","if","in","inasmuch","inc","include","included","including","indeed","indoors","inside","insomuch","instead","into","inward","inwards","is","it","its","itself","just","kind","kg","km","last","latter","latterly","less","lest","let","like","little","ltd","many","may","maybe","me","meantime","meanwhile","might","moreover","most","mostly","more","mr","mrs","ms","much","must","my","myself","namely","need","neither","never","nevertheless","next","no","nobody","none","nonetheless","noone","nope","nor","not","nothing","notwithstanding","now","nowadays","nowhere","of","off","often","ok","on","once","one","only","onto","or","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","own","per","perhaps","plenty","provide","quite","rather","really","round","said","sake","same","sang","save","saw","see","seeing","seem","seemed","seeming","seems","seen","seldom","selves","sent","several","shalt","she","should","shown","sideways","since","slept","slew","slung","slunk","smote","so","some","somebody","somehow","someone","something","sometime","sometimes","somewhat","somewhere","spake","spat","spoke","spoken","sprang","sprung","stave","staves","still","such","supposing","than","that","the","thee","their","them","themselves","then","thence","thenceforth","there","thereabout","thereabouts","thereafter","thereby","therefore","therein","thereof","thereon","thereto","thereupon","these","they","this","those","thou","though","thrice","through","throughout","thru","thus","thy","thyself","till","to","together","too","toward","towards","ugh","unable","under","underneath","unless","unlike","until","up","upon","upward","upwards","us","use","used","using","very","via","vs","want","was","we","week","well","were","what","whatever","whatsoever","when","whence","whenever","whensoever","where","whereabouts","whereafter","whereas","whereat","whereby","wherefore","wherefrom","wherein","whereinto","whereof","whereon","wheresoever","whereto","whereunto","whereupon","wherever","wherewith","whether","whew","which","whichever","whichsoever","while","whilst","whither","who","whoa","whoever","whole","whom","whomever","whomsoever","whose","whosoever","why","will","wilt","with","within","without","worse","worst","would","wow","ye","yet","year","yippee","you","your","yours","yourself","yourselves"];
	var wordMap = {};
	if(additionalInfo.length > 0) 
	{
	  additionalInfo_worded = additionalInfo.split(" ");
	  for(wordIndex = 0; wordIndex < additionalInfo_worded.length; wordIndex++)
	  {
	  	additionalInfo_worded[wordIndex] = additionalInfo_worded[wordIndex].toLowerCase().replace(/[^A-Za-z0-9\s!?]/g,'');
	  	if(stop_words.indexOf(additionalInfo_worded[wordIndex]) == -1 && additionalInfo_worded[wordIndex] != "")
	  	{
			if(!(additionalInfo_worded[wordIndex] in wordMap))
			{
				wordMap[additionalInfo_worded[wordIndex]] = 1;
			}
			else
			{
				wordMap[additionalInfo_worded[wordIndex]]++;
			}
	    }
	  }
    }
    for(var key in wordMap)
	{
	  	value = wordMap[key];
	  	emit(key,value);
	}
}
var emit = function(key,value){
	print("key: " + key + "     value:" + tojson(value));
};


var MyReduce = function(key,values){
	var totalCnt = 0;
	for(var i = 0; i < values.length; i++){
		totalCnt += values[i];
	}
	return totalCnt;
}
db.word_counts.drop();
db.resumes.mapReduce(MyMap,MyReduce,{"out" : {"reduce": "word_counts"}, "query" : {location : "New York, NY" }});
db.word_counts.find().sort({"value" : -1}).pretty()


/*Submit the first 20 words based on frequency for resumes queried for the New York location after the normalization*/
/* 
{ "_id" : "skills", "value" : 3359 }
{ "_id" : "microsoft", "value" : 1642 }
{ "_id" : "management", "value" : 1481 }
{ "_id" : "office", "value" : 1187 }
{ "_id" : "excel", "value" : 1138 }
{ "_id" : "word", "value" : 983 }
{ "_id" : "sql", "value" : 903 }
{ "_id" : "experience", "value" : 865 }
{ "_id" : "server", "value" : 830 }
{ "_id" : "tools", "value" : 804 }
{ "_id" : "data", "value" : 785 }
{ "_id" : "project", "value" : 768 }
{ "_id" : "windows", "value" : 765 }
{ "_id" : "powerpoint", "value" : 753 }
{ "_id" : "technical", "value" : 747 }
{ "_id" : "business", "value" : 738 }
{ "_id" : "development", "value" : 649 }
{ "_id" : "proficient", "value" : 643 }
{ "_id" : "systems", "value" : 643 }
{ "_id" : "adobe", "value" : 642 }
*/

/*
The stop words and punctuation removal has helped us remove a lot of false candidates for the most frequent word count. These include words such as "the", "a" and "is" as well as the punctuation symbols ranging from periods to bullet points. Also, converting words to lowercase has enabled us to better represent word frequencies on the basis of word ignoring case. Also, partial computation has helped us to smartly bag the frequencies per document and this reflects in the performance.
*/
