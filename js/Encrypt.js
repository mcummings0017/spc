	function generateKey() {
		pt = document.getElementById("plaintext").value;
		k = document.getElementById("key").value;
		
		if (pt.length != 16) {
			return alert("Invalid plaintext length 16 bits required!");
		}

		if (k.length != 20) {
			return alert("Invalid key length 20 bits required!");
		}

		if (!(/^([10]{16,})$/.test(pt))) {
			return alert("Invalid plaintext please only use 1s and 0s!");
		}
		
		if (!(/^([10]{20,})$/.test(k))) {
			return alert("Invalid key please only use 1s and 0s!");
		}

		if (document.contains(document.getElementById("divKey"))) {
			document.getElementById("divKey").remove();
		}
		if (document.contains(document.getElementById("divEncrypt"))) {
			document.getElementById("divEncrypt").remove()
		}
		
		document.getElementById("btnEncrypt").disabled = true;
		document.getElementById("btnDecrypt").disabled = true;

		//generate table to store keystream 1
		let divKey = document.createElement("div");
		divKey.setAttribute("id", "divKey");
		
		let divKey1 = document.createElement("div");
		divKey1.setAttribute("id", "divKey1");
		
		divKey.appendChild(divKey1);
		
		let element = document.getElementById("div1");
		element.appendChild(divKey);
		
		divKey1.appendChild(document.createTextNode("Key: " + k));
		
		let tbl = document.createElement("table");
		tbl.setAttribute("id","keystreamtbl");
		tbl.setAttribute("class","table table-sm table-striped");
		let tblBody = document.createElement("tbody");
		tblBody.setAttribute("id", "k1Tbl-body");
		tbl.append(tblBody);
		
		divKey1.appendChild(tbl);

		key1_Step1();
	}

	//Round 1
	//row 1 user supplied key
	function key1_Step1() {
		printTblRow("k1Tbl-body", "key1_row1", "Key", k.match(rowRegex), key1_Step2);
	}
	//row 2 user supplied key rotated left 17 bits
	function key1_Step2() {
		r2 = k.substring(k.length-3, k.length) + k.substring(0, 17)
		printTblRow("k1Tbl-body", "key1_row2", "Rotate", r2.match(rowRegex), key1_Step3);
	}
	//row 3 substitue nibble on the left using the s-box
	function key1_Step3() {
		let leftNibble = r2.substring(0,4);
		r3 = _sbox(leftNibble);
		r3 += r2.substring(4, r2.length);
		printTblRow("k1Tbl-body", "key1_row3", "sbox", r3.match(rowRegex), key1_Step4);
	}
	//row 4 xor round counter (1, 2, or 3) with the second nibble from the right
	function key1_Step4() {
		r4 = r3.substring(0,12);
		let nibble4 = r3.substring(12,16);
		r4 += _xor(nibble4,"0001");
		r4 += r3.substring(16, r3.length);
		k1 = r4;
		key1 = k1.substring(0, 16)
		printTblRow("k1Tbl-body", "key1_row4", "xor", ["","","","0001",""], key2_Step1);
		printTblRow("k1Tbl-body", "key1_row5", "Result", r4.match(rowRegex), key2_Step1);
	}

	//Round 2
	//row 1 user supplied key
	function key2_Step1() {
		let divKey2 = document.createElement("div");
		divKey2.setAttribute("id", "divKey2");
		
		document.getElementById("divKey").appendChild(divKey2);
		
		divKey2.appendChild(document.createTextNode("Key 1: " + key1));
		
		let tbl = document.createElement("table");
		tbl.setAttribute("id","keystreamtbl");
		tbl.setAttribute("class","table table-sm table-striped");
		let tblBody = document.createElement("tbody");
		tblBody.setAttribute("id", "k2Tbl-body");
		tbl.append(tblBody);
		
		divKey2.appendChild(tbl);

		printTblRow("k2Tbl-body", "key2_row1", "Key", k1.match(rowRegex), key2_Step2);
	}
	//row 2 user supplied key rotated left 17 bits
	function key2_Step2() {
		r2 = k1.substring(k1.length-3, k1.length) + k1.substring(0, 17)
		printTblRow("k2Tbl-body", "key2_row2", "Rotate", r2.match(rowRegex), key2_Step3);
	}
	//row 3 substitue nibble on the left using the s-box
	function key2_Step3() {
		let leftNibble = r2.substring(0,4);
		r3 = _sbox(leftNibble);
		r3 += r2.substring(4, r2.length);
		printTblRow("k2Tbl-body", "key2_row3", "sbox", r3.match(rowRegex), key2_Step4);
	}
	//row 4 xor round counter (1, 2, or 3) with the second nibble from the right
	function key2_Step4() {
		r4 = r3.substring(0,12);
		let nibble4 = r3.substring(12,16);
		r4 += _xor(nibble4,"0010");
		r4 += r3.substring(16, r3.length);
		k2 = r4;
		key2 = k2.substring(0, 16);
		printTblRow("k2Tbl-body", "key2_row4", "xor", ["","","","0010",""], key3_Step1);
		printTblRow("k2Tbl-body", "key2_row5", "Result", r4.match(rowRegex), key3_Step1);
	}

	//Round 3
	//row 1 user supplied key
	function key3_Step1() {
		let divKey2 = document.createElement("div");
		divKey2.setAttribute("id", "divKey3");
		
		document.getElementById("divKey").appendChild(divKey2);
		
		divKey2.appendChild(document.createTextNode("Key 2: " + key2));
		
		let tbl = document.createElement("table");
		tbl.setAttribute("id","keystreamtbl");
		tbl.setAttribute("class","table table-sm table-striped");
		let tblBody = document.createElement("tbody");
		tblBody.setAttribute("id", "k3Tbl-body");
		tbl.append(tblBody);
		
		divKey2.appendChild(tbl);
		
		printTblRow("k3Tbl-body", "key3_row1", "Key", k2.match(rowRegex), key3_Step2);
	}
	//row 2 user supplied key rotated left 17 bits
	function key3_Step2() {
		r2 = k2.substring(k2.length-3, k2.length) + k2.substring(0, 17)
		printTblRow("k3Tbl-body", "key3_row2", "Rotate", r2.match(rowRegex), key3_Step3);
	}
	//row 3 substitue nibble on the left using the s-box
	function key3_Step3() {
		let leftNibble = r2.substring(0,4);
		r3 = _sbox(leftNibble);
		r3 += r2.substring(4, r2.length);
		printTblRow("k3Tbl-body", "key3_row3", "sbox", r3.match(rowRegex), key3_Step4);
	}
	//row 4 xor round counter (1, 2, or 3) with the second nibble from the right
	function key3_Step4() {
		r4 = r3.substring(0,12);
		let nibble4 = r3.substring(12,16);
		r4 += _xor(nibble4,"0011");
		r4 += r3.substring(16, r3.length);
		k3 = r4;
		key3 = k3.substring(0, 16);
		printTblRow("k3Tbl-body", "key3_row4", "xor", ["","","","0011",""], encrypt);
		printTblRow("k3Tbl-body", "key3_row5", "Result", r4.match(rowRegex), encrypt);
	}

	function encrypt() {
		document.getElementById("divKey3").appendChild(document.createTextNode("Key 3: " + key3));
		if (document.contains(document.getElementById("divEncrypt"))) {
			document.getElementById("divEncrypt").remove();
		}
		
		let divEncrypt = document.createElement("div");
		divEncrypt.setAttribute("id", "divEncrypt");
		document.getElementById("div2").appendChild(divEncrypt);
		
		//print plaintext and break
		var txt = document.createElement("h5");
		txt.innerText = "Encrypt:";
		divEncrypt.appendChild(txt);
		divEncrypt.appendChild(document.createTextNode("Plaintext: " + pt));
		divEncrypt.appendChild(document.createElement("br"));
		divEncrypt.appendChild(document.createElement("br"));
		
		//generate table to store data
		let tbl = document.createElement("table");
		tbl.setAttribute("id","encryptTbl");
		tbl.setAttribute("class","table table-sm table-striped table-dark");
		let tblBody = document.createElement("tbody");
		tblBody.setAttribute("id", "encryptTbl-body");
		tbl.append(tblBody);
		
		divEncrypt.appendChild(tbl);

		let row = document.createElement("tr");
		row.setAttribute("id", "row_round1");
		
		let first = document.createElement("td");
		first.innerText = "Round 1";
		row.append(first);
		
		document.getElementById("encryptTbl-body").append(row);
		
		round1_Step1();
	}

	//Round 1
	//function for pretty print plaintext, generate next button
	function round1_Step1() {
		printTblRow("encryptTbl-body", "round1_row1", "16-bit plaintext", pt.match(rowRegex), round1_Step2);
	}

	//function for pretty print key1, delete/generate next button
	function round1_Step2() {
		printTblRow("encryptTbl-body", "round1_row2", "K1", key1.match(rowRegex), round1_Step3);
	}

	//function for xor key1 with k1, pretty print result, delete/generate next button
	function round1_Step3() {
		let splitpt = pt.match(rowRegex);
		let splitk1 = key1.match(rowRegex);
		round1[0] = _xor(splitpt[0],splitk1[0]);
		round1[1] = _xor(splitpt[1],splitk1[1]);
		round1[2] = _xor(splitpt[2],splitk1[2]);
		round1[3] = _xor(splitpt[3],splitk1[3]);
		
		printTblRow("encryptTbl-body", "round1_row3", "xor", round1, round1_Step4);
	}

	//function for sbox with result, pretty print result, delete/generate next button
	function round1_Step4() {
		round1[0] = _sbox(round1[0]);
		round1[1] = _sbox(round1[1]);
		round1[2] = _sbox(round1[2]);
		round1[3] = _sbox(round1[3]);
		
		printTblRow("encryptTbl-body", "round1_row4", "sbox", round1, round1_Step5);
	}

	//function for permutate key against permutation, pretty print result, delete/generate next button, record round1 result
	function round1_Step5() {
		let tmpRound1 = round1[0] + round1[1] + round1[2] + round1[3];
		tmpRound1 = _permutation(tmpRound1);
		round1 = tmpRound1.match(rowRegex);
		round2 = round1;
		printTblRow("encryptTbl-body", "round1_row5", "permutation", round1, round2_Step1);
	}

	//Round 2
	//function for pretty print round2, delete/generate next button
	function round2_Step1() {
		let row = document.createElement("tr");
		row.setAttribute("id", "row_round2");
		
		let first = document.createElement("td");
		first.innerText = "Round 2";
		row.append(first);
		
		document.getElementById("encryptTbl-body").append(row);
		
		printTblRow("encryptTbl-body", "round2_row1", "16-bit plaintext", round2, round2_Step2);
	}

	//pretty print k2, delete/generate next button
	function round2_Step2() {
		printTblRow("encryptTbl-body", "round2_row2", "K2", key2.match(rowRegex), round2_Step3);
	}

	//function for xor round2 with k2, pretty print result, delete/generate next button
	function round2_Step3() {
		let splitk2 = key2.match(rowRegex);
		round2[0] = _xor(round2[0],splitk2[0]);
		round2[1] = _xor(round2[1],splitk2[1]);
		round2[2] = _xor(round2[2],splitk2[2]);
		round2[3] = _xor(round2[3],splitk2[3]);
		
		printTblRow("encryptTbl-body", "round2_row3", "xor", round2, round2_Step4);
	}

	//function for sbox with result, pretty print result, delete/generate next button
	function round2_Step4() {
		round2[0] = _sbox(round2[0]);
		round2[1] = _sbox(round2[1]);
		round2[2] = _sbox(round2[2]);
		round2[3] = _sbox(round2[3]);
		
		printTblRow("encryptTbl-body", "round2_row4", "sbox", round2, round2_Step5);
	}

	//function for permutate result, pretty print result, delete/generate next button, record round 2 result
	function round2_Step5() {
		let tmpRound2 = round2[0] + round2[1] + round2[2] + round2[3];
		tmpRound2 = _permutation(tmpRound2);
		round2 = tmpRound2.match(rowRegex);
		round3 = round2;
		printTblRow("encryptTbl-body", "round2_row5", "permutation", round2, round3_Step1);
	}

	//Round 3
	//function for pretty print round2, generate next button
	function round3_Step1() {
		let row = document.createElement("tr");
		row.setAttribute("id", "row_round3");
		
		let first = document.createElement("td");
		first.innerText = "Round 3";
		row.append(first);
		
		document.getElementById("encryptTbl-body").append(row);
		
		printTblRow("encryptTbl-body", "round3_row1", "16-bit plaintext", round3, round3_Step2);
	}

	//pretty print k3, generate next button
	function round3_Step2() {
		printTblRow("encryptTbl-body", "round3_row2", "K3", key3.match(rowRegex), round3_Step3);
	}

	//function for xor key3 with round2, pretty print round3 result
	function round3_Step3() {
		let splitk3 = key3.match(rowRegex);
		round3[0] = _xor(round3[0],splitk3[0]);
		round3[1] = _xor(round3[1],splitk3[1]);
		round3[2] = _xor(round3[2],splitk3[2]);
		round3[3] = _xor(round3[3],splitk3[3]);
		
		printTblRow("encryptTbl-body", "round3_row3", "xor", round3, end);
		
		if (document.contains(document.getElementById("step"))) {
			document.getElementById("step").remove()
		}
		
		let divEncrypt = document.getElementById("divEncrypt");
		divEncrypt.appendChild(document.createTextNode("Ciphertext: " + round3.join("")));
	}