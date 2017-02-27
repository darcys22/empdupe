function convert() {
}

function addEmployee() {
	window.employees.push($('#addEmployee').serializeObject());
  $('#addEmployee')[0].reset();
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

function main() {
  window.employees = [];
  window.payer = {};
}
main();
