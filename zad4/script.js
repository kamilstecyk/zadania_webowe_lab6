console.log("It is working!");

const new_password_input = document.getElementById('new_password_input');
const repeat_password_input = document.getElementById('repeat_password_input');

const span_8_chars_requirement = document.getElementById('characters_requirement');
const span_one_special_char_requirement = document.getElementById('one_special_character_requirement');
const span_one_capital_letter_requirement = document.getElementById('one_capital_letter_requirement');
const span_one_digit_requirement = document.getElementById('one_digit_requirement');

const hide_new_password_input = document.getElementById('hide_new_password_icon');
const hide_repeat_password_input= document.getElementById('hide_repeat_password_icon');

let is_hidden_new_password = true;
let is_hidden_repeat_password = true;
let are_passwords_the_same = true;

hide_new_password_input.addEventListener('click', (e)=>
{
    is_hidden_new_password = !is_hidden_new_password;
    if(is_hidden_new_password)
    {
        new_password_input.setAttribute('type', 'password');
        hide_new_password_input.setAttribute('src', 'bxs-bullseye.svg');
    }
    else
    {
        new_password_input.setAttribute('type', 'text');
        hide_new_password_input.setAttribute('src', 'bx-low-vision.svg');
    }
});

hide_repeat_password_input.addEventListener('click', (e)=>
{
    is_hidden_repeat_password = !is_hidden_repeat_password;
    if(is_hidden_repeat_password)
    {
        repeat_password_input.setAttribute('type', 'password');
        hide_repeat_password_input.setAttribute('src', 'bxs-bullseye.svg');
    }
    else
    {
        repeat_password_input.setAttribute('type', 'text');
        hide_repeat_password_input.setAttribute('src', 'bx-low-vision.svg');
    }
});

new_password_input.addEventListener('input', (e)=>
{
    validate_password(new_password_input.value);
});


repeat_password_input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        if(new_password_input.value === repeat_password_input.value)
        {
            are_passwords_the_same = true;
        }
        else
        {
            are_passwords_the_same = false;
            alert("Passwords are not the same, you have to correct them!");
        }
    }
});

const validate_password = (text) => 
{

    if(!check_if_has_at_least_eight_chars(text))
    {
        span_8_chars_requirement.innerHTML = 'cancel';
        span_8_chars_requirement.style.color = 'black';
    }
    else 
    {
        span_8_chars_requirement.innerHTML = 'check_circle';
        span_8_chars_requirement.style.color = 'green';
    }

    if(!check_if_has_at_least_one_special_char(text))
    {
        span_one_special_char_requirement.innerHTML = 'cancel';
        span_one_special_char_requirement.style.color = 'black';
    }
    else
    {
        span_one_special_char_requirement.innerHTML = 'check_circle';
        span_one_special_char_requirement.style.color = 'green';
    }

    if(!check_if_has_at_lest_one_capital_letter(text))
    {
        span_one_capital_letter_requirement.innerHTML = 'cancel';
        span_one_capital_letter_requirement.style.color = 'black';
    }
    else
    {
        span_one_capital_letter_requirement.innerHTML = 'check_circle';
        span_one_capital_letter_requirement.style.color = 'green';
    }

    if(!check_if_has_at_least_one_digit(text))
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