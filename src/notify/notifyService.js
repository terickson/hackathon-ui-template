appModule.factory('notifyService', function ($rootScope, notifyEvents) {

    var notifications = [];

    var typeIcons = {
        success: "fa-check",
        error: "fa-warning"
    };

    function success(message, elementType) {
        notifications.push({type: 'success', text: message, defaultIcon: typeIcons.success, elementType: elementType});
        $rootScope.$broadcast(notifyEvents.newNotification, {message: message});
    }

    function error(message, elementType) {
        notifications.push({type: 'error', text: message, defaultIcon: typeIcons.error, elementType: elementType});
        $rootScope.$broadcast(notifyEvents.newNotification, {message: message});
    }

    function getNotifications() {
        return notifications;
    }

    function dismiss(notification) {
        notifications.remove(notification);
    }

    return {
        getNotifications: getNotifications,
        dismiss: dismiss,
        success: success,
        error: error
    };
});
