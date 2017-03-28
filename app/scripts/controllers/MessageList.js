(function() {
    var messageList = {
      templateUrl: '../templates/message-list.html',
      bindings: {
        roomId: '<'
      },
      controller: messageListCtrl
    }

    function messageListCtrl(Message) {
      var $ctrl = this;

      $ctrl.$onChange = onChange;
      $ctrl.$onInit = onChange;

      function onChange() {
        console.log($ctrl.roomId)
        $ctrl.messages = Message.getByRoomId({ $id: $ctrl.roomId });
      }

    }

    angular
        .module('blocChat')
        .component('messageList', messageList);
})();
