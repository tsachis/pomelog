class Pomelog {
  static ENABLED_FLAG = 'pomelog-enabled';
  static COMPONENTS_FILTER_FLAG = 'pomelog-components-filter';

  isEnabled: boolean;
  useGroup: boolean = true;
  groupPrefix: string = '';
  componentsFilter: string;

  constructor(private window: Window) {
    this.isEnabled = !!window.localStorage.getItem(Pomelog.ENABLED_FLAG);
    this.componentsFilter = window.localStorage.getItem(Pomelog.COMPONENTS_FILTER_FLAG) || '';
  }

  public log(component: string, ...args) {
    const cnsl = this.window.console;
    if (!this.isEnabled) {
      return;
    }
    if (!component || typeof component !== 'string') {
      cnsl.warn(`First argument to pomelog.log 
                          must be a string specifying the component/namespace name`);
      return;
    }
    if (this.shouldLog(component)) {
      if (this.useGroup) {
        cnsl.group(`${this.groupPrefix} ${component}`.trim());
        cnsl.log.apply(cnsl, args);
        cnsl.groupEnd();
      } else {
        cnsl.log.apply(this.window.console, args);
      }
    }
  }

  public enable() {
    this.isEnabled = true;
  }

  public setFilter(filter: string) {
    if (typeof filter !== 'string') {
      this.window.console.warn('Component/namespace filter must be a string');
      return;
    }
    this.componentsFilter = filter;
  }

  private shouldLog(component: string): boolean {
    const filter = this.componentsFilter.replace('*', '');
    return component.indexOf(filter) === 0;
  }
}

window['pomelog'] = new Pomelog(window);
