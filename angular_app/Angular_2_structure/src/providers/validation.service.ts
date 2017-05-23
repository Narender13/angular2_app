export class ValidationService {

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.(\w{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i)) {
            return null;
        } else {
            return { invalidEmail: true };
        }
    }

    static phoneValidator(control) {
        // RFC 2822 compliant regex
        if (control.value.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$|^$/)) {
            return null;
        } else {
            return { 'invalidPhoneNumber': true };
        }
    }

    static noSpaces(user) {
        // RFC 2822 compliant regex
        if (user && user.match(/\s/)) {
            return true;
        } else {
            return null;
        }
    }

    static matchingPassword(control) {
        if (control.value == control.root.value['password']) {           
            return null;
        } else {          
            return { mismatchPassword: true };
        }

    }

    static matchingEmail(control) {
        if (control.value == control.root.value['email']) {           
            return null;
        } else {           
            return { mismatchemail: true };
        }

    }


}
