console.log("it is working");

const add_btn = document.getElementById('submit_add_contact');
const added_contacts_container = document.getElementById('added_contacts_container');

let name_and_surname_input = document.getElementById('name_and_surname_input');
let phone_number_input = document.getElementById('phone_number_input');

add_btn.addEventListener('click', (e)=>
{
    e.preventDefault();

    if( validate_inputs(name_and_surname_input.value, phone_number_input.value ))
    {
        create_contact_div(name_and_surname_input.value,phone_number_input.value);
    }
});

const validate_inputs = (name_and_surname, phone_number) =>
{

    var validation_regexp_name = /^(?:[A-Z\u00c0-\u01ff][\u00c0-\u01ffa-z]*[ ]?)(?:[A-Z\u00c0-\u01ff][\u00c0-\u01ffa-z]*[-]?){1,2}$/
    var validation_regexp_phone_longer = /^[\+]?(?:\s*\d){12}$/;
    var validation_regexp_phone = /^(?:\s*\d){9}$/;



    if(!name_and_surname && !phone_number)
    {
        window.alert("Inputs cannot be empty, fill them up!");
        return false;
    }

    if(!validation_regexp_name.test(name_and_surname))
    {
        window.alert("Incorrect name and surname!");
        return false;
    }

    if(!validation_regexp_phone.test(phone_number) && !validation_regexp_phone_longer.test(phone_number))
    {
        window.alert("Incorrect phone number!");
        return false;
    }
    
    return true;
};

const create_contact_div = (name_and_surname, phone_number)=>
{
    var added_contact_div = document.createElement("div");
    added_contact_div.setAttribute('class', 'added_contact block_styling');


    var added_contact_details_div = document.createElement("div");
    added_contact_details_div.setAttribute('class', 'added_contact_details');

    var added_contact_name_div = document.createElement("div");
    added_contact_name_div.setAttribute('class', 'added_contact_name');

    var added_contact_name_h3 = document.createElement("h3");
    added_contact_name_h3.innerHTML = name_and_surname;

    added_contact_name_div.appendChild(added_contact_name_h3);

    var added_contact_phone_div = document.createElement("div");
    added_contact_phone_div.setAttribute('class', 'added_contact_phone');

    var added_contact_phone_h4 = document.createElement("h4");
    added_contact_phone_h4.innerHTML = phone_number;

    added_contact_phone_div.appendChild(added_contact_phone_h4);

    added_contact_details_div.appendChild(added_contact_name_div);
    added_contact_details_div.appendChild(added_contact_phone_div);


    var added_contact_icon_div = document.createElement("div");
    added_contact_icon_div.setAttribute('class', 'addded_contact_icon');
    
    var icon_img = document.createElement("img");
    icon_img.setAttribute('src', 'images/bx-folder-minus (3).svg');
    icon_img.setAttribute('alt', 'remove_icon');

    added_contact_icon_div.appendChild(icon_img);

    added_contact_div.appendChild(added_contact_details_div);
    added_contact_div.appendChild(added_contact_icon_div);

    added_contacts_container.appendChild(added_contact_div);

    added_contact_icon_div.addEventListener('click', (e)=>
    {
        added_contacts_container.removeChild(added_contact_div);
    });

};