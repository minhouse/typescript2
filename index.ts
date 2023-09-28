class ObjectWrapper {
  private _obj: { [key: string]: unknown };

  /***
   * 引数のオブジェクトのコピーを this._objに設定
   */
  // キーは文字列、値は不特定の型
  // コピーにより外部オブジェクトの変更から隔離、アクセスのみ加
  constructor(_obj: { [key: string]: unknown }) {
    this._obj = { ..._obj };
  }

  /**
   * this._objのコピーを返却
   * @return Object
   */
  get obj() {
    return { ...this._obj };
  }

  /**
   * this._obj[key] に valを設定。keyがthis._objに存在しない場合、falseを返却
   * @param key オブジェクトのキー
   * @param val オブジェクトの値
   */
  set(key: string, val: unknown): boolean {
    if (this._obj.hasOwnProperty(key)) {
      this._obj[key] = val;
      return true;
    } else {
      return false;
    }
  }

  /**
   * 指定したキーの値のコピーを返却
   * 指定のキーが存在しない場合 undefinedを返却
   * @param key オブジェクトのキー
   */
  get(key: string) {
    // ?:は条件式のTrue/Falseの評価をする
    return this._obj.hasOwnProperty(key) ? this._obj[key] : undefined;
  }

  /**
   * 指定した値を持つkeyの配列を返却。該当のものがなければ空の配列を返却。
   */
  findKeys(val: unknown) {
    return Object.keys(this._obj).filter((key) => this._obj[key] == val);
  }
}

/**
 * check script
 * 完成したら、以下のスクリプトがすべてOKになる。
 */
const obj1 = { a: "01", b: "02" };
const wrappedObj1 = new ObjectWrapper(obj1);

if (wrappedObj1.obj.a === "01") {
  console.log("OK: get obj()");
} else {
  console.error("NG: get obj()");
}

if (
  wrappedObj1.set("c", "03") === false &&
  wrappedObj1.set("b", "04") === true &&
  wrappedObj1.obj.b === "04"
) {
  console.log("OK: set(key, val)");
} else {
  console.error("NG: set(key, val)");
}

if (wrappedObj1.get("b") === "04" && wrappedObj1.get("c") === undefined) {
  console.log("OK: get(key)");
} else {
  console.error("NG: get(key)");
}

const obj2 = { a: "01", b: "02", bb: "02", bbb: "02" };
const wrappedObj2 = new ObjectWrapper(obj2);
const keys = wrappedObj2.findKeys("02");
if (
  wrappedObj2.findKeys("03").length === 0 &&
  keys.includes("b") &&
  keys.includes("bb") &&
  keys.includes("bbb") &&
  keys.length === 3
) {
  console.log("OK: findKeys(val)");
} else {
  console.error("NG: findKeys(val)");
}
