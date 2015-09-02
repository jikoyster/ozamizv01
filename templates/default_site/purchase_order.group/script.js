$('.product_list_edit_link').click(function(e){
	e.preventDefault();

	$('.list--editor').addClass('on');
	$('.bg--modal').addClass('on');
});	
$('.bg--modal').click(function(e){
	off_modal(e);
});
$(".le--close").click(function(e){
	off_modal(e);
});
function off_modal(e){
	e.preventDefault();
	$('.list--editor').removeClass('on');
	$('.bg--modal').removeClass('on');
		$('.search_result').html('');
		$('.searchinput').val('');
}


$('.compute_total').click(function(e){
	e.preventDefault();

	amtLen = array_product_list.length;
	total_amount = 0;
	for (var i = 0; i < amtLen; i++) {
		total_amount += array_product_list[i].amount;
	}

	console.log( JSON.stringify(array_product_list) );

	// (parseFloat(total_amount)).toLocaleString()
	$('.total_amount input').val( total_amount.toLocaleString() );
});


//***************************************************  **************//
function test(elem){
	$(elem).closest('.listrow').hide('slow', function(){ $(this).remove(); });

	index = $(elem).closest('.listrow').index();
	console.log( "i: "+index); //index is correct
	array_product_list.splice(index, 1);

	$('.compute_total').trigger('click');
}


function addCommas(nStr)
	{
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}