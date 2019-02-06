const getPercentile = (data, percentile) => {
	data.sort();
	const index = (percentile / 100) * data.length;
	let result;
	if (Math.floor(index) === index) {
		result = (data[(index - 1)] + data[index]) / 2;
	} else {
		result = data[Math.floor(index)];
	}
	return result;
}

/**
  * Gets the color according to the given price
  * @param prices the full list of prices 
  * @param price the price
  * @returns a color in HEX format
  */
export default function getColor(prices, price) {
	const firstPercentile = getPercentile(prices, 25);
	const secondPercentile = getPercentile(prices, 50);
	const lastPercentile = getPercentile(prices, 75);

	if (price < firstPercentile) {
		return "#7ED321";
	} else if (price < secondPercentile) {
		return "#4A90E2";
	} else if (price < lastPercentile) {
		return "#F5A623";
	} else {
		return "#E74C3C";
	}
}