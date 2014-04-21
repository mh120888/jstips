app.controller("MainController", function($scope){
  $scope.billWithoutTip = 0;
  $scope.tipPercentage = 15;
  $scope.tip = function(tipPercentage) {
    return tipPercentage/100;
  };
  $scope.calculateTip = function(total, tipPercentage) {
    return (total * tipPercentage).toFixed(2);
  };
  $scope.calculateBillWithTip = function(total, tipPercentage) {
    return (total * (1+tipPercentage)).toFixed(2);
  };
});