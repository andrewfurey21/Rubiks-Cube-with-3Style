async function loadComms(file) {
	let comms = [];
	const table = await (await fetch(file)).text();
	rows = table.split("\r\n");

	let comm = "";
	// console.log(rows.length);
	for (let j = 0; j < rows.length - 1; j++) {
		if (j != 0) {
			let row = [];
			let insideComm = false;
            let num = 0;
			for (let i = 0; i < rows[j].length; i++) {
				if (i - 1 >= 0) {
					if (insideComm) {
						comm += rows[j].charAt(i);
					}
					if (rows[j].charAt(i + 1) == "]") {
                        num--;
                        if (num==0)
						insideComm = false;
					} else if (rows[j].charAt(i) == "," && rows[j].charAt(i - 1) == ",") {
						row.push("");
					} else if (rows[j].charAt(i) == "[") {
                        num++
						insideComm = true;
					}
					if (rows[j].charAt(i) == "," && rows[j].charAt(i - 1) == '"') {
						row.push(comm);
						comm = "";
					}
				}
			}
			row.push(comm);
			comms.push(row);
		}
	}
	return comms;
}
