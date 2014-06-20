var wpbdp = window.wpbdp || {};

( function( $ ) {
    var dnd = wpbdp.dnd = {
        setup: function( $area, $input, options ) {
            var options = $.extend( options, {} );

            $area.data( 'dnd-working', false );
            $area.on( 'dragover',
                      function( e ) {
                        if ( ! $( this ).hasClass( 'dragging' ) )
                            $( this ).addClass( 'dragging' );
                      } )
                 .on( 'dragleave',
                      function( e ) {
                        if ( $( this ).hasClass('dragging') )
                            $( this ).removeClass( 'dragging' );
                      } );
            $area.find( '.dnd-buttons input' ).click(function( e ) {
                e.preventDefault();
                $input.trigger( 'click' );
            } );

            $input.fileupload({
                url: $area.attr( 'data-action' ) ? $area.attr( 'data-action' ) : options.url,
                sequentialUploads: true,
                dataType: 'json',
                singleFileUploads: false,
                dropZone: $area,
                formData: function( form ) {
                    return [ { name: 'dummy', value: 1 } ];
                },
                send: function( e, data ) {
                    if ( $area.data('dnd-working' ) )
                        return false;

                    $area.removeClass( 'dragging' );
                    $area.removeClass( 'error' );
                    $area.data( 'dnd-working', true );

                    $area.find( '.dnd-area-inside' ).fadeOut( 'fast', function() {
                        // TODO: use some text-based options instead of requiring additional <div>s inside $area.
                        $area.find( '.dnd-area-inside-working span' ).text( data.files.length );
                        $area.find( '.dnd-area-inside-working' ).fadeIn( 'fast' );
                    } );

                    return true;
                },
                done: function( e, data ) {
                    var res = data.result;

                    if ( ! res.success )
                        return;

                    $area.data( 'dnd-working', false );
                    $area.find( '.dnd-area-inside-working' ).fadeOut( 'fast', function() {
                        $area.find( '.dnd-area-inside' ).fadeIn( 'fast' );
                    } );

                    if ( 'undefined' !== typeof options.done )
                        options.done.call( $area, res );
                }
            });
        }
    };

} )( jQuery );