import { InjectionKey, reactive, readonly as defineReadonly, provide, inject } from "vue";

export abstract class AbstractContext<T> {
  private key: InjectionKey<T> = Symbol();

  createContext(context: any, readonly = true, native = false): void {
    const state = reactive(context);
    const provideData = readonly ? defineReadonly(state) : state;
    provide(this.key, native ? context : provideData);
  }

  getContext<T>(defaultValue?: any): T {
    return inject(this.key, defaultValue || {});
  }
}
