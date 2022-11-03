export class Store {
  private static instance: Store;

  private state = {
    data: {
      outgoings: [],
    },
    user: {
      id: 0
    }
  };

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }

    return Store.instance;
  }

  set(keys: string[], data: any) {
    this.setData(keys, data, this.state);
  }

  get(keys: string[]): any {
    return this.getData(keys, this.state);
  }

  private setData(keys: string[], data: any, state: any) {
    let _keys = JSON.parse(JSON.stringify(keys));
    keys.splice(0, 1);
    if (keys.length > 0) {
      this.setData(keys, data, state[_keys[0]]);
    } else {
      state[_keys[0]] = data;
    }

  }

  private getData(keys: string[], state: any): any {
    let _keys = JSON.parse(JSON.stringify(keys));

    keys.splice(0, 1);
    if (keys.length > 0) {
      return this.getData(keys, state[_keys[0]]);

    } else {
      return state[_keys[0]];
    }


  }


}
