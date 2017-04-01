(function() {
    var messageList = {
      templateUrl: '../templates/message-list.html',
      bindings: {
        roomId: '<'
      },
      controller: messageListCtrl
    }

    function messageListCtrl(Message, $state, moment) {
      var $ctrl = this;
      var onChanges = function () {
        // console.log('Changing Room to: ' + $ctrl.roomId);
        $ctrl.messages = Message.getByRoomId({ $id: $ctrl.roomId });
      };

      $ctrl.$onChanges = onChanges;


    }

    angular
        .module('blocChat')
        .component('messageList', messageList);
})();
