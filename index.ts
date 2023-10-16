// ジェネリクスのクラス Tはオブジェクト型
// extends句により型パラメータに制約をつける
class ObjectWrapper<T extends Record<string, any>> {
  private _obj: T;

  // オブジェクトのコピーを保存、外部からは独立
  constructor(_obj: T) {
    this._obj = { ..._obj };
  }

  get obj(): T {
    return { ...this._obj };
  }

  // キーと値を保存、無い場合はFalseを返す
  set<K extends keyof T>(key: K, val: T[K]): boolean {
    if (key in this._obj) {
      this._obj[key] = val;
      return true;
    } else {
      return false;
    }
  }

  // 指定されたキーに対応する値を返す、存在しない場合undefinedを返す
  get<K extends keyof T>(key: K): T[K] | undefined {
    return this._obj[key];
  }

  // 指定されて値に対するキーの配列を返す
  // 一致する全てのキーを配列に格納して返す
  findKeys(val: T[keyof T]): (keyof T)[] {
    const result: (keyof T)[] = [];
    for (const key in this._obj) {
      if (this._obj[key] === val) {
        result.push(key);
      }
    }
    return result;
  }
}

/**
 * check script
 * 完成したら、以下のスクリプトがすべてOKになる。
 */
const obj1 = { a: "01", b: "02" };
// const wrappedObj1 = new ObjectWrapper(obj1);
// ジェネリクス型を明示的に指定、型の安全性を確保
const wrappedObj1 = new ObjectWrapper<{ a: string; b: string }>(obj1);

if (
  wrappedObj1.set("c" as keyof typeof obj1, "03" as string) === false &&
  wrappedObj1.set("b" as keyof typeof obj1, "04" as string) === true
) {
  console.log("OK: set(key, val)");
} else {
  console.error("NG: set(key, val)");
}

if (
  wrappedObj1.get("b" as keyof typeof obj1) === "04" &&
  wrappedObj1.get("c" as keyof typeof obj1) === undefined
) {
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
