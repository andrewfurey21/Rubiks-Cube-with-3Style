async function loadComms(file) {
	let comms = [];
	const table = await (await fetch(file)).text();
	rows = table.split("\r\n");
	for (let i = 0; i < rows.length; i++) {
		let row = rows[i].split("\t");
		comms.push(row);
	}
	return comms;
}
