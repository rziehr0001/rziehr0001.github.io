
var app = angular.module('carsApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider 
      .when('/', {
          templateUrl : 'partials/all_cars.html',    // route for the home page
          controller : 'allCtrl'
      })
      .when('/all_cars', {
          templateUrl : 'partials/all_cars.html',
          controller : 'allCtrl'
      })
      .when('/add_car', {
          templateUrl : 'partials/add_car.html',    // add a car to db
          controller : 'addCtrl'
      })
      .when('/edit_cars', {
          templateUrl : 'partials/edit_cars.html',    // edit a car record
          controller : 'editCtrl'
      })
      .otherwise({
          redirectTo: 'partials/all_cars.html'        // any other URL goes to home
      });
});


          /*   a controller for each page  */
app.controller('allCtrl', function($scope, $http) {
    
   $http.get("/showAll")          // get all the cars 
     .then(function (response) {
	    $scope.cars = response.data;  
     });
});


app.controller('addCtrl', function($scope, $http) {

    $scope.addCar = function() {      // add a student
        var info = {
            sid : $scope.sid,       // set up data object
            first_name : $scope.firstname,
            last_name : $scope.lastname,
            major : $scope.major
        }

        url = "/addCar"

        $http.post(url, info)         // post the object data
            .then(function (response) {
                 $scope.status = response.data;   //print status of request

           // clear textboxes
           $scope.sid = "";
           $scope.firstname = "";
           $scope.lastname = "";
        });
    };
});

app.controller('editCtrl', function($scope, $http) {  // edit miles or price of record
   
   // start with the first car object in the array of cars
   $scope.carIndex = 0;   // array index of a particular car object
    
   $http.get("/showAll")
     .then(function (response) {
	    $scope.cars = response.data;  
        $scope.car = $scope.cars[$scope.carIndex];
		$scope.maxIndex = $scope.cars.length-1;  // index of last car object
     });
  
   $scope.nextRecord = function() {
	   $scope.carIndex += 1;        // go to next car object
	   if($scope.carIndex > $scope.maxIndex) 
	        $scope.carIndex = $scope.maxIndex;
			
	   $scope.car = $scope.cars[$scope.carIndex];
   };
   
   $scope.previousRecord = function() {
	   $scope.carIndex -= 1;        // go to previous car index
	   if($scope.carIndex < 0) 
	        $scope.carIndex = 0;
			
	   $scope.car = $scope.cars[$scope.carIndex];
   };
   
   
   $scope.updateRecord = function() {
	   
	   var car = $scope.cars[$scope.carIndex]
	   
	   var info = {
	      cid : car.cid,
	      miles : car.miles,
	      price : car.price
	  }
	   
	   url = "/updateCar";
	   $http.post(url, info)
          .then(function (response) {
			 $scope.car = $scope.cars[$scope.carIndex];
      });
	   
   }
   
	$scope.deleteRecord = function() {
	   
	   var sid = $scope.cars[$scope.carIndex].sid
	   
	   url = "/deleteCar?sid=" + sid;   // concat for get request
	   //console.log(url)
	   $http.get(url)
          .then(function (response) {
			 //$scope.car = response.data;
			 console.log($scope.car)
			 $scope.maxIndex = $scope.cars.length-1;
			 $scope.car = $scope.cars[$scope.carIndex];
      });
	  
   };
});