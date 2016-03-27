var MyMapInvIndex = function(){
	var additionalInfo = this.additionalInfo;
	//invertedDictionary is a map with key as word and value tuple as {docID, tf}

	if(additionalInfo.length > 0)
	{
		additionalInfo_worded = additionalInfo.split(" ");
		var invertedIndexDictionary = {};
		for(wordIndex = 0; wordIndex < additionalInfo_worded.length; wordIndex++)
		{
			var target = additionalInfo_worded[wordIndex].toLowerCase();
			if (!(target in invertedIndexDictionary))
			{
                invertedIndexDictionary[target] = 1;
            }
            else{
                invertedIndexDictionary[target] += 1;
            }
		} 
		for (key in invertedIndexDictionary)
		{
			emit(key, { "docIds" : { "docId" : this._id, "TF" : invertedIndexDictionary[key] } });
		}
	}
}

var emit = function(key,value){
	print("key: " + key + "  value: " + tojson(value));
};

var MyReduceInvIndex = function(key,values){
	var reducedValue = {"docIds" : []};
	for(var idx = 0; idx < values.length ; idx++)
	{
		reducedValue.docIds = reducedValue.docIds.concat(values[idx].docIds);
	};
	return reducedValue;
}

db.inverted_index.drop();
db.resumes.mapReduce(MyMapInvIndex,MyReduceInvIndex,{"out" : {"reduce" : "inverted_index"},"query" : {location : "New York, NY"}});

db.inverted_index.aggregate([{$unwind: "$value.docIds"},
							 {$group: {_id:"$_id", "docs": {$push:"$value.docIds"}, 
							  size: {$sum:1}}}, 
							 {$sort:{size:-1}}
							]);
db.inverted_index.find().sort({"value" : -1}).pretty()
