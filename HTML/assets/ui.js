var nicknamesLinkKey = 'nicknames link';

function setAccountPassword(pwd) {
    // If you don't reset the selection range then focus() grabs the
    // physical box.
    window.getSelection().removeAllRanges();
    $('#accountPassword').val(pwd).focus().select();
}

/**
    Turn off auto-* features on iOS.

    The 'inputs' argument is expected to be a superset of 'passwords'.
*/
function disableIOSAutoStuff(inputs, passwords) {
    /* Turn off all automatic formatting stuff from iOS.
       Leave on auto-complete for nicknames only. */
    inputs.attr('autocapitalize', 'off').attr('autocorrect', 'off');
    passwords.attr('autocomplete', 'off');
}

function displayValidateMasterPassword(event) {
    var checkbox = event.data.checkbox;
    var passwordField = event.data.passwordField;

    checkbox.css('display', 'none');
    passwordField.css('display', 'inline').focus();
}

function validateMasterPassword(firstPassword, secondPassword) {
    if (firstPassword.val() === secondPassword.val()) {
        return true;
    } else {
        firstPassword.val('');
        secondPassword.val('');
        firstPassword.focus();
        return false;
    }
}

function createAccountPassword() {
    if ($('#newNickname')[0].checked) {
        var check = validateMasterPassword($('#masterPassword'),
                                           $('#validateMasterPassword'));
        if (!check) {
            return;
        }
    }

    $.mobile.changePage('#accountPasswordPage',
                             {changeHash: false});

    var accountPassword = oplop.accountPassword($('#nickname').val(),
                                $('#masterPassword').val());
    $(':password, :text').val('');

    setAccountPassword(accountPassword);
    if (window.clipboardWrite !== undefined) {
        clipboardWrite(accountPassword);
    }
}

function startOver(event) {
    event.data.location = event.data.location;
}

/* Create/set the href to nicknames. */
function setNicknamesLink(href) {
    var linkToNicknamesClass = 'linkToNicknames';
    $('span.'+linkToNicknamesClass).removeClass(linkToNicknamesClass)
            .wrap('<a data-role=none class="' + linkToNicknamesClass + '" target="_blank"></a>');
    $('a.'+linkToNicknamesClass).attr('href', href);
}

function changedNicknamesLink(event) {
        var href = event.target.value;
        if (href == '') {
            removeStorage(nicknamesLinkKey);
        } else {
            setStorage(nicknamesLinkKey, href);
        }
        setNicknamesLink(href);
}
