'use strict';

/*Observer patern with function factories*/

/*compose utility*/

function compose(destination, source) {
	for(var key in source) {
		destination[key] = source[key];
	}
}

/*ObserverList factory*/
function observerList() {
	var list = [];
	
	function add(obj) {
		list.push(obj);
	}
	
	function getObserver(index) {
		return list[index];
	}
	
	function indexOf(obj) {
		var listLength = list.length;
		var i = 0;
		while(listLength > i) {
			if(obj === list) {
				return i;
			}
			i++;
		}
	}
	
	function getListLength() {
		return list.length;
	}
	
	function remove(obj) {
		list.splice(indexOf(obj), 1);
	}
	
	return {
		list : list,
		add : add,
		getObserver : getObserver,
		indexOf : indexOf,
		remove : remove,
		getListLength : getListLength
	}
}

function subject() {
	var observersList = observerList();
	
	function addObserver(obj) {
		observersList.add(obj);
	}
	
	function removeObserver(obj) {
		observersList.remove(obj);
	}
	
	function notify(context) {
		var listLength = observersList.getListLength();
		for( i ; i < listLength ; i++) {
			observersList.getObserver(i).update(context);
		}
	}
	
	return {
		observerList : observerList,
		addObserver : addObserver,
		notify : notify
	}
}

function observer() {
	function update(context) {
		this.checked = context;
	}
	
	return {
		update : update
	}
}


/*the app*/

var addNewObserverButton = document.querySelector('#addNewObserver');
var mainSubject = document.querySelector('#mainCheck');
var observersContainer = document.querySelector('#observerContainer');

function addNewObserver() {
	var check = document.createElement('input');
	check.type = 'checkbox';
	compose(check, observer());
	mainSubject.addObserver(check);
	observerContainer.appendChild(check);
}



compose(mainSubject, subject());
addNewObserverButton.onclick = addNewObserver;

mainSubject.onclick = function() {
	mainSubject.notify(mainSubject.checked);
}