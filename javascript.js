function getridof(r)
{
	let i = r.parentNode.parentNode.rowIndex;
    document.getElementById("maintable").deleteRow(i);
}

function edit(r)
{
	let i = r.parentNode.parentNode.rowIndex;
   // document.getElementById("maintable").deleteRow(i);
}

function checkboxselect(checkbox) {
    let elementsArr = document.getElementsByName('checkbox');
    for (let i = 0; i < elementsArr.length; i++) elementsArr[i].checked = checkbox.checked;
}

function addbutton() {
	let input = prompt('Inserisci nome, email, indirizzo e telefono separati da virgola:', '');
	input = input.split(',');
	let editbutton = '<td><img onClick="edit(this)" class="buttonscss" src="img/editbutton.png"></td>';
	let removebutton = '<td><img onClick="getridof(this)" class="buttonscss" src="img/removebutton.png"></td>';
    let html = '<td><input class="form-check-input" type="checkbox" name="checkbox"></td><td><p>'+input[0]+'</p></td><td><p>'+input[1]+'</p></td><td><p>'+input[2]+'</p></td><td><p>'+input[3]+'</p></td>' + editbutton + removebutton;
    let row = document.createElement('tr'); row.innerHTML = html;
    document.getElementById('maintable').appendChild(row);
}

function deletebutton() {
    $('input:checked').each(function(index) {
		if (!(index==0&&document.getElementById("checkbox").checked))
		{
			$(this).closest('tr').remove();
		}
    });
}

$(document).ready(function() {
    $.ajax({
	url: 'http://localhost:8080/api/tutorial/1.0/employees',
    type: 'get',
    contentType: 'application/json',
    
	success: function(data, textstatus, jQxhr){  
    let dataDefault = data;
    let html = '';
    $.each(data, function(key, value){
		html += '<tr>';
        html += '<td><input class="form-check-input" type="checkbox" name="checkbox"></td>';
        html += '<td><p>'+value.firstName+' '+value.lastName+'</p></td>'+'<td><p>'+value.email+'</p></td>'+'<td><p>+'+value.address+'</p></td>'+'<td><p>'+value.phone+'</p></td>';
        html += '<td><button class="btn btn"><img onClick="edit(this)" class="buttonscss" src="img/editbutton.png"></button></td>';
        html += '<td><button class="btn btn"><img onClick="getridof(this)" class="buttonscss" src="img/removebutton.png"></button></td>';
        html += '<tr>';
        });
    $('#manage_table').append(html);
      }
    });
});
