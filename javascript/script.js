console.log( "Script ran" )

$( document ).ready( function () {
    $( '.contact-submit' ).click( function ( event ) {
        console.log( "Submit button clicked ")

        var email = $( '.contact.email' ).val()
        var subject = $( 'contact-subject' ).val()
        var message = $( '.contact-message' ).val()
        // hold the status of the elements to give message to user, then dump them
        $( ".contact-email-msg" ).empty()
        $( ".contact-subject-msg" ).empty()
        $( ".contact-message-msg" ).empty()

        // do some minor data validation
        if ( email.length > 5 && email.includes( '@' ) && email.includes( '.' )) {
            console.log( 'email is valid' )
        } else {
            $( ".contact-email-msg" ).append( '<div> * Please enter a valid email.</div>' )
            event.preventDefault()
            console.log( 'email is NOT valid' )
        }

        if ( subject.length > 2 ) {
            console.log( 'subject is valid' )
        } else {
            $( ".contact-subject-msg" ).append( '<div> * Please enter a longer subject.</div>' )
            event.preventDefault()
            console.log( 'subject is NOT valid' )
        }

        if ( message.length > 10 ) {
            console.log( 'message is valid' )
        } else {
            $( ".contact-message-msg" ).append( '<div> * Please enter a longer message.</div>' )
            console.log( 'message is NOT valid' )
        }

    })
})

// $( "#contact-email-to-copy" ).addEventListener( 'click',
document.getElementById( 'contact-email-to-copy' ).addEventListener( 'click',
() => {
    console.log( "email clicked" )
    window.navigator.clipboard.writeText( "grantrileyh@gmail.com" );
});


// script to have left nav automatically highlight side navbar as side goes by it
// based on joxmar's codepen. 
//   https://codepen.io/joxmar/pen/NqqMEg


// Cache selectors
var lastId,
    sideMenu = $("#sideNav"),
    croppedHeight = 0,
    menuItems = sideMenu.find("a"),
    // anchors for the menu items
    scrollItems = menuItems.map( function() {
        var item = $($(this).attr("href"));
        if (item.length) { 
            return item; 
        }
    });

// Bind click handler to menu items
// for fancy animation
menuItems.click( function( e ) {
    var href = $( this ).attr( "href" ),
        offsetTop = href === "#" ? 0 : $( href ).offset().top + croppedHeight + 1;

    $( 'html, body' ).stop().animate({
        scrollTop: offsetTop
    }, 150 );
    e.preventDefault();
});

// Bind to scroll
$( window ).scroll( function() {
    // get container scroll position
    var fromTop = $( this ).scrollTop();

    // get id of current scroll item
    var cur = scrollItems.map( function() {
        if ( $( this ).offset().top < fromTop )
            return this;
    });

    // get id of current element
    cur = cur[ cur.length - 1 ];
    var id = cur && cur.length ? cur[ 0 ].id : "";

    if ( lastId !== id ) {
        lastId = id;

        // set/remove active class
        menuItems
            .parent().removeClass( "active" )
            .end().filter( "[href=\\#" + id + "]" ).parent().addClass( "active" );
    }
});
