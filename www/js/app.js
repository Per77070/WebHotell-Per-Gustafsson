angular.module('ArtistApp', ['ionic'])

// Lägg till denna metod för att visa flikarna längst ner på Android.
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.platform.android.tabs.position("bottom");
 })



 .config(function($stateProvider){

$stateProvider
.state("tabs" , {
  url : "/tab" ,
  abstract:true,
  templateUrl : "templates/tabs.html"
})

.state("tabs.home" , {
  url : "/home" ,
  views : {
    "home-tab" : {
      templateUrl : "templates/home.html"
    }
  }
})

.state("tabs.list" , {
  url : "/list" ,
  views : {
    "list-tab" : {
      controller : "ListController",
      templateUrl: "templates/list.html"
    }
  }
})
.state("tabs.detail", {
  url : "/list/:id",
  views :{
    "list-tab" : {
      templateUrl : "templates/detail.html" ,
      controller : "ListController"
    }
  }
})

 // $urlRouterProvider.otherwise("/tab/home");
})

// My Controllers
.controller("ListController",function($scope,$http,$state,$stateParams,$ionicPopup){

  $scope.data = {};


  // Hämta JSON-listan via HTTP
  $http.get('../model/data.json')
       .success(function(data){
         $scope.artists = data;

         $scope.myFilter = $state.params.id;
         console.log($scope.myFilter);

        })
        $scope.diffDate = function(dates1, dates2){
    
          var checkin = new Date(dates1);
          var checkout = new Date(dates2);
          
          var timeDiff = Math.abs(checkout.getTime() - checkin.getTime());
          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
          var diffD=parseInt(diffDays);
          if(diffD==0){
            diffD = 1;
          }
          $scope.diffD=diffD;
          return diffD;
      };
      $scope.showAlert = function() {
  
        var alertPopup = $ionicPopup.alert({
          scope:$scope,
          title: 'Booking Confirmation',
          template: "<h5>Name: " + $scope.data.name + "<br>" + 
                    "Surname: " + $scope.data.surname + "<br>" +
                    "Choosen room: " +$scope.data.room_name + "<br>" +
                    "\nAdult guests: " +$scope.data.adults + "<br>" +
                    "\nChild guests: " +$scope.data.children + "<br>" +
                    "\nCheck-in date: " +$scope.data.dates1 + "<br>" +
                    "\nCheck-out date: " +$scope.data.dates2 + "<br>" +
                    "\nTotal price: " +$scope.totalPrice + "<br>" + "<br>" +
                    "--- Thanks for your booking --- "+ "<br>" + 
                    "We sent a confirmation at "
                     +$scope.data.email + "<br>" +
                    "Have a nice day </h4>", 
                    
          okText: 'OK', // String (default: 'OK'). The text of the OK button.
          okType: 'button-positive', // String (default: 'button-positive'). The type of the OK button.
        });}
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
