//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

(function () {
    'use strict';

    var controllerId = 'userEditController';
    angular.module('main')
        .controller(controllerId, ['userFactory',
            'logger',
            '$location',
            '$routeParams',
            userEditController]);

    function userEditController(userFactory,
		logger,
		$location,
		$routeParams) {
        logger = logger.forSource(controllerId);

        var isNew = $location.path() === '/manage/generated/user/new';
        var isSaving = false;

        // Controller methods (alphabetically)
        var vm = this;
        vm.cancelChanges = cancelChanges;
        vm.isSaveDisabled = isSaveDisabled;
        vm.entityErrors = [];
        vm.user = null;
        vm.saveChanges = saveChanges;
        vm.hasChanges = hasChanges;

        initialize();

        /*** Implementations ***/

        function cancelChanges() {

            $location.path('/manage/generated/user');

            //if (userFactory.hasChanges()) {
            //    userFactory.rejectChanges();
            //    logWarning('Discarded pending change(s)', null, true);
            //}
        }

        function hasChanges() {
            return userFactory.hasChanges();
        }

        function initialize() {

            if (isNew) {
                // TODO For development enviroment, create test entity?
            }
            else {
                userFactory.getUser($routeParams.Id)
                    .then(function (data) {
                        vm.user = data;
                    })
                    .catch(function (error) {
                        // TODO User-friendly message?
                    });
            }
        };

        function isSaveDisabled() {
            return isSaving ||
                (!isNew && !userFactory.hasChanges());
        }

        function saveChanges() {

            if (isNew) {
                userFactory.createUser(vm.user);
            }

            isSaving = true;
            userFactory.saveChanges()
                .then(function (result) {
                    $location.path('/manage/generated/user');
                })
                .catch(function (error) {
                    // Conflict (Concurrency exception)
                    if (typeof error.status !== 'undefined' && error.status === '409') {
                        // TODO Try to recover!
                    } else if (typeof error.entityErrors !== 'undefined') {
                        vm.entityErrors = error.entityErrors;
                    }
                })
                .finally(function () {
                    isSaving = false;
                });
        }
    };
})();