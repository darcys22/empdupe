$('#addEmployee').validator().on('submit', function (e) {
  if (e.isDefaultPrevented()) {
    // handle the invalid form...
  } else {
    e.preventDefault();
		window.employees.push($('#addEmployee').serializeObject());
		$('#addEmployee')[0].reset();
    window.startpicker.setMoment(window.startFY);
    window.endpicker.setMoment(window.endFY);
		$("#fybox").val(window.endFY.format("YYYY"));
		tableCreate();
    $('#employeeModal').modal('toggle');
    window.employees[window.employees.length - 1].fbtExempt = window.excluded;
    var element = document.getElementById('exemptfbt');
    element.innerHTML = "N<span class='caret'></span>"
    window.excluded = "N"
    openvalidate();
  }
})
$('#payer_form').validator().on('submit', function (e) {
  if (e.isDefaultPrevented()) {
    // handle the invalid form...
  } else {
    e.preventDefault();
    window.payer = $('#payer_form').serializeObject();
    $('#payerModal').modal('toggle');
    var payerheading = document.getElementById('payername');
    payerheading.innerHTML = '';
    var text = document.createElement('small');
    text.appendChild(document.createTextNode(window.payer.tradingName || window.payer.name))
    text.appendChild(document.createTextNode( " - " + window.payer.ABN));
    payerheading.appendChild(text);
    openvalidate();
  }
})
function openvalidate() {
  var validatebutton = document.getElementById('convert');
  if (window.employees.length > 0 && !jQuery.isEmptyObject(window.payer)) {
    validatebutton.title = "Validate before creating Empdupe File"
    validatebutton.disabled = false
    validatebutton.onclick = function() {validateEmpdupe()};
  } else {
    validatebutton.title = "Please add an employee and Payer details to create file"
    validatebutton.disabled = true
    validatebutton.onclick = function(){};
  }
}
function deleteEmployee(index) {
  window.employees.splice(index, 1);
  tableCreate();
  openvalidate();
}

