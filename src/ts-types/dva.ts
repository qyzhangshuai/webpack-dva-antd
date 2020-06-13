/**
 * @description: 
 * @author: zs
 * @Date: 2020-06-13 20:31:40
 * @LastEditTime: 2020-06-13 20:32:04
 * @LastEditors: zs
 */
/**
 * @description dva redux 类型相关定义
 * @author ronffy
 * @Date 2019-11-15 19:39:47
 * @LastEditTime 2019-11-18 10:30:12
 * @LastEditors ronffy
 */
import { History } from 'history';

export interface ReduxAction<P = any> {
	type: string
	payload?: P
	[propName: string]: any
}

export interface Dispatch {
	<A extends ReduxAction>(action: A): A;
}

export interface PromiseDispatch {
	<P extends Promise<any>, A extends ReduxAction>(action: A): P;
}

export type ReduxSagaEffects = Partial<{
	call: <T = any>(p: (arg: T) => Promise<any>, arg?: T) => Promise<any>;
	put: (action: ReduxAction) => void;
	select: (state: any) => any;
}>

export interface DvaModelReducer {
	(preState: object, action: ReduxAction): object;
}

export interface DvaModelReducers {
	[reducerName: string]: DvaModelReducer;
}

export interface DvaModelEffectFn {
	(action: ReduxAction, sagaEffects: ReduxSagaEffects): any;
}

export interface ReduxSagaTaker {
	type: string;
	[propsName: string]: any;
}
// problem
export interface DvaModelEffectWithTaker extends Array<ReduxSagaTaker | DvaModelEffectFn> {
	[index: number]: ReduxSagaTaker | DvaModelEffectFn;
}

export type DvaModelEffect = DvaModelEffectFn | DvaModelEffectWithTaker

export interface DvaModelEffects {
	[effectName: string]: DvaModelEffect;
}

export interface DvaModel<T> {
	namespace: string;
	state?: T;
	reducers?: DvaModelReducers;
	effects?: DvaModelEffects;
	subscriptions?: object;
}

export type DvaApp = Readonly<{
	_models: any;
	_store: any;
	_plugin: any;
	use: (...args: any[]) => any;
	model: any;
	start: any;
}>

export type DvaSetupParams = Readonly<{
	dispatch: Dispatch;
	history: History;
}>
