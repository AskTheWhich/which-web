(function () {
  'use strict';

  angular
    .module('whichWeb')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($http, $log, $scope) {
    var vm = this;

    var token = {"access_token": "ec475c2137d788a2d80070f0a955e508f8b6593e29e3717a93d9f4e51f076ce7"};

    $http.post("/api/asked", token)
      .success(function (data) {
        $log.log(data.asks[1].left.value);
        $scope.asks = [];
        for (var i = 1; i < data.asks.length; i++) {
          var ask = data.asks[i];
          ask.left.relative_size=Math.floor(ask.left.count*100/(ask.left.count+ask.right.count));
          ask.right.relative_size=Math.floor(ask.right.count*100/(ask.left.count+ask.right.count));
          //ask.left = data.asks[i].left.value;
          //ask.right = data.asks[i].right.value;
          $scope.asks.push(ask);
        }
      }).error(function (data) {
    });

  }
})();
