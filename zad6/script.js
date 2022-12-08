console.log(countries);

const main_content = document.querySelector('main');
const selected_btn_title = document.getElementById('selected_btn_title');
const top_ten_famous_languages_btn = document.getElementById('most_famous_languages_btn');
const top_ten_least_famous_languages_btn = document.getElementById('least_famous_languages_btn');
const top_ten_most_famous_currencies_btn = document.getElementById('most_famous_currencies_names_btn');

// section we get most and least famous languages 

var dict_language_and_people = {};
var dict_language_and_countries = {};

const how_many_people = countries.reduce(
    (accumulator, country) => accumulator + country.population, 0);

countries.forEach(country =>
    {
        country.languages.forEach( language => {
            if(dict_language_and_people[language] == null)
            {
                dict_language_and_people[language] = 0;
                dict_language_and_countries[language] = 0;
            }
               
            dict_language_and_people[language] += country.population;
            dict_language_and_countries[language] += 1;
            
        });
    });
      
// Step - 1
// Create the array of key-value pairs
var items_desc = Object.keys(dict_language_and_people).map(
    (key) => { return [key, dict_language_and_people[key], dict_language_and_countries[key]] });
  
  // Step - 2
  // Sort the array based on the second element (i.e. the value)
  items_desc.sort(
    (first, second) => { return second[1] - first[1]}
  );

var items_asc = Object.keys(dict_language_and_people).map(
    (key) => { return [key, dict_language_and_people[key], dict_language_and_countries[key]] });
  
  // Step - 2
  // Sort the array based on the second element (i.e. the value)
items_asc.sort(
    (first, second) => { return first[1] - second[1];});

// Create a new array with only the first 5 items
let top_ten_famous_languages = items_desc.slice(0, 10);
let top_ten_least_famous_languages = items_asc.slice(0,10);

console.log("top ten least famous languages: ");
console.log(items_desc);

console.log("all people: " + how_many_people);

console.log('top ten most famous languages: ');
console.log(items_asc);


// section we get most famous currencies names

var dict_currency_and_people = {};
var dict_currency_and_countries = {};

countries.forEach(country =>
    {
        splitted_currency = country.currency.split(' ');
        main_part_of_currency_name = splitted_currency[splitted_currency.length - 1].toLowerCase();
        
        if(dict_currency_and_people[main_part_of_currency_name] == null)
        {
            dict_currency_and_people[main_part_of_currency_name] = 0;
            dict_currency_and_countries[main_part_of_currency_name] = 0;
        }

        dict_currency_and_people[main_part_of_currency_name] += country.population;
        dict_currency_and_countries[main_part_of_currency_name] += 1;
    });

var currency_desc = Object.keys(dict_currency_and_people).map(
    (key) => { return [key, dict_currency_and_people[key], dict_currency_and_countries[key]] });
  
  // Step - 2
  // Sort the array based on the second element (i.e. the value)
  currency_desc.sort(
    (first, second) => { return second[1] - first[1]}
  );

console.log("currency and people and countries using it: ");
console.log(currency_desc);

let top_ten_famous_currencies = currency_desc.slice(0, 10);

const clear_main_content = () =>
{
    main_content.innerHTML = '';
}

const bind_most_famous_languages = () =>
{
    selected_btn_title.innerHTML = '10 Most Famous Languages in the world';

    top_ten_famous_languages.forEach(language => 
        {
            let language_ratio = ( language[1] / how_many_people ).toFixed(2) * 100;
            // console.log(language_ratio);
            
            let statistics_div = document.createElement('div');
            statistics_div.setAttribute('class', 'statistics');
        
            let name_div = document.createElement('div');
            name_div.setAttribute('class', 'name');
        
            let h4_name = document.createElement('h4');
            h4_name.innerHTML = language[0];
            name_div.appendChild(h4_name);
        
            let chart_wrapper_div = document.createElement('div');
            chart_wrapper_div.setAttribute('class', 'chart_wrapper');
        
            let chart_div = document.createElement('div');
            chart_div.setAttribute('class', 'chart');
            chart_div.innerHTML = '&nbsp;';
            chart_div.style.width = language_ratio + "%";
            chart_wrapper_div.appendChild(chart_div);

            let full_available_chart_value_div = document.createElement('div');
            full_available_chart_value_div.setAttribute('class', 'full_available_chart_value');
            full_available_chart_value_div.innerHTML = '&nbsp;';
            chart_wrapper_div.appendChild(full_available_chart_value_div);
        
            let numbers_div = document.createElement('div');
            numbers_div.setAttribute('class', 'numbers');
            numbers_div.innerHTML = language[2];
        
            statistics_div.appendChild(name_div);
            statistics_div.appendChild(chart_wrapper_div);
            statistics_div.appendChild(numbers_div);
        
            main_content.appendChild(statistics_div);
        });

};

