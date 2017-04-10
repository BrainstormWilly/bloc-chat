(function() {
    var messageList = {
      templateUrl: '../templates/message-list.html',
      bindings: {
        roomId: '<'
      },
      controller: messageListCtrl
    }

    function messageListCtrl(Message, $state) {
      var $ctrl = this;

      $ctrl.$onChanges = onChanges;

      function onChanges() {
        console.log('Changing Room to: ' + $ctrl.roomId);
        $ctrl.messages = Message.getByRoomId({ $id: $ctrl.roomId });
      }
    }

    angular
        .module('blocChat')
        .component('messageList', messageList);
})();
