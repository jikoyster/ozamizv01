$('.remove_from_list a').click(function(e){
	e.preventDefault();
	$(this).closest('.listrow').hide('slow', function(){ $(this).remove(); });

	index = $(this).closest('.listrow').index();
	console.log( "i: "+index); //index is correct
	array_product_list.splice(index, 1);

	$('.compute_total').trigger('click');
	
	console.log( JSON.stringify(array_product_list) ); 
});