function stripwhitecommas(str) {
  window.test = str
  if (!str || 0 === str.length) {
    return str
  } else {
    return str.toString().replace(/[\s,]+/g,'').trim(); 
  }
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function validateEmpdupe() {
  window.valid = true;
  numb = ['ABN']
  for (var i in numb) {
    window.payer[numb[i]] = stripwhitecommas(window.payer[numb[i]]);
  }
  window.payer.endDate = "30062116";


	validate.validators.abn = function($abn, options, key, attributes) {
    $weights = array(10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19);

    // strip anything other than digits
    $abn = preg_replace("/[^\d]/","",$abn);

    // check length is 11 digits
    if (strlen($abn)==11) {
        // apply ato check method 
        $sum = 0;
        foreach ($weights as $position=>$weight) {
            $digit = $abn[$position] - ($position ? 0 : 1);
            $sum += $weight * $digit;
        }
				if(($sum % 89)==0){
					return null;
				} else {
					return "Invalid ABN"
				}
    } 
		return "ABN Length Invalid";
	};

	validate.validators.tfn = function(value, options, key, attributes) {
		return null;
	};

	validate.validators.customdate = function(value, options, key, attributes) {
    if(moment(value,["Do MMMM YYYY","DDMMYYYY"]).isValid()){
      return null;
    } else {
      return "Invalid Date"
    }
	};

  var payerConstraints = {
    ABN: {
      presence: true,
			abn: true,
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
        minimum: 3,
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
        minimum: 4,
        maximum: 4
      },
      format: {
        pattern: "[0-9]+",
        message: "can only contain 0-9"
      }
    },
    endDate: {
      presence: true,
      customdate: true
    },
    name: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 200
      },
      format: {
        pattern: "\[a-z0-9\x20]+$",
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
        pattern: "\[a-z0-9\x20]+$",
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
        pattern: "\[a-z0-9\x20]+$",
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
        pattern: "\[a-z\x20]+$",
        flags: "i",
        message: "can only contain a-z"
      }
    },
    state: {
      presence: true,
      length: {
        minimum: 2,
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
  var payerErrors = validate(window.payer, payerConstraints)

  empnumb = ['TFN','taxWithheld','grossPayments',
    'allowances',
    'lumpsumA',
    'lumpsumB',
    'lumpsumD',
    'lumpsumE',
    'fb',
    'superSGC',
    ]
  

  var employeeConstraints = {
    TFN: {
      presence: true,
			tfn: true,
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
      customdate: true
    },
    periodStart: {
      presence: true,
      customdate: true
    },
    periodEnd: {
      presence: true,
      customdate: true
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
        pattern: "\[a-z\x20]+$",
        flags: "i",
        message: "can only contain a-z"
      }
    },
    state: {
      presence: true,
      length: {
        minimum: 2,
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

  window.employeeErrors = []
  window.errorNames = []
  for (var i in window.employees) {
    for (var j in empnumb) {
      
      window.employees[i][empnumb[j]] = stripwhitecommas(window.employees[i][empnumb[j]]);
    }

    window.employees[i].workplaceGiving = "0";
    window.employees[i].union = "0";
    window.employees[i].foreign = "0";
    window.employees[i].annuity = "0";
    var errors = validate(window.employees[i], employeeConstraints);
    if (errors) {
      window.employeeErrors.push(errors)
      window.errorNames.push(window.employees[i].surname + ', ' + window.employees[i].name);
    }
  }

  $('#console').empty();
  $("#validateModal").modal() 
  var div = document.getElementById('console');
  if(payerErrors) {
    window.valid = false;
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
  if(window.employeeErrors.length > 0) {
    window.valid = false;
    var p = document.createElement("p")                
    p.style.color = "red";
    var content = document.createTextNode("---ERRORS WITH EMPLOYEE DATA ---");
    var br = document.createElement("br");
    p.appendChild(br);
    p.appendChild(content);
    for (var i in window.employeeErrors) {
      var content = document.createTextNode("---EMPLOYEE: " + window.errorNames[i] + " ---");
      var br = document.createElement("br");
      p.appendChild(br);
      p.appendChild(content);
      for (var property in window.employeeErrors[i]) {
        var content = document.createTextNode(property + ":");
        var br = document.createElement("br");
        p.appendChild(br);
        p.appendChild(content);
        for (var j in window.employeeErrors[i][property]) {
          var content = document.createTextNode(window.employeeErrors[i][property][j]);
          var br = document.createElement("br");
          p.appendChild(br);
          p.appendChild(content);
        }
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
  openfile();

}
function openfile() {
  var createbutton = document.getElementById('createbutton');
  if (window.valid) {
    createbutton.disabled = false
    createbutton.onclick = function() {createEmpdupe()};
  } else {
    createbutton.disabled = true
    createbutton.onclick = function(){};
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
    addPaymentSummaryDataRecord(i);
  }
  addFileTotalRecord();
  download("empdupe", window.empdupe);
}

function addSupplierDataRecords() {
  //record length and identifier
  window.empdupe += "628IDENTREGISTER1"
  //ABN
  window.empdupe += window.payer.ABN
  //TODO: Run Type P = Production, T = Test
  window.empdupe += "T"
  // ReportEndDate
  window.empdupe += window.payer.endDate
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
  catAlphanumeric(200, window.payer.name);
  //Supplier Contact Name
  catAlphanumeric(38, window.payer.contactName);
  //Supplier Number
  catAlphanumeric(15, window.payer.number);
  //Filler
  catAlphanumeric(15 + 16 + 327, " ");
  window.empdupe += "\r\n";
  //record length and identifier
  window.empdupe += "628IDENTREGISTER3"
  //Supplier street address
  catAlphanumeric(38,window.payer.address);
  catAlphanumeric(38, "  ");
  //Supplier suburb
  catAlphanumeric(27, window.payer.suburb);
  //Supplier state
  catAlphanumeric(3, window.payer.state);
  //Supplier postcode
  catNumeric(4, window.payer.postcode);
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
  //record length and identifier
  window.empdupe += "628IDENTITY"
  //ABN
  window.empdupe += window.payer.ABN
  //ABN Branch Number
  catNumeric(3,window.payer.ABNBranch);
  //Financial Year
  catNumeric(4,window.payer.financialYear);
  //Payer Name
  catAlphanumeric(200, window.payer.name);
  //Payer Trading Name
  catAlphanumeric(200, window.payer.tradingName);
  //Payer street address
  catAlphanumeric(38, window.payer.address);
  catAlphanumeric(38, window.payer.address2);
  //Payer suburb
  catAlphanumeric(27, window.payer.suburb);
  //Payer state
  catAlphanumeric(3, window.payer.state);
  //Payer postcode
  catNumeric(4, window.payer.postcode);
  //Payer country (blank for Aus) 
  catAlphanumeric(20, "  ");
  //Payer Contact Name
  catAlphanumeric(38, window.payer.contactName);
  //Supplier Number
  catAlphanumeric(15, window.payer.number);
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
  //record length and identifier and Income type S for salary
  window.empdupe += "628DINBS"
  //TFN
  catNumeric(9,window.employees[arrayPosition].TFN);
  //DOB Year
  catDate(window.employees[arrayPosition].DOB);
  //Employee Surname
  catAlphanumeric(30, window.employees[arrayPosition].surname);
  //Employee Name
  catAlphanumeric(15, window.employees[arrayPosition].name);
  //Employee Second Name
  catAlphanumeric(15, window.employees[arrayPosition].secondName);
  //Employee street address
  catAlphanumeric(38, window.employees[arrayPosition].address);
  catAlphanumeric(38, window.employees[arrayPosition].address2);
  //Employee suburb
  catAlphanumeric(27, window.employees[arrayPosition].suburb);
  //Employee state
  catAlphanumeric(3, window.employees[arrayPosition].state);
  //Employee postcode
  catNumeric(4, window.employees[arrayPosition].postcode);
  //Payer country (blank for Aus) 
  catAlphanumeric(20, "  ");
  //Period Start
  catDate(window.employees[arrayPosition].periodStart);
  //Period End
  catDate(window.employees[arrayPosition].periodStart);
  //Tax Withheld
  catNumeric(8, window.employees[arrayPosition].taxWithheld);
  //Gross Payments
  catNumeric(8, window.employees[arrayPosition].grossPayments);
  //Total Allowances
  catNumeric(8, window.employees[arrayPosition].allowances);
  //Lumpsum A
  catNumeric(8, window.employees[arrayPosition].lumpsumA);
  //Lumpsum B
  catNumeric(8, window.employees[arrayPosition].lumpsumB);
  //Lumpsum D
  catNumeric(8, window.employees[arrayPosition].lumpsumD);
  //Lumpsum E
  catNumeric(8, window.employees[arrayPosition].lumpsumE);
  //Community Development Employment Project
  catNumeric(8, 0);
  //Filler
  catNumeric(8, 0);
  //Reportable Fringe benefit
  catNumeric(8, window.employees[arrayPosition].fb);
  //Amendment Indicator
  window.empdupe += "O"
  //Reportable Employer Superannuation Contributions
  catNumeric(8, window.employees[arrayPosition].superSGC);
  //Lump Sum A type
  catAlphanumeric(1, " ");
  //Workplace Giving
  catNumeric(8, window.employees[arrayPosition].workplaceGiving);
  //Union Fees
  catNumeric(8, window.employees[arrayPosition].union);
  //Exempt foreign employment income
  catNumeric(8, window.employees[arrayPosition].foreign);
  //Annuity Return of Capital
  catNumeric(8, window.employees[arrayPosition].annuity);
  //FBT Exemption
  catAlphanumeric(1, window.employees[arrayPosition].fbtExempt);
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
  window.empdupe += moment(date,["Do MMMM YYYY","DDMMYYYY"]).format('DDMMYYYY');
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

function formatCapitalize(element) {
  element.value = toTitleCase(element.value.toString());
}

function moneyNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function tableCreate() {
    var tbdy = document.getElementById('employeetable');
    tbdy.innerHTML = '';
    for (var i = 0; i < window.employees.length; i++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(window.employees[i].name +  ' ' +window.employees[i].surname))
        tr.appendChild(td)
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(window.employees[i].TFN))
        tr.appendChild(td)
        var td = document.createElement('td');
        td.appendChild(document.createTextNode("$" + moneyNumber(window.employees[i].grossPayments)));
        tr.appendChild(td)
        var td = document.createElement('td');
        td.appendChild(document.createTextNode("$" + moneyNumber(window.employees[i].taxWithheld)));
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

function formatabntfn(element) {
  element.value = element.value.toString().replace(/ /g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function formatdate(element) {
  element.value = moment(element.value, ["DDMMYYYY","DDMMMMYYYY", "DoMMMMYYYY", "DoMMYYYY"], false).format('Do MMMM YYYY');
}

function initdates() {
  var dobpicker = new Pikaday(
    {
        field: document.getElementById('dobbox'),
        firstDay: 1,
        maxDate: new Date(),
        onSelect: function() {
            var date = this.getMoment().format('Do MMMM YYYY');
            document.getElementById('dobbox').value = date;
        }
    });
  window.startpicker = new Pikaday(
    {
        field: document.getElementById('startbox'),
        firstDay: 1,
        maxDate: new Date(),
        onSelect: function() {
            var date = this.getMoment().format('Do MMMM YYYY');
            document.getElementById('startbox').value = date;
        }
    });
    
  window.endpicker = new Pikaday(
    {
        field: document.getElementById('endbox'),
        firstDay: 1,
        maxDate: new Date(),
        onSelect: function() {
            var date = this.getMoment().format('Do MMMM YYYY');
            document.getElementById('endbox').value = date;
        }
    });
  window.startpicker.setMoment(window.startFY);
  window.endpicker.setMoment(window.endFY);
}

$('.dropDownListItem').click(function(e) {
    var element = document.getElementById('exemptfbt');
    var name = e.currentTarget;
    if (name.getAttribute("data-name") == "E") {
      window.excluded = "Y"
      element.innerHTML = "E<span class='caret'></span>"
    } else {
      element.innerHTML = "N<span class='caret'></span>"
      window.excluded = "N"
    }
});

function main() {
  window.employees = [];
  window.payer = {};
  window.excluded = "N"
  window.now = moment();
  if (window.now.month() < 6) {
    window.now.set('year', now.year() -1);
  }
  window.now.set('month', 5);
  window.now.set('date', 30);
  window.endFY = moment(window.now);
  window.startFY = moment(window.now.subtract(1, 'years').add(1,'days'));
  $("#fybox").val(window.endFY.format("YYYY"));

  initdates();

}
main();
