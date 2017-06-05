(function(global){
	'use strict';

	var userName = prompt('Whats your username?');
	var userKey;

	// Get a reference to the database service
	var database = firebase.database();

	function addNewUser(username, data) {
		// Get a key for a new user.
		userKey = firebase.database().ref().child('users').push().key;

		// Write the new post's data simultaneously in the posts list and the user's post list.
		var updates = {};
		updates['/users/' + userKey] = {
			name: username,
		};

		return firebase.database().ref().update(updates);
	}

	function removeUser(key) {
		var updates = {};
		updates['/users/' + key] = null;
		return firebase.database().ref().update(updates);
	}

	function updateUsersList() {

	}

	////////////////////////////////////////////////////////

	addNewUser(userName);
	var listConnected = global.document.getElementById('listConnected');

	global.addEventListener("beforeunload", function(e){
		removeUser(userKey)
	});

	var usersRef = firebase.database().ref('users');
	usersRef.on('value', function(snapshot) {
		listConnected.textContent = JSON.stringify(snapshot.val());
	});

})(window)
