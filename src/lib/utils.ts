export function randomRange(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

export function randomColor(min: number, max: number) {
	const nums = [...Array(3)].map(() => Math.floor(randomRange(min, max)));
	return `#${nums.map(n => n.toString(16).padStart(2, '0')).join('')}`;
}
