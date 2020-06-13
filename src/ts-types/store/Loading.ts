/**
 * @description: dva-loading state
 * @author: zs
 * @Date: 2020-06-13 20:23:05
 * @LastEditTime: 2020-06-13 20:23:19
 * @LastEditors: zs
 */

type Loading = {
	global: boolean;
	effects: {
		[effect: string]: boolean;
	};
	models: {
		[model: string]: boolean;
	};
}

export default Loading