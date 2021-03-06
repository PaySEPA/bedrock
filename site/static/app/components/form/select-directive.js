/*!
 * Select directive.
 *
 * Copyright (c) 2014 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 */
define([], function() {

'use strict';

/* @ngInject */
function factory() {
  return {
    restrict: 'E',
    scope: {
      model: '=brModel',
      items: '=brItems',
      display: '&?brDisplayItem',
      compare: '=?brCompareItem'
    },
    transclude: true,
    template: '\
      <div ng-class="{\'form-group\': !options.inline}" \
        br-property-path="{{options.name}}"> \
        <label ng-if="!options.inline && options.label !== undefined" \
          class="{{options.columns.label}} control-label" \
          for="{{options.name}}">{{options.label}}</label> \
        <div class="{{options.columns.select}}" \
          ng-class="{ \
            \'input-group\': !options.inline, \
            \'input-group-inline\': options.inline}"> \
          <span ng-if="options.icon" \
            class="input-group-addon"><i \
            class="fa {{options.icon}}"></i></span> \
          <span ng-if="options.image" \
            class="input-group-addon"><img \
            ng-src="{{options.image}}"></img></span> \
          <div class="br-select" br-track-state="help" \
            ng-class="{\'br-help-off\': options.inline}" \
            br-tooltip="{{options.tooltip.text}}" \
            br-options="options.tooltip"> \
            <ui-select ng-model="selection.selected" \
              theme="bootstrap" ng-disabled="options.disabled"> \
              <ui-select-match placeholder="{{options.placeholder}}">{{$select.selected.display}}</ui-select-match> \
              <ui-select-choices \
                br-lazy-compile="$select.open" \
                br-lazy-compile-id="br-select-ui-select-choices" \
                repeat="item in viewItems | filter: $select.search"> \
                <div ng-bind-html="item.display | highlight: $select.search"></div> \
              </ui-select-choices> \
            </ui-select> \
          </div> \
          <span ng-if="!options.inline" class="input-group-btn"> \
            <button type="button" class="btn btn-default" \
              br-help-toggle="help"> \
              <i class="fa fa-question-circle"></i> \
            </button> \
          </span> \
        </div> \
        <div ng-if="!options.inline" ng-show="help.show" \
          class="{{options.columns.help}} help-block br-fadein br-fadeout"> \
          <div ng-transclude></div> \
        </div> \
      </div>',
    link: Link
  };

  function Link(scope, element, attrs) {
    var selection = scope.selection = {selected: undefined};
    var options = scope.options = {};
    options.tooltip = {};

    // get options
    attrs.brOptions = attrs.brOptions || {};
    attrs.$observe('brOptions', function(value) {
      scope.options = options = scope.$eval(value) || {};
      options.inline = ('inline' in options) ? options.inline : false;
      options.label = options.label || 'Choose...';
      options.placeholder = options.placeholder || (options.label + '...');
      options.tooltip = options.tooltip || {};

      // prefix "fa-" to icon
      if(typeof options.icon === 'string' &&
        options.icon.indexOf('fa-') !== 0) {
        options.icon = 'fa-' + options.icon;
      }

      var columns = options.columns = options.columns || {};
      if(!('label' in columns)) {
        columns.label =  'col-sm-3';
      }
      if(!('select' in columns)) {
        columns.select = 'col-sm-8';
      }
      if(!('help' in columns)) {
        columns.help = 'col-sm-offset-3 col-sm-8';
      }

      if(options.autofocus) {
        element.find('.ui-select-match').attr('autofocus', 'autofocus');
      } else {
        element.find('.ui-select-match').removeAttr('autofocus');
      }

      if(options.readonly) {
        element.find('.ui-select-match').attr('readonly', 'readonly');
      } else {
        element.find('.ui-select-match').removeAttr('readonly');
      }
    });

    // set default compare item method
    if(!attrs.brCompareItem) {
      scope.compare = function(item1, item2) {
        return item1 === item2;
      };
    }

    // update view items when items or display function changes
    scope.$watch('items', updateViewItems, true);
    attrs.$observe('brDisplayItem', function() {
      updateViewItems(scope.items);
    });

    // when external model changes, update selection
    scope.$watch('model', function(item1) {
      // find matching view item
      for(var i = 0; item1 && i < scope.viewItems.length; ++i) {
        var viewItem = scope.viewItems[i];
        var item2 = ('key' in options ?
          viewItem.item[options.key] : viewItem.item);
        if(scope.compare.call(scope.$parent, item1, item2)) {
          selection.selected = viewItem;
          return;
        }
      }

      // no match found
      selection.selected = undefined;
    }, true);

    // when selection changes, update external model
    scope.$watch('selection.selected', function(selected) {
      if(selected === undefined) {
        scope.model = undefined;
        return;
      }

      if('key' in options) {
        scope.model = selected.item[options.key];
        return;
      }

      // default selects full item
      scope.model = selected.item;
    }, true);

    function updateViewItems(items) {
      scope.viewItems = [];
      if(items === undefined) {
        return;
      }

      items.forEach(function(item) {
        scope.viewItems.push({
          item: item,
          display: display(item)
        });
      });
    }

    function display(item) {
      var rval = scope.display.call(scope.$parent, {item: item});
      if(rval === undefined) {
        return '' + item;
      }
      return rval;
    }
  }
}

return {brSelect: factory};

});
