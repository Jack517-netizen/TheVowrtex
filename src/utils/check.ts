export function checkNullAndUndefined(value: any): Boolean {
	return value !== undefined && value !== null ? true : false
}