const bind_least_famous_languages = () =>
{
    selected_btn_title.innerHTML = '10 Least Famous Languages in the world';

    top_ten_least_famous_languages.forEach(language => 
        {
            let language_ratio = ( language[1] / how_many_people ).toFixed(2) * 100;
            // console.log(language_ratio);
            
            let statistics_div = document.createElement('div');
            statistics_div.setAttribute('class', 'statistics');
        
            let name_div = document.createElement('div');
            name_div.setAttribute('class', 'name');
        
            let h4_name = document.createElement('h4');
            h4_name.innerHTML = language[0];
            name_div.appendChild(h4_name);
        
            let chart_wrapper_div = document.createElement('div');
            chart_wrapper_div.setAttribute('class', 'chart_wrapper');
        
            let chart_div = document.createElement('div');
            chart_div.setAttribute('class', 'chart');
            chart_div.innerHTML = '&nbsp;';
            chart_div.style.width = language_ratio + "%";
            chart_wrapper_div.appendChild(chart_div);

            let full_available_chart_value_div = document.createElement('div');
            full_available_chart_value_div.setAttribute('class', 'full_available_chart_value');
            full_available_chart_value_div.innerHTML = '&nbsp;';
            chart_wrapper_div.appendChild(full_available_chart_value_div);
        
            let numbers_div = document.createElement('div');
            numbers_div.setAttribute('class', 'numbers');
            numbers_div.innerHTML = language[2];
        
            statistics_div.appendChild(name_div);
            statistics_div.appendChild(chart_wrapper_div);
            statistics_div.appendChild(numbers_div);
        
            main_content.appendChild(statistics_div);
        });

};

const bind_most_famous_currencies_names = () =>
{
    selected_btn_title.innerHTML = '10 Most Famous Currencies in the world';

    top_ten_famous_currencies.forEach(currency => 
        {
            let currency_ratio = ( currency[1] / how_many_people ).toFixed(2) * 100;
            // console.log(language_ratio);
            
            let statistics_div = document.createElement('div');
            statistics_div.setAttribute('class', 'statistics');
        
            let name_div = document.createElement('div');
            name_div.setAttribute('class', 'name');
        
            let h4_name = document.createElement('h4');
            h4_name.innerHTML = currency[0];
            name_div.appendChild(h4_name);
        
            let chart_wrapper_div = document.createElement('div');
            chart_wrapper_div.setAttribute('class', 'chart_wrapper');
        
            let chart_div = document.createElement('div');
            chart_div.setAttribute('class', 'chart');
            chart_div.innerHTML = '&nbsp;';
            chart_div.style.width = currency_ratio + "%";
            chart_wrapper_div.appendChild(chart_div);

            let full_available_chart_value_div = document.createElement('div');
            full_available_chart_value_div.setAttribute('class', 'full_available_chart_value');
            full_available_chart_value_div.innerHTML = '&nbsp;';
            chart_wrapper_div.appendChild(full_available_chart_value_div);
        
            let numbers_div = document.createElement('div');
            numbers_div.setAttribute('class', 'numbers');
            numbers_div.innerHTML = currency[2];
        
            statistics_div.appendChild(name_div);
            statistics_div.appendChild(chart_wrapper_div);
            statistics_div.appendChild(numbers_div);
        
            main_content.appendChild(statistics_div);
        });
};

// this is default
bind_most_famous_languages();

top_ten_famous_languages_btn.addEventListener('click', (e) => 
{
    e.preventDefault();
    clear_main_content();
    bind_most_famous_languages();
});

top_ten_least_famous_languages_btn.addEventListener('click', (e) => 
{
    e.preventDefault();
    clear_main_content();
    bind_least_famous_languages();
});

top_ten_most_famous_currencies_btn.addEventListener('click', (e)=>
{
    e.preventDefault();
    clear_main_content();
    bind_most_famous_currencies_names();
});
