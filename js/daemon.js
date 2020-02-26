window.addEventListener('load', function () {
	this.console.log("DOM fully loaded");
})

function changeCheckbox(checkboxId){
	var boxId = 't' + checkboxId
	var textId = 'l' + checkboxId
	var fbid = document.getElementById(textId).getAttribute('firebase-id')
	var fbc = document.getElementById(textId).getAttribute('firebase-class')

	if (document.getElementById(boxId).getAttribute('checked') == 'true'){
		//Change task to UNCOMPLETE
		document.getElementById(boxId).setAttribute('checked', 'false')
		document.getElementById(textId).style.textDecoration = "none"
		document.getElementById(textId).style.color = "#D53939";
		changeTaskStatus('niccarlson', fbc, fbid, false)
	}else{
		//Change task to COMPLETE
		document.getElementById(boxId).setAttribute('checked', 'true')
		document.getElementById(textId).style.textDecoration = "line-through"
		document.getElementById(textId).style.color = "#ffcaca"
		changeTaskStatus('niccarlson', fbc, fbid, true)
	}
}

function addUser(userId){
	db.collection("todo").doc(userId).set({})
	.then(function() {
		console.log("Created new user: " + userId);
	})
	.catch(function(error) {
		console.error("Error creating user: ", error);
	});
}

function addClass(userId, className){
	db.collection("todo").doc(userId).collection(className).add({})
	.then(function() {
		console.log("Created new class for user " + userId + ": " + className);
	})
	.catch(function(error) {
		console.error("Error creating class '" + className + "' for user " + userId + ": " + error);
	});
}

function addTask(userId, className, duedate, task, timespec){
	db.collection("todo").doc(userId).collection(className).add({
		complete: false,
		// Year, Month(starting from 0), Day, Hours, Minutes)
		duedate: duedate,
		text: task,
		timespec: timespec
	})
	.then(function(docRef) {
		console.log("Created new task (id: " + docRef.id + ") in class '" + className + "' for user " + userId + ": " + task);
	})
	.catch(function(error) {
		console.log("Error creating task, '" + task + "', in class '" + className + "' for user " + userId + ": " + error);
	});
}

function changeTaskStatus(userId, className, taskId, status){
	var taskRef = db.collection("todo").doc(userId).collection(className).doc(taskId);

	// Set the "capital" field of the city 'DC'
	return taskRef.update({
		complete: status
	})
	.then(function() {
		console.log("Successfully changed task ID " + taskId + " status to " + status);
	})
	.catch(function(error) {
		// The document probably doesn't exist.
		console.error("Error changing task ID " + taskId + ": ", error);
	});
	
}
function commands(){
	console.log("------COMMANDS------")
	console.log("	/	userId - (string) FirebaseAuth provided user ID")
	console.log("	/	className - (string) User provided class name")
	console.log("	/	duedate - (timestamp) Timestamp of date task is due")
	console.log("	/	task - (string) Text label for task")
	console.log("	/	timespec - (bool) Is there a specific time the assignment is due")
	console.log("	/	status - (bool) Is the task completed")
	console.log("	addTask(userId, className, duedate, task, timespec)")
	console.log("	addClass(userId, className)")
	console.log("	addUser(userId)")
	console.log("	@N-IM@ changeTaskStatus(userId, className, taskId, status)")
	console.log("	@N-IM@ removeTask(userId, className, taskId)")
}