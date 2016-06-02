'use strict';

/*Observer pattern with Contructor*/

function ObserverList() {
	this.observerList = [];
}

ObserverList.prototype.add = function( obj ) {
	this.observerList.push(obj);
}

ObserverList.prototype.count = function() {
	return this.observerList.length;
}

ObserverList.prototype.get = function(index) {
	if(index > -1 && index < this.observerList.length) {
		return this.observerList[index];
	}
}

ObserverList.prototype.indexOf = function(obj, index) {
	var i = index || 0;
	
	while(i < this.observerList.length) {
		if(this.observerList[i] === obj) {
			return i;
		}
		i++;
	}
	
	return -1;
}

ObserverList.prototype.removeAt = function(index) {
	this.observerList.splice(index, 1);
}

function Subject() {
	this.observers = new ObserverList();
}

Subject.prototype.addObserver = function(observer) {
	this.observers.add(observer);
}

Subject.prototype.removeObserver = function(observer) {
	this.observers.removeAt(this.observers.indexOf(observer));
}

Subject.prototype.notify = function(context) {
	var observersCount = this.observers.count();
	for(var i = 0;i < observersCount;i++) {
		this.observers.get(i).update(context);
	}
}

function Observer() {
	
}

Observer.prototype.update = function(context) {
	this.checked = context;
}

var controleCheck = document.querySelector('#mainCheck'),
	addButton = document.querySelector('#addNewObserver'),
	container = document.querySelector('#observerContainer');

function extend(destination, source) {
	for(var key in source) {
		destination[key] = source[key];
	}
}

extend(controleCheck, new Subject());

controleCheck.onclick = function() {
	controleCheck.notify(controleCheck.checked);
}

addButton.onclick = addNewObserver;

function addNewObserver() {
	var check = document.createElement('input');
	check.type = 'checkbox';
	
	extend(check, new Observer())
	
	controleCheck.addObserver(check);
	
	container.appendChild(check);
}