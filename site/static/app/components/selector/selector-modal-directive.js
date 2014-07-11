/*!
 * Selector Modal.
 *
 * Copyright (c) 2012-2014 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([], function() {

'use strict';

/* @ngInject */
function factory(ModalService) {
  return ModalService.directive({
    name: 'selector',
    scope: {
      modalTitle: '=',
      items: '=',
      itemType: '='
    },
    transclude: true,
    templateUrl: '/app/components/selector/selector-modal.html'
  });
}

return {selectorModal: factory};

});
