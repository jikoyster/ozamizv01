(function($){

	//field inputs
	var company_price 	= $('.company_price input'),
		less 			= $('.less input'),
		net_price		= $('.net_price input');

	var wRate 			= $('.wRate input'),
		wPrice			= $('.wPrice input'),
		rRate 			= $('.rRate input'),
		rPrice			= $('.rPrice input');

	$(company_price).blur(function(){
		compute_net_price();
		compute_wholesale_price();
		compute_retail_price();
	});
	$(less).blur(function(){
		compute_net_price();
		compute_wholesale_price();
		compute_retail_price();
	});
	$(wRate).blur(function(){
		compute_wholesale_price();
	});
	$(rRate).blur(function(){
		compute_retail_price();
	});

	function compute_net_price(){
		np = $(company_price).val() - ( $(company_price).val() * ($(less).val()/100) );
		$(net_price).val(np.toFixed(2));
	}
	function compute_wholesale_price(){
		wp = parseFloat($(net_price).val()) + parseFloat(( $(net_price).val() * (($(wRate).val())/100) ));
		$(wPrice).val(wp.toFixed(2));
	}
	function compute_retail_price(){
		rp = parseFloat($(net_price).val()) + parseFloat(( $(net_price).val() * (($(rRate).val())/100) ));
		$(rPrice).val(rp.toFixed(2));
	}

})(jQuery);