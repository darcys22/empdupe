function convert() {
}

function addEmployee() {
	window.employees.push($('#addEmployee').serializeObject());
  $('#addEmployee')[0].reset();
  tableCreate();
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function createEmpdupe() {
  window.empdupe = "";
  addSupplierDataRecords();
  addPayerIdentityDataRecord();
  addSoftwareDataRecord();
  for (var i = 0; i < window.employees.length; i++) {
    addPaymentSummaryDataRecord(window.employees[i]);
  }
  addFileTotalRecord();
  download("empdupe", window.empdupe);
}

function addSupplierDataRecords() {
  var supplier = { "ABN": "12345678901",
              "endDate": "30062016",
              "name": "Sean",
              "contactName": "Sean",
              "number": "0414123456",
              "address": "123 Fake St",
              "suburb": "Albury",
              "state": "NSW",
              "postcode": "2640"
  }

  //record length and identifier
  window.empdupe += "628IDENTREGISTER1"
  //TODO: ABN verifier
  window.empdupe += supplier.ABN
  //TODO: Run Type P = Production, T = Test
  window.empdupe += "T"
  // ReportEndDate
  window.empdupe += supplier.endDate
  //Data Type payg withholding summaries must be E, Type of report must be A, format of report must be P
  window.empdupe += "EAP"
  //Report specification number
  window.empdupe += "FEMPA012.0"
  //Filler
  catAlphanumeric(578, " ");
  window.empdupe += "\r\n";
  //record length and identifier
  window.empdupe += "628IDENTREGISTER2"
  //SupplierName
  catAlphanumeric(200, supplier.name);
  //Supplier Contact Name
  catAlphanumeric(38, supplier.contactName);
  //Supplier Number
  catAlphanumeric(15, supplier.number);
  //Filler
  catAlphanumeric(15 + 16 + 327, " ");
  window.empdupe += "\r\n";
  //record length and identifier
  window.empdupe += "628IDENTREGISTER3"
  //Supplier street address
  catAlphanumeric(38,supplier.address);
  catAlphanumeric(38, "  ");
  //Supplier suburb
  catAlphanumeric(27, supplier.suburb);
  //Supplier state
  catAlphanumeric(3, supplier.state);
  //Supplier postcode
  catNumeric(4, supplier.postcode);
  //Supplier country (blank for Aus) 
  catAlphanumeric(20, "  ");
  //Supplier postal add 
  catAlphanumeric(38 + 38 + 27 + 3, "  ");
  catNumeric(4,0);
  catAlphanumeric(20, "  ");
  //Supplier email
  catAlphanumeric(76, "  ");
  //Filler
  catAlphanumeric(275, "  ");
  window.empdupe += "\r\n";

}

function addPayerIdentityDataRecord() {
  var payer = { "ABN": "12345678901",
              "ABNBranch": "001",
              "financialYear": "2016",
              "name": "Sean",
              "tradingName": "Sean",
              "contactName": "Sean",
              "number": "0414123456",
              "address": "123 Fake St",
              "suburb": "Albury",
              "state": "NSW",
              "postcode": "2640"
  }

  //record length and identifier
  window.empdupe += "628IDENTITY"
  //TODO: ABN Verifier
  window.empdupe += payer.ABN
  //ABN Branch Number
  catNumeric(3,payer.ABNBranch);
  //Financial Year
  catNumeric(4,payer.financialYear);
  //Payer Name
  catAlphanumeric(200, payer.name);
  //Payer Trading Name
  catAlphanumeric(200, payer.tradingName);
  //Payer street address
  catAlphanumeric(38, payer.address);
  catAlphanumeric(38, "  ");
  //Payer suburb
  catAlphanumeric(27, payer.suburb);
  //Payer state
  catAlphanumeric(3, payer.state);
  //Payer postcode
  catNumeric(4, payer.postcode);
  //Payer country (blank for Aus) 
  catAlphanumeric(20, "  ");
  //Payer Contact Name
  catAlphanumeric(38, payer.contactName);
  //Supplier Number
  catAlphanumeric(15, payer.number);
  //Filler
  catAlphanumeric(15 + 1, "  ");
  window.empdupe += "\r\n";
}


function addSoftwareDataRecord() {
  //record length and identifier
  window.empdupe += "628SOFTWARE"
  //Software product Type
  catAlphanumeric(80, "COMMERCIAL Sean Darcy DarcyFinancial www.empdupe.com.au EmpdupeCreator 1");
  //TODO: ECI tested
  window.empdupe += "Y"
  //Filler
  catAlphanumeric(536, "  ");
  window.empdupe += "\r\n";
}

function addPaymentSummaryDataRecord(arrayPosition) {
  var employee = { "TFN": "123456789",
              "DOB": "22111990",
              "periodStart": "22111990",
              "periodEnd": "22111990",
              "taxWithheld": "37000",
              "grossPayments": "100000",
              "allowances": "0",
              "lumpsumA": "0",
              "lumpsumB": "0",
              "lumpsumD": "0",
              "lumpsumE": "0",
              "fb": "0",
              "superSGC": "0",
              "workplaceGiving": "0",
              "union": "0",
              "foreign": "0",
              "annuity": "0",
              "fbtExempt": "N",
              "name": "Sean",
              "surname": "Darcy",
              "secondName": "  ",
              "contactName": "Sean",
              "number": "0414123456",
              "address": "123 Fake St",
              "suburb": "Albury",
              "state": "NSW",
              "postcode": "2640"
  }

  //record length and identifier and Income type S for salary
  window.empdupe += "628DINBS"
  //TODO: TFN Valiadator
  catNumeric(9,employee.TFN);
  //DOB Year
  catDate(employee.DOB);
  //Employee Surname
  catAlphanumeric(30, employee.surname);
  //Employee Name
  catAlphanumeric(15, employee.name);
  //Employee Second Name
  catAlphanumeric(15, employee.secondName);
  //Employee street address
  catAlphanumeric(38, employee.address);
  catAlphanumeric(38, "  ");
  //Employee suburb
  catAlphanumeric(27, employee.suburb);
  //Employee state
  catAlphanumeric(3, employee.state);
  //Employee postcode
  catNumeric(4, employee.postcode);
  //Payer country (blank for Aus) 
  catAlphanumeric(20, "  ");
  //Period Start
  catDate(employee.periodStart);
  //Period End
  catDate(employee.periodStart);
  //Tax Withheld
  catNumeric(8, employee.taxWithheld);
  //Gross Payments
  catNumeric(8, employee.grossPayments);
  //Total Allowances
  catNumeric(8, employee.allowances);
  //Lumpsum A
  catNumeric(8, employee.lumpsumA);
  //Lumpsum B
  catNumeric(8, employee.lumpsumB);
  //Lumpsum D
  catNumeric(8, employee.lumpsumD);
  //Lumpsum E
  catNumeric(8, employee.lumpsumE);
  //Community Development Employment Project
  catNumeric(8, 0);
  //Filler
  catNumeric(8, 0);
  //Reportable Fringe benefit
  catNumeric(8, employee.fb);
  //Amendment Indicator
  window.empdupe += "O"
  //Reportable Employer Superannuation Contributions
  catNumeric(8, employee.superSGC);
  //Lump Sum A type
  catAlphanumeric(1, " ");
  //Workplace Giving
  catNumeric(8, employee.workplaceGiving);
  //Union Fees
  catNumeric(8, employee.union);
  //Exempt foreign employment income
  catNumeric(8, employee.foreign);
  //Annuity Return of Capital
  catNumeric(8, employee.annuity);
  //FBT Exemption
  catAlphanumeric(1, employee.fbtExempt);
  //Filler
  catAlphanumeric(274, "  ");
  window.empdupe += "\r\n";
}

function addFileTotalRecord() {
  //record length and identifier
  window.empdupe += "628FILE-TOTAL"
  //Annuity Return of Capital
  catNumeric(8, window.employees.length + 6);
  //Filler
  catAlphanumeric(607, "  ");
  window.empdupe += "\r\n";
}
function catxAlphanumeric(length, text) {
  window.empdupe += padding_right(text, "x", length)
}

function catAlphanumeric(length, text) {
  window.empdupe += padding_right(text, " ", length)
}
function catDate(date) {
  //TODO: make this work
  window.empdupe += "30062016"
}
function catNumeric(length, num) {
  var n = String(num); 
  window.empdupe += padding_left(n, "0", length)
}
// left padding s with c to a total of n chars
function padding_left(s, c, n) {
  if (! s || ! c || s.length >= n) {
    return s;
  }
  var max = (n - s.length)/c.length;
  for (var i = 0; i < max; i++) {
    s = c + s;
  }
  return s;
}
// right padding s with c to a total of n chars
function padding_right(s, c, n) {
  if (! s || ! c || s.length >= n) {
    return s;
  }
  var max = (n - s.length)/c.length;
  for (var i = 0; i < max; i++) {
    s += c;
  }
  return s;
}

function editPayer() {
	window.payer = $('#payer_form').serializeObject();
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = "";
            }
            o[this.name] = this.value || '';
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function checkABN(str) {
    if (!str || str.length !== 11) {
        return false;
    }
    var weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
        checksum = str.split('').map(Number).reduce(
        function(total, digit, index) {
            if (!index) {
                digit--;
            }
            return total + (digit * weights[index]);
        },
        0
    );

    if (!checksum || checksum % 89 !== 0) {
        return false;
    }

    return true;
}

function tableCreate() {
    var tbdy = document.getElementById('employeetable');
    tbdy.innerHTML = '';
    for (var i = 0; i < window.employees.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(window.employees[i].surname + ', ' +window.employees[i].first_name))
        tr.appendChild(td)
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(window.employees[i].tfn))
        tr.appendChild(td)
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(window.employees[i].gross_payments))
        tr.appendChild(td)
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(window.employees[i].tax_withheld))
        tr.appendChild(td)
        var td = document.createElement('td');
        var btn = document.createElement('button');
        btn.className = 'btn btn-danger';
        btn.innerHTML = "-";
        td.appendChild(btn)
        tr.appendChild(td)
        tbdy.appendChild(tr);
    }
}


function main() {
  window.employees = [];
  window.payer = {};
}
main();
