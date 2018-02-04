(function pomelog(window) {
  var ENABLED_FLAG = 'pomelog-enabled',
      COMPONENTS_FILTER_FLAG = 'pomelog-components-filter',
      isEnabled = !!window.localStorage.getItem(ENABLED_FLAG),
      useGroup = true,
      groupPrefix = '',
      componentsFilter = window.localStorage.getItem(COMPONENTS_FILTER_FLAG) || '';

  function _shouldLog(component) {
    var _filter = componentsFilter.replace('*', '');
    return component.indexOf(_filter) === 0;
  }
  window.pomelog = {
    enable: function () {
      isEnabled = true;
    },
    setFilter: function(filter) {
      if (typeof filter !== 'string') {
        window.console.warn('Component/namespace filter must be a string');
        return;
      }
      componentsFilter = filter;
    },
    log: function (component) {
      var _console = window.console;
      if (!isEnabled) {
        return;
      }
      if (!component || typeof component !== 'string') {
        _console.warn('First argument to pomelog.log must be a string specifying the component/namespace name');
        return;
      }
      if (_shouldLog(component)) {
        var args = Array.prototype.slice.call(arguments, 1);
        if (useGroup) {
          var prefixedComponent = groupPrefix + ' ' + component;
          _console.group(prefixedComponent);
          _console.log.apply(_console, args);
          _console.groupEnd();
        } else {
          _console.log.apply(window.console, args);
        }
      }
    }
  };
})(window);
