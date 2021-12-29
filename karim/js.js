$('#printInvoice').click(function () {
    Popup($('.invoice')[0].outerHTML);
    function Popup(data) {
        window.print();
        return true;
    }
});

function inline_calcul(element) {
    var prix = $(element).val();
    var qte = $(element).parents('tr').find('.qte').val();
    var total = parseInt(qte*prix);
    $(element).parents('tr').find('.inline_total').text(total+' DH');

    global_total();
}

function global_total() {
    var total_ht = 0;

    $('#facture_table tr.active').each(function (index, tr) {
        var qte = $(tr).find('.qte').val();
        var prix = $(tr).find('.prix').val();
        total_ht += parseInt(qte * prix);
    });

    $('#total_ht').text(total_ht+' DH');
    $('#tva').text(total_ht*20/100+' DH');
    $('#total_ttc').text($.number(total_ht + (total_ht * 20 / 100), 2, ',', ' ')+' DH');
}

function delete_row(element) {
    $(element).parents('tr').remove();
    global_total();
}

$('#add_ligne').on('click', function () {
    var html = '';
    html += '<tr class="active">';
    html += '<td>';
    html += '<input type="text">';
    html += '</td>';
    html += '<td class="unit">';
    html += '<input class="qte" type="number">';
    html += '</td>';
    html += '<td class="qty">';
    html += '<input class="prix" type="number" onkeyup="inline_calcul(this)">';
    html += '</td>';
    html += '<td class="inline_total">0.00 DH</td>';
    html += '<td style="text-align: center;">';
    html += '<button style="cursor: pointer;border: none;" onclick="delete_row(this)">';
    html += '<i class="far fa-trash-alt" style="font-size: 20px;"></i>';
    html += '</button>';
    html += '</td>';
    html += '</tr>';
    
    $('#facture_table tbody').append(html);
});
