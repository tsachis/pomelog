var Pomelog = /** @class */ (function () {
    function Pomelog(window) {
        this.window = window;
        this.useGroup = true;
        this.groupPrefix = '';
        this.isEnabled = !!window.localStorage.getItem(Pomelog.ENABLED_FLAG);
        this.componentsFilter = window.localStorage.getItem(Pomelog.COMPONENTS_FILTER_FLAG) || '';
    }
    Pomelog.prototype.log = function (component) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _console = this.window.console;
        if (!this.isEnabled) {
            return;
        }
        if (!component || typeof component !== 'string') {
            _console.warn('First argument to pomelog.log must be a string specifying the component/namespace name');
            return;
        }
        if (this._shouldLog(component)) {
            if (this.useGroup) {
                _console.group((this.groupPrefix + " " + component).trim());
                _console.log.apply(_console, args);
                _console.groupEnd();
            }
            else {
                _console.log.apply(this.window.console, args);
            }
        }
    };
    Pomelog.prototype.enable = function () {
        this.isEnabled = true;
    };
    Pomelog.prototype.setFilter = function (filter) {
        if (typeof filter !== 'string') {
            this.window.console.warn('Component/namespace filter must be a string');
            return;
        }
        this.componentsFilter = filter;
    };
    Pomelog.prototype._shouldLog = function (component) {
        var _filter = this.componentsFilter.replace('*', '');
        return component.indexOf(_filter) === 0;
    };
    Pomelog.ENABLED_FLAG = 'pomelog-enabled';
    Pomelog.COMPONENTS_FILTER_FLAG = 'pomelog-components-filter';
    return Pomelog;
}());
window['pomelog'] = new Pomelog(window);
//# sourceMappingURL=pomelog.js.map