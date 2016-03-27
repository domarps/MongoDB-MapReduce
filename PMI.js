/* STAGE I */
use cs410mp3;


var Map1 = function() {
    // get the additionalInfo attribute/field of the resume (it contains sentences with text)
    var additionalInfo = this.additionalInfo;
    var stop_words = ["a","about","above","according","across","after","afterwards","again","against","albeit","all","almost","alone","along","already","also","although","always","am","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anywhere","apart","are","around","as","at","av","be","became","because","become","becomes","becoming","been","before","beforehand","behind","being","below","beside","besides","between","beyond","both","but","by","can","cannot","canst","certain","cf","choose","contrariwise","cos","could","cu","day","do","does","doesn't","doing","dost","doth","double","down","dual","during","each","either","else","elsewhere","enough","et","etc","even","ever","every","everybody","everyone","everything","everywhere","except","excepted","excepting","exception","exclude","excluding","exclusive","far","farther","farthest","few","ff","first","for","formerly","forth","forward","from","front","further","furthermore","furthest","get","go","had","halves","hardly","has","hast","hath","have","he","hence","henceforth","her","here","hereabouts","hereafter","hereby","herein","hereto","hereupon","hers","herself","him","himself","hindmost","his","hither","hitherto","how","however","howsoever","i","ie","if","in","inasmuch","inc","include","included","including","indeed","indoors","inside","insomuch","instead","into","inward","inwards","is","it","its","itself","just","kind","kg","km","last","latter","latterly","less","lest","let","like","little","ltd","many","may","maybe","me","meantime","meanwhile","might","moreover","most","mostly","more","mr","mrs","ms","much","must","my","myself","namely","need","neither","never","nevertheless","next","no","nobody","none","nonetheless","noone","nope","nor","not","nothing","notwithstanding","now","nowadays","nowhere","of","off","often","ok","on","once","one","only","onto","or","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","own","per","perhaps","plenty","provide","quite","rather","really","round","said","sake","same","sang","save","saw","see","seeing","seem","seemed","seeming","seems","seen","seldom","selves","sent","several","shalt","she","should","shown","sideways","since","slept","slew","slung","slunk","smote","so","some","somebody","somehow","someone","something","sometime","sometimes","somewhat","somewhere","spake","spat","spoke","spoken","sprang","sprung","stave","staves","still","such","supposing","than","that","the","thee","their","them","themselves","then","thence","thenceforth","there","thereabout","thereabouts","thereafter","thereby","therefore","therein","thereof","thereon","thereto","thereupon","these","they","this","those","thou","though","thrice","through","throughout","thru","thus","thy","thyself","till","to","together","too","toward","towards","ugh","unable","under","underneath","unless","unlike","until","up","upon","upward","upwards","us","use","used","using","very","via","vs","want","was","we","week","well","were","what","whatever","whatsoever","when","whence","whenever","whensoever","where","whereabouts","whereafter","whereas","whereat","whereby","wherefore","wherefrom","wherein","whereinto","whereof","whereon","wheresoever","whereto","whereunto","whereupon","wherever","wherewith","whether","whew","which","whichever","whichsoever","while","whilst","whither","who","whoa","whoever","whole","whom","whomever","whomsoever","whose","whosoever","why","will","wilt","with","within","without","worse","worst","would","wow","ye","yet","year","yippee","you","your","yours","yourself","yourselves"];
    // only do stuff if non-empty (has some words)
    if (additionalInfo.length > 0) {
        // iterate over words in a document
        additionalInfo_worded = additionalInfo.split(" ");

        for (wordIndex = 0; wordIndex < additionalInfo_worded.length; wordIndex++) {
            // send to the reducer(s) a tuple (word, 1)
            w1 = additionalInfo_worded[wordIndex].toLowerCase().replace(/[^A-Za-z]/g,'').replace("\u2022", "");
            if(stop_words.indexOf(w1)==-1 && w1 != ""){
                emit({"w1": w1,"w2": "psrnvsn2"}, 1);
                if(wordIndex != (additionalInfo_worded.length-1)){
                w2 = additionalInfo_worded[wordIndex+1].toLowerCase().replace(/[^A-Za-z]/g,'').replace("\u2022", "");
                if(stop_words.indexOf(w2)==-1 && w2 != "" && w2 != w1){
                emit({"w1": w1,"w2": w2}, 1);
                }
            }
        }
        }
       }
      }


var emit = function(key, value) {
    print("key: " + key + "  value: " + tojson(value));
};


var Reduce1 = function(key, values) {
    var totalCnt = 0;
    for (var i = 0; i < values.length; i++) {
        totalCnt += values[i];
    }
    return totalCnt;
}

db.pmi_StepI.drop();
db.resumes.mapReduce(Map1, Reduce1, {"out" : {"reduce" : "pmi_StepI"}, "query" : {location : "New York, NY" }});
db.pmi_StepI.find().sort({"value" : -1}).pretty()

/* STAGE II */
var Map2 = function() {
    var tuple = this._id;
    if(tuple.w2 =="psrnvsn2") {
        emit(tuple.w1, {"tuples": {"tuple":tuple, "count":this.value}});
    }
    else
    {
        emit(tuple.w1, {"tuples": {"tuple":tuple, "count":this.value}});
        emit(tuple.w2, {"tuples": {"tuple":tuple, "count":this.value}});
    }
}

