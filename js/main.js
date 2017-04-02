function addEmployee() {
	window.employees.push($('#addEmployee').serializeObject());
  $('#addEmployee')[0].reset();
  initdates();
  tableCreate();
}

function deleteEmployee(index) {
  window.employees.splice(index, 1);
  tableCreate();
}

function validateEmpdupe() {
  var valid = true;
  var payer = { "ABN": "12345678901",
              "ABNBranch": "001",
              "financialYear": "2016",
              "endDate": "30062016",
              "name": "Sean",
              "contactName": "Sean",
              "tradingName": "Sean", //Optional
              "number": "0414123456",
              "address": "123 Fake St",
              "suburb": "Albury",
              "state": "NSW",
              "postcode": "2640"
  }
  var payerConstraints = {
    ABN: {
      presence: true,
      length: {
        maximum: 11
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    ABNBranch: {
      length: {
        maximum: 3
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    financialYear: {
      presence: true,
      length: {
        maximum: 4
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    endDate: {
      presence: true,
      length: {
        maximum: 8
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    name: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "[a-z0-9]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    contactName: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "[a-z0-9]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    number: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 15
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    tradingname: {
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "[a-z0-9]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    address: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9 and space"
      }
    },
    address2: {
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9 and space"
      }
    },
    suburb: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 27
      },
      format: {
        pattern: "[a-z]+",
        flags: "i",
        message: "can only contain a-z"
      }
    },
    state: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 3
      },
      format: {
        pattern: "[A-Z]+",
        message: "can only contain A-Z"
      }
    },
    postcode: {
      format: {
        pattern: "\\d{4}"
      }
    }
  };
  var payerErrors = validate(payer, payerConstraints)
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
              "address": "123 Fake St",
              "suburb": "Albury",
              "state": "NSW",
              "postcode": "2640"
  };
  var employeeConstraints = {
    TFN: {
      presence: true,
      length: {
        minimum: 9,
        maximum: 9
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    DOB: {
      presence: true,
      length: {
        maximum: 8
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    periodStart: {
      presence: true,
      length: {
        maximum: 8
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    periodEnd: {
      presence: true,
      length: {
        maximum: 8
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    taxWithheld: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    grossPayments: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    allowances: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    lumpsumA: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    lumpsumB: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    lumpsumD: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    lumpsumE: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    fb: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    superSGC: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    workplaceGiving: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    union: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    foreign: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    annuity: {
      format: {
        pattern: "^[0-9]{0,8}$"
      }
    },
    fbtExempt: {
      format: {
        pattern: "^[Y,N]{1}$"
      }
    },
    name: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "[a-z0-9]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    secondName: {
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "[a-z0-9]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    surname: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "[a-z0-9]+",
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    address: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9 and space"
      }
    },
    address2: {
      length: {
        minimum: 3,
        maximum: 38
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
        flags: "i",
        message: "can only contain a-z and 0-9 and space"
      }
    },
    suburb: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 27
      },
      format: {
        pattern: "[a-z]+",
        flags: "i",
        message: "can only contain a-z"
      }
    },
    state: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 3
      },
      format: {
        pattern: "[A-Z]+",
        message: "can only contain A-Z"
      }
    },
    postcode: {
      format: {
        pattern: "\\d{4}"
      }
    }
  };
  var employeeErrors = validate(employee, employeeConstraints)
  $('#console').empty();
  $("#validateModal").modal() 
  var div = document.getElementById('console');
  if(payerErrors) {
    var p = document.createElement("p")                
    p.style.color = "red";
    var content = document.createTextNode("---ERRORS WITH PAYER DATA ---");
    p.appendChild(content);
    var br = document.createElement("br");
    p.appendChild(br);
    for (var property in payerErrors) {
      var content = document.createTextNode(property + ":");
      var br = document.createElement("br");
      p.appendChild(br);
      p.appendChild(content);
      for (var i in payerErrors[property]) {
        var content = document.createTextNode(i +":" + payerErrors[property][i]);
    var br = document.createElement("br");
        p.appendChild(br);
        p.appendChild(content);
      }
    }
    div.appendChild(p);
  } else {
    var p = document.createElement("p")                
    p.style.color = "green";
    var content = document.createTextNode("---PAYER DATA VALID---");
    var br = document.createElement("br");
    p.appendChild(content);
    p.appendChild(br);
    div.appendChild(p);
  }
  if(employeeErrors) {
    var p = document.createElement("p")                
    p.style.color = "red";
    var content = document.createTextNode("---ERRORS WITH EMPLOYEE DATA ---");
    var br = document.createElement("br");
    p.appendChild(br);
    p.appendChild(content);
    for (var property in employeeErrors) {
      var content = document.createTextNode(property + ":");
      var br = document.createElement("br");
      p.appendChild(br);
      p.appendChild(content);
      for (var i in employeeErrors[property]) {
        var content = document.createTextNode(i +":" + employeeErrors[property][i]);
        var br = document.createElement("br");
        p.appendChild(br);
        p.appendChild(content);
      }
    }
    div.appendChild(p);
  } else {
    var p = document.createElement("p")                
    p.style.color = "green";
    var content = document.createTextNode("---EMPLOYEE DATA VALID---");
    var br = document.createElement("br");
    p.appendChild(br);
    p.appendChild(content);
    div.appendChild(p);
  }

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
        td.appendChild(document.createTextNode(window.employees[i].first_name +  ' ' +window.employees[i].surname))
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
        btn.setAttribute('data-param', i);
        btn.onclick = function () {deleteEmployee(this.getAttribute('data-param'));}; 
        btn.innerHTML = "-";
        td.appendChild(btn)
        tr.appendChild(td)
        tbdy.appendChild(tr);
    }
}

function initdates() {
  var dobpicker = new Pikaday(
    {
        field: document.getElementById('dobbox'),
        firstDay: 1,
        maxDate: new Date(),
        onSelect: function() {
            var date = this.getMoment().format('Do MMMM YYYY') + ' ';
            document.getElementById('dobbox').value = date;
        }
    });
  var startpicker = new Pikaday(
    {
        field: document.getElementById('startbox'),
        firstDay: 1,
        maxDate: new Date(),
        onSelect: function() {
            var date = this.getMoment().format('Do MMMM YYYY') + ' ';
            document.getElementById('startbox').value = date;
        }
    });
  startpicker.setMoment(window.startFY);
    
  var endpicker = new Pikaday(
    {
        field: document.getElementById('endbox'),
        firstDay: 1,
        maxDate: new Date(),
        onSelect: function() {
            var date = this.getMoment().format('Do MMMM YYYY') + ' ';
            document.getElementById('endbox').value = date;
        }
    });
  endpicker.setMoment(window.endFY);
}

function main() {
  window.employees = [];
  window.payer = {};
  var now = moment();
  if (now.month() < 6) {
    now.set('year', now.year() -1);
  }
  now.set('month', 5);
  now.set('date', 30);
  window.endFY = moment(now);
  window.startFY = moment(now.subtract(1, 'years').add(1,'days'));
  $("#fybox").val(window.endFY.format("YYYY"));

  validate.extend(validate.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it
    // could be anything.
    parse: function(value, options) {
      return +moment.utc(value);
    },
    // Input is a unix timestamp
    format: function(value, options) {
      var format = options.dateOnly ? "DDMMYYYY" : "YYYY-MM-DD hh:mm:ss";
      return moment.utc(value).format(format);
    }
  });

  initdates();

}
main();
