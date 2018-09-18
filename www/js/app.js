// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
}).controller('myCtrl', function($scope,$timeout,$ionicLoading,$ionicPlatform,$rootScope,$state) {
	
	$ionicPlatform.ready(function () {
		
		FCMPlugin.subscribeToTopic('notifyatdoor');
		
		FCMPlugin.onNotification(function(data){
			
			if(data.wasTapped){
			  //Notification was received on device tray and tapped by the user.
			  alert(JSON.stringify(data));
			}else{
			  //Notification was received in foreground. Maybe the user needs to be notified.
			  $rootScope.$broadcast('refreshAlertList');
			  alert(JSON.stringify(data));
			}
		}); 
    })
	
	
	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyBr3Ysy32IxPHdXzNRj2ih-QZyGmHXHBdU",
	authDomain: "myraspdoorbell.firebaseapp.com",
	databaseURL: "https://myraspdoorbell.firebaseio.com",
	projectId: "myraspdoorbell",
	storageBucket: "myraspdoorbell.appspot.com",
	messagingSenderId: "758874340479"
	};
	firebase.initializeApp(config);
	
	
	firebase.database().ref('/myraspdoorbell').on('value', function(snapshot) {
		$scope.allRecords = snapshotToArray(snapshot);
		console.log($scope.allRecords);
	});
	
	startLoadingIcon();
	
	$scope.$on('refreshAlertList', function(event, data) {

	firebase.database().ref('/myraspdoorbell').on('value', function(snapshot) {
		$scope.allRecords = snapshotToArray(snapshot);
		console.log($scope.allRecords);
		startLoadingIcon();
	});
		$timeout(function () {
    $ionicLoading.hide();
    $scope.allRecords1 = $scope.allRecords;
  }, 1000);

	});
	
	function startLoadingIcon(){
			// Setup the loader
	$ionicLoading.show({
		content: 'Loading',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});
	}
	
	$timeout(function () {
    $ionicLoading.hide();
    $scope.allRecords1 = $scope.allRecords;
  }, 2500);
	
	function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};
});
