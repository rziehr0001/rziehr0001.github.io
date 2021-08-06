/*   database: makewaves    Create, Retrieve, Update, Delete  ---  CRUD    */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())               // <-- angularjs sends json data 
app.use(bodyParser.urlencoded({ extended: true }));

var Car = require('./modules/Car.js');  // our Car model

app.use(express.static('public'))       // serve static files


app.use('/showAll', function(req, res) {   // Retrieve all
                                             
    Car.find( function(err, cars) {   
		 if (err) {
		     res.status(500).send(err);
		 }
		 else {
			 res.send(cars);  
		 }
    });
})


app.post('/addCar', function(req, res){
    var newCar = new Car ({
        sid: req.body.sid,
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        major: req.body.major,
        midterm: 0,        // new student has no scores yet
        final: 0
    });

    newCar.save( function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send("Student successfully added.");
        }
    });
});



app.post('/updateCar', function(req, res) {   // Update miles and price

    var update_sid = req.body.sid;    // get posted properties
    var updateLast_name = req.body.last_name;
	var updateMajor = req.body.major;
	var updateMidterm = req.body.midterm;
	var updateFinal = req.body.final;
    
    Car.findOne( {sid: update_sid}, function(err, car) {  
		if (err) {
		    res.status(500).send(err);
		}
		else if (!car) {
		    res.send('No car with a sid of ' + update_sid);
		}
		else {
			car.last_name = updateLast_name;
			car.major = updateMajor;
			car.midterm = updateMidterm;
			car.final = updateFinal;
		
			car.save(function (err) {
                if(err) {
                    res.status(500).send(err);
                }
            });
		    res.send("Update successful");
	   }
    });        

});


app.get('/deleteCar', function(req, res) {   //  Delete
	 var delete_sid = req.query.sid;       //cid is unique, 
	 ///console.log(delete_sid)
	 Car.findOneAndRemove({sid: delete_sid}, function(err, car) {  // 
		if (err) {
		    res.status(500).send(err);
		}
		else if (!car) {
		    res.send('No car with a sid of ' + delete_sid);
		}
		else {
		    res.send("Car sid: " + delete_sid + " deleted."); 
		}
    });         
});





app.listen(3000,  function() {
	console.log('Listening on port 3000, ctrl-c to quit');
    });