var Reduce2 = function(key, values) {
    var reducedValue = {"tuples": []};
    for (var idx = 0; idx < values.length; idx++) {
        reducedValue.tuples = reducedValue.tuples.concat(values[idx].tuples);
    };
    return reducedValue;
}

db.pmi_StepII.drop();
db.pmi_StepI.mapReduce(Map2, Reduce2, {"out" : {"reduce" : "pmi_StepII"}});
db.pmi_StepII.find().sort({"value" : -1}).pretty()


var Map3 = function() {
    // First, loop to find the count of w1
    var word_1 = this._id;
    var tuples = this.value.tuples;
    var word1_count = 0;
    for(var i = 0; i<tuples.length; i++){
        if(tuples[i].tuple.w2 == "psrnvsn2"){
            word1_count = tuples[i].count;
            break;
        }
    }

    // Emit tuples
    for(var j = 0; j<tuples.length; j++){
        if(tuples[j].tuple.w2 !="psrnvsn2" /*&& word_1 != word_2*/ && tuples[j].count > 100){
            var output_key = tuples[j].tuple;
            emit(output_key, {"count_pairs": {"word":word_1, "joint_count": tuples[j].count, "word_cnt": word1_count}});
        }
    }
}

var Reduce3 = function(key, values) {
    var joint_count = values[0].count_pairs.joint_count;
    var word1_count = values[0].count_pairs.word_cnt;
    var word2_count = values[1].count_pairs.word_cnt;
    return Math.log(joint_count/(word1_count * word2_count));
}


db.pmi_StepIII.drop();
db.pmi_StepII.mapReduce(Map3, Reduce3, {"out" : {"reduce" : "pmi_StepIII"}});
db.pmi_StepIII.find().sort({"value" : -1}).pretty()

/* 
{
    "_id" : {
        "w1" : "team",
        "w2" : "player"
    },
    "value" : -4.8707785196384705
}
{
    "_id" : {
        "w1" : "power",
        "w2" : "point"
    },
    "value" : -5.368453174377928
}
{
    "_id" : {
        "w1" : "problem",
        "w2" : "solving"
    },
    "value" : -5.7235319627542385
}
{
    "_id" : {
        "w1" : "operating",
        "w2" : "systems"
    },
    "value" : -6.2084985640761685
}
{
    "_id" : {
        "w1" : "social",
        "w2" : "media"
    },
    "value" : -6.387978490022304
}
{
    "_id" : {
        "w1" : "customer",
        "w2" : "service"
    },
    "value" : -6.680919170900214
}
{
    "_id" : {
        "w1" : "communication",
        "w2" : "skills"
    },
    "value" : -6.8955567546320085
}
{
    "_id" : {
        "w1" : "computer",
        "w2" : "skills"
    },
    "value" : -7.003095538547965
}
{
    "_id" : {
        "w1" : "web",
        "w2" : "services"
    },
    "value" : -7.015260005803181
}
{
    "_id" : {
        "w1" : "new",
        "w2" : "york"
    },
    "value" : -7.103490739257557
}
{
    "_id" : {
        "w1" : "sql",
        "w2" : "server"
    },
    "value" : -7.5410551635619685
}
{
    "_id" : {
        "w1" : "adobe",
        "w2" : "photoshop"
    },
    "value" : -7.823231133479342
}
{
    "_id" : {
        "w1" : "word",
        "w2" : "excel"
    },
    "value" : -7.957714728853016
}
{
    "_id" : {
        "w1" : "skills",
        "w2" : "proficient"
    },
    "value" : -8.096007541523761
}
{
    "_id" : {
        "w1" : "microsoft",
        "w2" : "office"
    },
    "value" : -8.284745493388789
}
{
    "_id" : {
        "w1" : "word",
        "w2" : "powerpoint"
    },
    "value" : -8.365328533013416
}
{
    "_id" : {
        "w1" : "excel",
        "w2" : "powerpoint"
    },
    "value" : -8.430365029251126
}
{
    "_id" : {
        "w1" : "office",
        "w2" : "suite"
    },
    "value" : -8.769789625858788
}
{
    "_id" : {
        "w1" : "microsoft",
        "w2" : "word"
    },
    "value" : -9.001632661251806
}
{
    "_id" : {
        "w1" : "microsoft",
        "w2" : "excel"
    },
    "value" : -9.280021381297622
}
*/

/*
Observations :
The first major observation is that encapsulating keys and values as objects greatly helps in dereferencing them in the Reduce Stage. Further, the Reduce1 and Reduce2 functions have been modeled based on the invertedIndex and wordCount functions previously coded. Another observation is the arbitrary pruning co-efficient 100 which is introduced to avoid those infrequent words have high PMI. To get more interesting and meaningful output, first filter out the (w1,w2) pairs by their count (just as we do using the "New York, NY" query) using the cutoff of 100 and then do the sorting based on PMI for the rest of the words. This has helped us avoid the issue of PMI = 0.
*/