var myApp = angular.module('myApp',['ui.bootstrap']);

myApp.controller('myCtrl', function($scope, $interval, $dialog) {
    $interval($scope.reloadPlayer, 2000);
    $scope.player = {};
    
    var bg = chrome.extension.getBackgroundPage();
    $scope.player = bg.player;
    $scope.producing = bg.player.producing;
    $scope.ship_type = '';

    $scope.build = function() {

        $dialog.dialog({}).open('../modalContent.html'); 

        bg.player.producing = $scope.producing;
        if($scope.producing === 'ship') {
            bg.player.ship_type = $scope.ship_type.trim();
        }
        chrome.extension.sendRequest({ msg: "savePlayer" });
        $scope.producing = '';
        $scope.ship_type = '';
    };

    $scope.reloadPlayer = function() {
        var bg = chrome.extension.getBackgroundPage();
        $scope.player = bg.player;
        $scope.producing = bg.player.producing;
    }
});


myApp.controller('ModalController', function($scope, close) {
    $scope.close = function(result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };
});
