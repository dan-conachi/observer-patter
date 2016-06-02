'use strict';

var subject,
	observer,
	observed,
	addObserver =  document.querySelector('#addNewObserver'),
	observersContainer = document.querySelector('#observerContainer');

/*Observer pattern with object composition*/

/*function to copy object properties from source object to destination object*/
function compose(destination, source) {
	for(var key in source) {
		destination[key] = source[key];
	}
	return destination;
}

var observerList = {
	list : [],
	add : function(obj) {
		this.list.push(obj);
	},
	get : function(index) {
		return this.list[index];
	},
	getIndex : function(obj) {
		var i = 0;
		while(i < this.list.length) {
			if(this.list[i] === obj) {
				return i;
			}
			i++;
		}
		return -1
	},
	removeAt : function(index) {
		if(index > -1 && index < this.list.length) {
			this.list.splice(index, 1);
		}
	}
}

subject = {
	observerList : observerList,
	addObserver : function(observer) {
		this.observerList.add(observer);
	},
	removeObserver : function(observer) {
		this.observerList.removeAt(this.observerList.getIndex(observer))
	},
	notify : function(context) {
		for(var i =0 ; i < observerList.list.length; i++) {
			this.observerList.get(i).update(context);
		}
	}
}

observer = {
	update : function(context) {
		this.checked = context;
	}
}

/*patern ends here*/

/*app starts here*/
function addNewObserver() {
	var check = document.createElement('input');
	check.type = 'checkbox';
	observersContainer.appendChild(check);
	compose(check, observer);
	observed.addObserver(check);
}

/*make the mainCheck an observable*/
observed = document.querySelector('#mainCheck');
compose(observed, subject);

observed.onclick =  function() {
	observed.notify(observed.checked);
}

addObserver.onclick = addNewObserver;