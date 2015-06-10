﻿(function () {
    'use strict';

    var controllerId = 'basicsController';
    angular.module('main')
        .controller(controllerId, ['resourcePoolService', 'userService', '$rootScope', 'logger', basicsController]);

    function basicsController(resourcePoolService, userService, $rootScope, logger) {

        logger = logger.forSource(controllerId);

        var vm = this;
        vm.isAuthenticated = false;

        // Logged in?
        userService.getCurrentUser()
            .then(function (currentUser) {
                vm.isAuthenticated = currentUser.Id > 0;
            })
            .catch(function (error) {

            })
            .finally(function () {
                vm.basics_ExistingModelResourcePoolId = 2;
                vm.basics_NewModelResourcePoolId = 3;
            });

        // User logged out
        $rootScope.$on('userLoggedOut', function () {
            vm.isAuthenticated = false;
        });

        // Listen resource pool updated event
        $rootScope.$on('resourcePoolEditor_elementMultiplierIncreased', updateOppositeResourcePool);
        $rootScope.$on('resourcePoolEditor_elementMultiplierDecreased', updateOppositeResourcePool);
        $rootScope.$on('resourcePoolEditor_elementMultiplierReset', updateOppositeResourcePool);

        function updateOppositeResourcePool(event, element) {

            if (element.ResourcePool.Id === vm.basics_ExistingModelResourcePoolId
                || element.ResourcePool.Id === vm.basics_NewModelResourcePoolId) {

                var oppositeResourcePoolId = element.ResourcePool.Id === vm.basics_ExistingModelResourcePoolId
                    ? vm.basics_NewModelResourcePoolId
                    : vm.basics_ExistingModelResourcePoolId;

                // Call the service to increase the multiplier
                resourcePoolService.getResourcePoolExpanded(oppositeResourcePoolId)
                    .then(function (resourcePoolSet) {

                        var resourcePool = resourcePoolSet[0];

                        var result = false;
                        switch (event.name) {
                            case 'resourcePoolEditor_elementMultiplierIncreased': { userService.updateElementMultiplier(resourcePool.MainElement, 'increase'); break; }
                            case 'resourcePoolEditor_elementMultiplierDecreased': { userService.updateElementMultiplier(resourcePool.MainElement, 'decrease'); break; }
                            case 'resourcePoolEditor_elementMultiplierReset': { userService.updateElementMultiplier(resourcePool.MainElement, 'reset'); break; }
                        }

                        if (vm.isAuthenticated) {
                            resourcePoolService.saveChanges(1500);
                        }
                    });
            }
        }
    };
})();
