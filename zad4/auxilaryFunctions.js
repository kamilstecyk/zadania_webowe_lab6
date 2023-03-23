let has_at_least_8_chars = false;
let has_at_least_one_digit = false;
let has_at_least_one_special_char = false;
let has_at_least_one_capital_letter = false;

const check_if_has_at_least_eight_chars = (text) => 
{
    return text.length >= 8;
};

const check_if_has_at_least_one_special_char = (text) =>
{
    var regexp = /(?=.*[!@#$%^&*])/;
    return regexp.test(text);
};

const check_if_has_at_lest_one_capital_letter = (text) =>
{
    var regexp = /(?=.*[A-Z])/;
    return regexp.test(text);
};

const check_if_has_at_least_one_digit = (text) =>
{
    var regexp = /\d/;
    return regexp.test(text);
};

const validate_password = (text) => 
{

    if(!check_if_has_at_least_eight_chars(text))
    {
        has_at_least_8_chars = false;
    }
    else 
    {
        has_at_least_8_chars = true;
    }

    if(!check_if_has_at_least_one_special_char(text))
    {
        has_at_least_one_special_char = false;
    }
    else
    {
        has_at_least_one_special_char = true;
    }

    if(!check_if_has_at_lest_one_capital_letter(text))
    {
       has_at_least_one_capital_letter = false;
    }
    else
    {
        has_at_least_one_capital_letter = true;
    }

    if(!check_if_has_at_least_one_digit(text))
    {
        has_at_least_one_digit = false;
    }
    else
    {
        has_at_least_one_digit = true;
    }

    return ( has_at_least_8_chars && has_at_least_one_capital_letter && has_at_least_one_digit && has_at_least_one_special_char ) ? true : false;
};

const show_status_of_password = (span_8_chars_requirement, span_one_special_char_requirement, span_one_capital_letter_requirement, span_one_digit_requirement) => {
    if(!has_at_least_8_chars)
    {
        span_8_chars_requirement.innerHTML = 'cancel';
        span_8_chars_requirement.style.color = 'black';
    }
    else 
    {
        span_8_chars_requirement.innerHTML = 'check_circle';
        span_8_chars_requirement.style.color = 'green';
    }

    if(!has_at_least_one_special_char)
    {
        span_one_special_char_requirement.innerHTML = 'cancel';
        span_one_special_char_requirement.style.color = 'black';
    }
    else
    {
        span_one_special_char_requirement.innerHTML = 'check_circle';
        span_one_special_char_requirement.style.color = 'green';
    }

    if(!has_at_least_one_capital_letter)
    {
        span_one_capital_letter_requirement.innerHTML = 'cancel';
        span_one_capital_letter_requirement.style.color = 'black';
    }
    else
    {
        span_one_capital_letter_requirement.innerHTML = 'check_circle';
        span_one_capital_letter_requirement.style.color = 'green';
    }

    if(!has_at_least_one_digit)
    {
        span_one_digit_requirement.innerHTML = 'cancel';
        span_one_digit_requirement.style.color = 'black';
    }
    else
    {
        span_one_digit_requirement.innerHTML = 'check_circle';
        span_one_digit_requirement.style.color = 'green';
    }
};

exports.check_if_has_at_least_one_special_char = check_if_has_at_least_one_special_char;
exports.check_if_has_at_least_eight_chars = check_if_has_at_least_eight_chars;
exports.check_if_has_at_lest_one_capital_letter = check_if_has_at_lest_one_capital_letter;
exports.check_if_has_at_least_one_digit = check_if_has_at_least_one_digit;
exports.validate_password = validate_password;
exports.show_status_of_password = show_status_of_password;