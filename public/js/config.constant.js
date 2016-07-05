'use strict';

/**
 * Config constant
 */
app.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Javascript Plugins
        'd3': '../../bower_components/d3/d3.min.js',

        //*** jQuery Plugins
        'chartjs': '../../bower_components/chartjs/Chart.min.js',
        'ckeditor-plugin': '../../bower_components/ckeditor/ckeditor.js',
        'jquery-nestable-plugin': ['../../bower_components/jquery-nestable/jquery.nestable.js'],
        'touchspin-plugin': ['../../bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', '../../bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
        'jquery-appear-plugin': ['../../bower_components/jquery-appear/build/jquery.appear.min.js'],
        'spectrum-plugin': ['../../bower_components/spectrum/spectrum.js', '../../bower_components/spectrum/spectrum.css'],

        //*** Controllers
        'dashboardCtrl': 'js/controllers/dashboardCtrl.js',
        'iconsCtrl': 'js/controllers/iconsCtrl.js',
        'vAccordionCtrl': 'js/controllers/vAccordionCtrl.js',
        'ckeditorCtrl': 'js/controllers/ckeditorCtrl.js',
        'laddaCtrl': 'js/controllers/laddaCtrl.js',
        'ngTableCtrl': 'js/controllers/ngTableCtrl.js',
        'cropCtrl': 'js/controllers/cropCtrl.js',
        'asideCtrl': 'js/controllers/asideCtrl.js',
        'toasterCtrl': 'js/controllers/toasterCtrl.js',
        'sweetAlertCtrl': 'js/controllers/sweetAlertCtrl.js',
        'mapsCtrl': 'js/controllers/mapsCtrl.js',
        'chartsCtrl': 'js/controllers/chartsCtrl.js',
        'calendarCtrl': 'js/controllers/calendarCtrl.js',
        'nestableCtrl': 'js/controllers/nestableCtrl.js',
        'validationCtrl': ['js/controllers/validationCtrl.js'],
        'userCtrl': ['js/controllers/userCtrl.js'],
        'selectCtrl': 'js/controllers/selectCtrl.js',
        'wizardCtrl': 'js/controllers/wizardCtrl.js',
        'uploadCtrl': 'js/controllers/uploadCtrl.js',
        'treeCtrl': 'js/controllers/treeCtrl.js',
        'inboxCtrl': 'js/controllers/inboxCtrl.js',
        'xeditableCtrl': 'js/controllers/xeditableCtrl.js',
        'chatCtrl': 'js/controllers/chatCtrl.js',
        'dynamicTableCtrl': 'js/controllers/dynamicTableCtrl.js',
        'notificationIconsCtrl': 'js/controllers/notificationIconsCtrl.js',
        'dateRangeCtrl': 'js/controllers/daterangeCtrl.js',
        'notifyCtrl': 'js/controllers/notifyCtrl.js',
        'sliderCtrl': 'js/controllers/sliderCtrl.js',
        'knobCtrl': 'js/controllers/knobCtrl.js',
        'reservationCtrl': 'js/controllers/reservationController.js',
        'eventCtrl': 'js/controllers/EventController.js',
        'promotionController': 'js/controllers/promotionController.js',
        'addModalController': 'js/controllers/addModalController.js',
        'editModalController': 'js/controllers/editModalController.js',
        'slotController': 'js/controllers/slotController.js',
        'adminController': 'js/controllers/adminController.js',
        'userController': 'js/controllers/userController.js',
        'bookingController': 'js/controllers/bookingController.js',
        'promotionService': 'js/resource/promotionService.js',
        'adminService': 'js/resource/adminService.js',
        'userService': 'js/resource/userService.js',
        'reservationService': 'js/resource/reservationService.js',
        'slotService': 'js/resource/slotService.js',
        'eventService': 'js/resource/eventService.js',
    },
    //*** angularJS Modules
    modules: [{
        name: 'toaster',
        files: ['../../bower_components/AngularJS-Toaster/toaster.js', '../../bower_components/AngularJS-Toaster/toaster.css']
    }, {
        name: 'angularBootstrapNavTree',
        files: ['../../bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js', '../../bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css']
    }, {
        name: 'ngTable',
        files: ['../bower_components/ng-table/dist/ng-table.min.js', '../../bower_components/ng-table/dist/ng-table.min.css']
    }, {
        name: 'ui.mask',
        files: ['../../bower_components/angular-ui-utils/mask.min.js']
    }, {
        name: 'ngImgCrop',
        files: ['../../bower_components/ngImgCrop/compile/minified/ng-img-crop.js', '../../bower_components/ngImgCrop/compile/minified/ng-img-crop.css']
    }, {
        name: 'angularFileUpload',
        files: ['../../bower_components/angular-file-upload/angular-file-upload.min.js']
    }, {
        name: 'monospaced.elastic',
        files: ['../../bower_components/angular-elastic/elastic.js']
    }, {
        name: 'ngMap',
        files: ['../../bower_components/ngmap/build/scripts/ng-map.min.js']
    }, {
        name: 'chart.js',
        files: ['../..//bower_components/angular-chart.js/dist/angular-chart.min.js', '../..//bower_components/angular-chart.js/dist/angular-chart.min.css']
    }, {
        name: 'flow',
        files: ['../../bower_components/ng-flow/dist/ng-flow-standalone.min.js']
    }, {
        name: 'ckeditor',
        files: ['../../bower_components/angular-ckeditor/angular-ckeditor.min.js']
    }, {
        name: 'mwl.calendar',
        files: ['../../bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js', '../../bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css', 'js/config/config-calendar.js']
    }, {
        name: 'ng-nestable',
        files: ['../../bower_components/ng-nestable/src/angular-nestable.js']
    }, {
        name: 'ngNotify',
        files: ['../../bower_components/ng-notify/dist/ng-notify.min.js', '../../bower_components/ng-notify/dist/ng-notify.min.css']
    }, {
        name: 'xeditable',
        files: ['../../bower_components/angular-xeditable/dist/js/xeditable.min.js', '../../bower_components/angular-xeditable/dist/css/xeditable.css', 'js/config/config-xeditable.js']
    }, {
        name: 'checklist-model',
        files: ['../../bower_components/checklist-model/checklist-model.js']
    }, {
        name: 'ui.knob',
        files: ['../../bower_components/ng-knob/dist/ng-knob.min.js']
    }, {
        name: 'ngAppear',
        files: ['../../bower_components/angular-appear/build/angular-appear.min.js']
    }, {
        name: 'countTo',
        files: ['../../bower_components/angular-count-to-0.1.1/dist/angular-filter-count-to.min.js']
    }, {
        name: 'angularSpectrumColorpicker',
        files: ['../../bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.min.js']
    }]
});
