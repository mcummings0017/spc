	function end() {
	
	}
	
	function printRow(e, a) {
		let t = "";
		a.forEach(a => {t += a + "\xa0\xa0\xa0\xa0\xa0"});
		e.appendChild(document.createTextNode(t));
	}

	function printTblRow(tbody, row_attr, firstColumn, values, _func) {
		if (document.contains(document.getElementById("step"))) {
			document.getElementById("step").remove()
		}
		
		let row = document.createElement("tr");
		row.setAttribute("id", row_attr);
		
		let first = document.createElement("td");
		first.innerText = firstColumn;
		first.setAttribute("style", "min-width:100px");
		row.append(first);
		
		for(i = 0; i < values.length; i++) {
			let cell = document.createElement("td");
			cell.innerText = values[i];
			row.append(cell);
		}
		
		let btnStep = document.createElement("BUTTON");
		btnStep.appendChild(document.createTextNode("Step"));
		btnStep.setAttribute("id", "step");
		btnStep.onclick = function() {_func()};
		let cell = document.createElement("td");
		cell.append(btnStep);
		row.appendChild(cell);
		
		document.getElementById(tbody).append(row);
	}
	
	function _xor(x,y) {
		let t = "";
		for (i = 0; i < x.length; i++) {
			if (x[i] != y[i]) {
				t += 1;
			} else {			
				t += 0;
			}
		}
		return t;
	}
	
	function _sbox(nibble) {
		switch (parseInt(nibble,2)) {
			case 0:
				return "1100";
			case 1:
				return "0101";
			case 2:
				return "0110";
			case 3:
				return "1011";
			case 4:
				return "1001";
			case 5:
				return "0000";
			case 6:
				return "1010";
			case 7:
				return "1101";
			case 8:
				return "0011";
			case 9:
				return "1110";
			case 10:
				return "1111";
			case 11:
				return "1000";
			case 12:
				return "0100";
			case 13:
				return "0111";
			case 14:
				return "0001";
			case 15:
				return "0010";
		}
	}
	
	function _sboxrev(nibble) {
		switch (parseInt(nibble,2)) {
			case 0:
				return "0101";
			case 1:
				return "1110";
			case 2:
				return "1111";
			case 3:
				return "1000";
			case 4:
				return "1100";
			case 5:
				return "0001";
			case 6:
				return "0010";
			case 7:
				return "1101";
			case 8:
				return "1011";
			case 9:
				return "0100";
			case 10:
				return "0110";
			case 11:
				return "0011";
			case 12:
				return "0000";
			case 13:
				return "0111";
			case 14:
				return "1001";
			case 15:
				return "1010";
		}
	}
	
	function _permutation(x) {
		let t = new Array(x.length);
		let permutation = [0,4,8,12,1,5,9,13,2,6,10,14,3,7,11,15];
		for (i = 0; i < x.length; i++) {
			t[permutation[i]] = x[i];
		}
		return t.join("");
	}
	
	function reset() {
		//document.getElementById("plaintext").value = "";
		//document.getElementById("key").value = "";
		
		key1 = "";
		key2 = "";
		key3 = "";
		
		k1 = "";
		k2 = "";
		k3 = "";
	
		r2 = "";
		r3 = "";
		r4 = "";
		
		round1 = ["","","",""];
		round2 = ["","","",""];
		round3 = ["","","",""];
		
		pt = "";
		k = "";
		
		if (document.contains(document.getElementById("divKey"))) {
			document.getElementById("divKey").remove();
		}
		if (document.contains(document.getElementById("divEncrypt"))) {
			document.getElementById("divEncrypt").remove();
		}
		if (document.contains(document.getElementById("divDecryptSidebar"))) {
			document.getElementById("divDecryptSidebar").remove();
		}
		
		document.getElementById("btnEncrypt").disabled = false;
		document.getElementById("btnDecrypt").disabled = false;
	}