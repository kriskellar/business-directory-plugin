jQuery(document).ready(function($){

	// form fields
	$('form#wpbdp-formfield-form select#field-association').change(function(){
		$('form#wpbdp-formfield-form select#field-type').change();
	});

	$('form#wpbdp-formfield-form select#field-type').change(function(){
		var selected_type = $('option:selected', $(this)).val();
		var association = $('form#wpbdp-formfield-form select#field-association option:selected').val();

		if ((selected_type == 'select' ||
			selected_type == 'radio' ||
			selected_type == 'multiselect' ||
			selected_type == 'checkbox') && association != 'category') {
			$('form#wpbdp-formfield-form #field-data-options').parents('tr').show();
		} else {
			$('form#wpbdp-formfield-form #field-data-options').parents('tr').hide();			
			$('form#wpbdp-formfield-form #field-data-options').text('');
		}
	}).change();

	$('form#wpbdp-fee-form input[name="_days"]').change(function(){
		var value = $(this).val();

		// alert(value);

		if (value == 0) {
			$('form input#wpbdp-fee-form-days-n').attr('disabled', true);
			$('form input[name="fee[days]"]').val('0');
		} else {
			$('form input#wpbdp-fee-form-days-n').removeAttr('disabled');
			$('form input[name="fee[days]"]').val($('form input#wpbdp-fee-form-days-n').val());
			$('form input#wpbdp-fee-form-days-n').focus();
		}

		return true;
	});

	// $('form#wpbdp-fee-form input[name="fee[days]"]').keypress(function(e){
	// 	$('form input#wpbdp-fee-form-days-0').removeAttr('checked');		
	// 	$('form input#wpbdp-fee-form-days').attr('checked', true);
	// 	// $('form#wpbdp-fee-form input[name="_days"]').change();
	// });

	$('form#wpbdp-fee-form').submit(function(){
		// alert($('form#wpbdp-fee-form input[name="fee[days]"]').val());
		// return false;
		$('form input[name="fee[days]"]').removeAttr('disabled');
		return true;
	});

	/* Listing Info Metabox */
	$('#BusinessDirectory_listinginfo .listing-metabox-tabs a').click(function(e){
		e.preventDefault();

		var href = $(this).attr('href');

		var $selected = $(this).parent('li').siblings('.selected');

		if ($selected.length > 0) {
			if ($selected.find('a:first').attr('href') == href) {
				return;
			} else {
				// hide current tab (if any)
				$selected.removeClass('selected');
				$($selected.find('a:first').attr('href')).hide();
			}
		}

		// show new tab
		$(this).parent('li').addClass('selected');
		$(href).show();
	});

	$('#BusinessDirectory_listinginfo .listing-metabox-tabs li.selected a').click();

	/* Listing Info metabox / Transactions */
	$('#listing-metabox-transactions .transaction .summary').click(function(e){
		e.preventDefault();
		$(this).find('.handle a').text($(this).parent('.transaction').hasClass('open') ? '+' : '-');
		$(this).parent('.transaction').toggleClass('open');
		$(this).siblings('.details').toggle();
	});

	/* Listing info metabox / fees */
	$('#listing-metabox-fees a.assignfee-link').click(function(e){
		e.preventDefault();
		$(this).siblings('.assignfee').show();
	});

	$('#listing-metabox-fees .assignfee .close-handle').click(function(e){
		e.preventDefault();
		$(this).parent('.assignfee').hide();
	});

	/* Ajax placeholders */
	$('.wpbdp-ajax-placeholder').each(function(i,v){
		wpbdp_load_placeholder($(v));
	});

	$('a.delete-image-button').live('click', function(e){
		e.preventDefault();
		jQuery.get($(this).attr('href'), function(res){
			wpbdp_load_placeholder($("#wpbdp-listing-images"));	
		});

		return false;
	});	

});

function wpbdp_load_placeholder($v) {
	var action = $v.attr('data-action');
	var post_id = $v.attr('data-post_id');
	var baseurl = $v.attr('data-baseurl');

	$v.load(ajaxurl, {"action": action, "post_id": post_id, "baseurl": baseurl});
}