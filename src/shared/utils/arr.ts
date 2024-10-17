export class Arr {
  public static last<T>(array: T[]): T {
    return array[array.length - 1];
  }

  public static first<T>(array: T[]): T {
    return array[0];
  }
}
