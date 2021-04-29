	//function for decryption
	function decrypt() {
		document.getElementById("btnEncrypt").disabled = true;
		document.getElementById("btnDecrypt").disabled = true;
		pt = document.getElementById("plaintext").value;
		
		if (pt.length != 16) {
			return alert("Invalid plaintext length 16 bits required!");
		}

		if (!(/^([10]{16,})$/.test(pt))) {
			return alert("Invalid plaintext please only use 1s and 0s!");
		}

		if (document.contains(document.getElementById("divKey"))) {
			document.getElementById("divKey").remove();
		}
		if (document.contains(document.getElementById("divEncrypt"))) {
			document.getElementById("divEncrypt").remove()
		}
		
		var sb = document.getElementById("sidebar");
		
		if (document.contains(document.getElementById("divDecryptSidebar"))) {
			document.getElementById("divDecryptSidebar").remove()
		}
		
		let divDecryptSidebar = document.createElement("div");
		divDecryptSidebar.setAttribute("id", "divDecryptSidebar");
		document.getElementById("sidebar").appendChild(divDecryptSidebar);
		
		divDecryptSidebar.appendChild(document.createTextNode("Please enter 16 bit Key 1, Key 2 and Key 3"));
		divDecryptSidebar.appendChild(document.createElement("br"));
		divDecryptSidebar.appendChild(document.createTextNode("(decryption starts with key 3)"));
		//create 3 text fields for key
		let div = document.createElement("div");
		div.setAttribute("class", "form-floating mb-3");
		
		let input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("class", "form-control");
		input.setAttribute("id", "dk1");
		input.setAttribute("maxlength", "16");
		let label = document.createElement("label");
		label.innerText = "Key 1";
		div.appendChild(input);
		div.appendChild(label);
		divDecryptSidebar.append(div);
		
		let div2 = document.createElement("div");
		div2.setAttribute("class", "form-floating mb-3");
		
		let input2 = document.createElement("input");
		input2.setAttribute("type", "text");
		input2.setAttribute("class", "form-control");
		input2.setAttribute("id", "dk2");
		input2.setAttribute("maxlength", "16");
		let label2 = document.createElement("label");
		label2.innerText = "Key 2";
		div2.appendChild(input2);
		div2.appendChild(label2);
		divDecryptSidebar.append(div2);
		
		let div3 = document.createElement("div");
		div3.setAttribute("class", "form-floating mb-3");
		
		let input3 = document.createElement("input");
		input3.setAttribute("type", "text");
		input3.setAttribute("class", "form-control");
		input3.setAttribute("id", "dk3");
		input3.setAttribute("maxlength", "16");
		let label3 = document.createElement("label");
		label3.innerText = "Key 3";
		div3.appendChild(input3);
		div3.appendChild(label3);
		
		divDecryptSidebar.append(div3);
		
		//create button for starting decryption
		let btnGen = document.createElement("button");
		btnGen.setAttribute("type", "button");
		btnGen.setAttribute("class", "submit");
		btnGen.setAttribute("value", "Decrypt");
		btnGen.setAttribute("id", "btnGen");
		btnGen.setAttribute("onclick", "decryptGen()");
		btnGen.innerText = "Decrypt";
		
		divDecryptSidebar.append(btnGen);
	}
	
	//function for printing ciphertext, generate next button
	function decryptGen() {
		//check if keys are correct if not return
		key1 = document.getElementById("dk1").value;
		key2 = document.getElementById("dk2").value;
		key3 = document.getElementById("dk3").value;
		
		if (key1.length != 16) {
			return alert("Invalid Key 1 length 16 bits required!");
		}

		if (!(/^([10]{16,})$/.test(key1))) {
			return alert("Invalid Key 1 please only use 1s and 0s!");
		}
		if (key2.length != 16) {
			return alert("Invalid Key 2 length 16 bits required!");
		}

		if (!(/^([10]{16,})$/.test(key2))) {
			return alert("Invalid Key 2 please only use 1s and 0s!");
		}
		if (key3.length != 16) {
			return alert("Invalid Key 3 length 16 bits required!");
		}

		if (!(/^([10]{16,})$/.test(key3))) {
			return alert("Invalid Key 3 please only use 1s and 0s!");
		}
		
		document.getElementById("btnGen").disabled = true;
		
		if (document.contains(document.getElementById("divEncrypt"))) {
			document.getElementById("divEncrypt").remove();
		}
		
		let divEncrypt = document.createElement("div");
		divEncrypt.setAttribute("id", "divEncrypt");
		document.getElementById("div2").appendChild(divEncrypt);
		
		//print plaintext and break
		var txt = document.createElement("h5");
		txt.innerText = "Decrypt:";
		divEncrypt.appendChild(txt);
		divEncrypt.appendChild(document.createTextNode("Ciphertext: " + pt));
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
		
		decrypt_R3_S1();
	}
	
	//round 3
	function decrypt_R3_S1() {
		let row = document.createElement("tr");
		row.setAttribute("id", "row_round1");
		
		let first = document.createElement("td");
		first.innerText = "Round 3";
		row.append(first);
		
		document.getElementById("encryptTbl-body").append(row);
		
		printTblRow("encryptTbl-body", "round3_row1", "Ciphertext", pt.match(rowRegex), decrypt_R3_S2);
	}
	
	//function for printing key3, generate next button
	function decrypt_R3_S2() {
		printTblRow("encryptTbl-body", "round3_row2", "K3", key3.match(rowRegex), decrypt_R3_S3);
	}
	
	//function for xor ciphertext with key3, print result, generate next button
	function decrypt_R3_S3() {
		let splitpt = pt.match(rowRegex);
		let splitk3 = key3.match(rowRegex);
		round3[0] = _xor(splitpt[0],splitk3[0]);
		round3[1] = _xor(splitpt[1],splitk3[1]);
		round3[2] = _xor(splitpt[2],splitk3[2]);
		round3[3] = _xor(splitpt[3],splitk3[3]);
		
		round2 = round3;
		
		printTblRow("encryptTbl-body", "round3_row3", "xor", round3, decrypt_R2_S1);
	}
	
	//round 2
	//function for printing round 2 and result, generate next button
	function decrypt_R2_S1() {
		let row = document.createElement("tr");
		row.setAttribute("id", "row_round3");
		
		let first = document.createElement("td");
		first.innerText = "Round 2";
		row.append(first);
		
		document.getElementById("encryptTbl-body").append(row);
		
		printTblRow("encryptTbl-body", "round2_row1", "Ciphertext", round2, decrypt_R2_S2);
	}
	
	//function for reverse permutation of result, print result, generate next button
	function decrypt_R2_S2() {
		let tmpRound2 = round2[0] + round2[1] + round2[2] + round2[3];
		tmpRound2 = _permutation(tmpRound2);
		round2 = tmpRound2.match(rowRegex);
		
		printTblRow("encryptTbl-body", "round2_row2", "permutation", round2, decrypt_R2_S3);
	}
	
	//function for reverse sbox of result, print result, generate next button
	function decrypt_R2_S3() {
		round2[0] = _sboxrev(round2[0]);
		round2[1] = _sboxrev(round2[1]);
		round2[2] = _sboxrev(round2[2]);
		round2[3] = _sboxrev(round2[3]);
		
		printTblRow("encryptTbl-body", "round2_row3", "sbox", round2, decrypt_R2_S4);
	}
	
	//function for printing key2, generate next button
	function decrypt_R2_S4() {
		printTblRow("encryptTbl-body", "round2_row4", "K2", key2.match(rowRegex), decrypt_R2_S5);
	}
	
	//function for xor result with key2, print result, generate next button
	function decrypt_R2_S5() {
		let splitk2 = key2.match(rowRegex);
		round2[0] = _xor(round2[0],splitk2[0]);
		round2[1] = _xor(round2[1],splitk2[1]);
		round2[2] = _xor(round2[2],splitk2[2]);
		round2[3] = _xor(round2[3],splitk2[3]);
		
		round1 = round2;
		
		printTblRow("encryptTbl-body", "round2_row5", "xor", round2, decrypt_R1_S1);
	}
	
	//round 1
	//function for printing round 1 and result, generate next button
	function decrypt_R1_S1() {
		let row = document.createElement("tr");
		row.setAttribute("id", "row_round2");
		
		let first = document.createElement("td");
		first.innerText = "Round 1";
		row.append(first);
		
		document.getElementById("encryptTbl-body").append(row);
		
		printTblRow("encryptTbl-body", "round1_row1", "Ciphertext", round1, decrypt_R1_S2);
	}
	
	//function for reverse permutation of result, print result, generate next button
	function decrypt_R1_S2() {
		let tmpRound1 = round1[0] + round1[1] + round1[2] + round1[3];
		tmpRound1 = _permutation(tmpRound1);
		round1 = tmpRound1.match(rowRegex);

		printTblRow("encryptTbl-body", "round1_row2", "permutation", round1, decrypt_R1_S3);
	}
	
	//function for reverse sbox of result, print result, generate next button
	function decrypt_R1_S3() {
		round1[0] = _sboxrev(round1[0]);
		round1[1] = _sboxrev(round1[1]);
		round1[2] = _sboxrev(round1[2]);
		round1[3] = _sboxrev(round1[3]);
		
		printTblRow("encryptTbl-body", "round1_row3", "sbox", round1, decrypt_R1_S4);
	}
	
	//function for printing key1, generate next button
	function decrypt_R1_S4() {
		printTblRow("encryptTbl-body", "round1_row4", "K1", key1.match(rowRegex), decrypt_R1_S5);
	}
	
	//function for xor result with key1, print result, generate next button
	function decrypt_R1_S5() {
		let splitk1 = key1.match(rowRegex);
		round1[0] = _xor(round1[0],splitk1[0]);
		round1[1] = _xor(round1[1],splitk1[1]);
		round1[2] = _xor(round1[2],splitk1[2]);
		round1[3] = _xor(round1[3],splitk1[3]);
		
		printTblRow("encryptTbl-body", "round1_row5", "xor", round1, round1_Step4);
		
		if (document.contains(document.getElementById("step"))) {
			document.getElementById("step").remove()
		}
		
		let divEncrypt = document.getElementById("divEncrypt");
		divEncrypt.appendChild(document.createTextNode("Plaintext: " + round1.join("")));
	}