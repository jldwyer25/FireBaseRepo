// Initialize Firebase
var config = {
    apiKey: "AIzaSyA7RovuMDcBW9k0-F_tl4ZM8e-qokEu-YQ",
    authDomain: "train-schedule-hw-6afb4.firebaseapp.com",
    databaseURL: "https://train-schedule-hw-6afb4.firebaseio.com",
    projectId: "train-schedule-hw-6afb4",
    storageBucket: "train-schedule-hw-6afb4.appspot.com",
    messagingSenderId: "529103809559"
};

firebase.initializeApp(config);
//save firebase as var database like examples
var database = firebase.database();
//on click for submit button
    $("#submit").on("click", function (event) {
        //crucial for preventing refresh
        event.preventDefault();
        //input variables for each, with conversion on trainFirst 
        var trainName = $("#train-name").val().trim();
        var trainDest = $("#destination").val().trim();
        //use moment.js library to convert
        var trainFirst = moment($("#train-time").val().trim(),"HH:mm").subtract(10,"years").format("X");
        var trainFreq = $("#frequency").val().trim();


//saving firebase columns
        var newTrain = {
            name: trainName,
            destination: trainDest,
            trainFirst: trainFirst,
            frequency: trainFreq
        }

        database.ref().push(newTrain);


//empties input boxes after click & fetch
        $("#train-name").val("");
        $("#destination").val("");
        $("#train-time").val("");
        $("#frequency").val("");
        //also prevents refersh
        return false;
        
    });


database.ref().on("child_added", function(childSnapshot){
    event.preventDefault();
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().trainFirst;
    var frequency = childSnapshot.val().frequency;

//this math took me far too long
    var remainder = moment().diff(moment.unix(trainFirst),"minutes")%frequency;
    var minutes = frequency-remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");
    //returned as NaN for too long, realized that these and pieces above had to equal firebase columns
    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $(".table").append("<thead><tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
    // $(".table").append("<thead> <tr> <td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + trainFirst + "</td><td>" + "" + "</td></tr></thead>");
})


//copied from assignment 21, week 7

// // // Assumptions
// // var tFrequency = 3;

// // // Time is 3:30 AM
// // var firstTime = "03:30";

// // // First Time (pushed back 1 year to make sure it comes before current time)
// // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// // console.log(firstTimeConverted);

// // // Current Time
// // var currentTime = moment();
// // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// // // Difference between the times
// // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// // console.log("DIFFERENCE IN TIME: " + diffTime);

// // // Time apart (remainder)
// // var tRemainder = diffTime % tFrequency;
// // console.log(tRemainder);

// // // Minute Until Train
// // var tMinutesTillTrain = tFrequency - tRemainder;
// // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// // // Next Train
// // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
// // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));