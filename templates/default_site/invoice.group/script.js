$('input[name=invoice_num]').blur(function(){
	invoice_num = $(this).val();
	$('input[name=title]').val('INV-'+invoice_num);
});


var type;

$(".type input").click(function(){
	type = $(this).val();
});

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

//UPDATE PRODUCT
function update_product(){
	$.ajax({
		url: "{path='invoice/updateProduct'}",
		data: {test: JSON.stringify( array_product_list )}
	})
	.done(function(result){
		// $('form').append(result);
	});
}

$('.invoiceCreate form').submit(function(){
	var error_flag = false;

	error = {
		type				: check_type( $("input[name=type]").is(':checked') ),
		invoice_num			: check_invoice_num( $('.invoice_num input[name=invoice_num]').val() ),
		customer			: check_customer( $('.customer select').val() )
	};

	$.each(error, function(key, value){
		console.log( key +" : "+value );
		error_flag = value;
		if(value){ 
			scrollTo_TopForm(); 
		}else{
			update_product();
		}
		return !error_flag;
	});

	return !error_flag;
	// console.log(array_product_list);
	// return false;
});
	function scrollTo_TopForm(){
		$('body, html').animate({
			scrollTop: $('body').offset().top
		});
	}

//*************************************************** VALIDATION **************//
function check_type(reqType){ // check if checked
	if(reqType){
		error = false;
		$(".type").removeClass("error");
	}else{
		error = true;
		$(".type").addClass("error");
	}
	return error;
}
function check_invoice_num( form_invoice_num ){
	if( form_invoice_num != '' ){
		error = false;
		$(".invoice_num input").removeClass("error2");
	}else{
		error = true;
		$(".invoice_num input").addClass("error2");
	}
	return error;
}
function check_customer(customer){
	if( customer != '' ){
		error = false;
		$(".customer select").removeClass("error2");
	}else{
		error = true;
		$(".customer select").addClass("error2");
	}
	return error;
}

//*************************************************** VALIDATION **************//



function test(elem){
	$(elem).closest('.listrow').hide('slow', function(){ $(this).remove(); });

	index = $(elem).closest('.listrow').index();
	console.log( "i: "+index); //index is correct
	array_product_list.splice(index, 1);

	$('input[name=tax_rate]').val(0);
	$('input[name=tax_amount]').val(0);
	$('.compute_total').trigger('click');
}