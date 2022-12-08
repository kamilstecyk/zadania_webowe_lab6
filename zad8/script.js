var categories = [];
var productsA = [];
var productsB = [];

var products_object = [];

var productsObjectsArray = [];

const opened_li_icon_src = 'bxs-right-arrow.svg';
const closed_li_icon_src = 'bxs-down-arrow.svg';

const menu_container = document.getElementById('menu');

const fetchAllData = () => new Promise((resolve,reject) =>
{
    var how_many_datas_fetched = 0;

    fetch("categories.json")
    .then((response) => {

        if (response.status !== 200) {
            console.log("są błędy");
        }

        console.log("OK");
        return response.json();
    })
    .then(data=> {console.log(data);categories = data;how_many_datas_fetched += 1;
        if(how_many_datas_fetched == 3)
        {
            resolve("All Data fetched good");
        }
    })
    .catch((err) => {
        console.log("błąd podczas pobierania danych", err);
        // error msg on the screen
        reject("Error while fetching categories.json")
    })

    fetch("productsA.json")
    .then((response) => {

        if (response.status !== 200) {
            console.log("są błędy");
        }

        console.log("OK");
        return response.json();
    })
    .then(data=> {console.log(data);productsA = data;how_many_datas_fetched += 1;
        if(how_many_datas_fetched == 3)
        {
            resolve("All Data fetched good");
        }
    })
    .catch((err) => {
        console.log("błąd podczas pobierania danych", err);
        // error msg on the screen
        reject("Error while fetching productsA.json")

    });

    fetch("productsB.json")
    .then((response) => {

        if (response.status !== 200) {
            console.log("są błędy");
        }

        console.log("OK");
        return response.json();
    })
    .then(data=> {console.log(data);productsB = data;how_many_datas_fetched += 1;
        if(how_many_datas_fetched == 3)
        {
            resolve("All Data fetched good");
        }
    })
    .catch((err) => {
        console.log("błąd podczas pobierania danych", err);
        // error msg on the screen
        reject("Error while fetching productsB.json")

    });


});


fetchAllData().then(()=>{
    console.log("All fetched");
    
    productsA.produkty.forEach(products => {
        // console.log(products);
        category_name = Object.keys(products)[0];

        // we get first attribute
        products_array = Object.values(products)[0];

        products_array.forEach((product,index)=>
        {
            type_name = Object.keys(product)[0];
            product_value = Object.values(product)[0];

            // var product_object = { category : category_name, type : type_name, value : product_value };
            // products_object.push(product_object);

            if(products_object[category_name] == null)
            {
                products_object[category_name] = [{type : type_name, value : product_value}];
            }
            else
            {
                products_object[category_name].push({type : type_name, value : product_value});  
            }
        });

    });

    productsB.produkty.forEach(products => {
        category_name = Object.keys(products)[0];

        // we get first attribute
        products_array = Object.values(products)[0];

        products_array.forEach((product,index)=>
        {
            type_name = Object.keys(product)[0];
            product_value = Object.values(product)[0];

            // var product_object = { category : category_name, type : type_name, value : product_value };
            // // products_object.push(product_object);


            if(products_object[category_name] == null)
            {
                products_object[category_name] = [{type : type_name, value : product_value}];
            }
            else
            {
                products_object[category_name].push({type : type_name, value : product_value});  
            }

        });

    });

    // we need to sort by category objects

    console.log(products_object);

    for (const [key, value] of Object.entries(products_object)) {
        // console.log(key, value);

        // key is category name , and value has items for this category

        var item_div = document.createElement('div');
        item_div.setAttribute('class', "menu_item");

        var ul_outer = document.createElement('ul');
        ul_outer.setAttribute('class', 'non_decorated');

        var li_category = document.createElement('li');
        li_category.setAttribute('class', 'li_items');

        var li_items_div = document.createElement('div');
        li_items_div.setAttribute('class', 'li_outer');

        var li_icons_outer = document.createElement('div');
        li_icons_outer.setAttribute('class', 'li_icons');

        var li_icons_outer_img = document.createElement('img');
        li_icons_outer_img.setAttribute('src', 'bxs-right-arrow.svg');
        li_icons_outer_img.setAttribute('alt', 'arrow down icon');
        li_icons_outer_img.setAttribute('class', 'extend_list_icon');

        li_icons_outer_img.addEventListener('click', (e)=>
        {
            e.target.classList.toggle('opened_icon');

            var subcategory_list = e.target.parentNode.parentNode.nextSibling;
        
            if( e.target.classList.contains('opened_icon') )
            {
                subcategory_list.classList.add('active_list');
            }
            else
            {
                subcategory_list.classList.remove('active_list');
            }
        });

        var li_icons_outer_checkbox = document.createElement('input');
        li_icons_outer_checkbox.setAttribute('type', 'checkbox');

        li_icons_outer_checkbox.addEventListener('click', (e)=>
        {
            const subcategories = e.target.parentNode.parentNode.nextSibling;
            const subcategories_inputs = subcategories.querySelectorAll('input');

            subcategories_inputs.forEach(input =>
                {
                    input.checked = e.target.checked;
                });

            updateMainSectionWithProducts();
        });

        var li_icons_outer_category_name_div = document.createElement('div');
        li_icons_outer_category_name_div.innerHTML = key;

        item_div.appendChild(ul_outer);
        ul_outer.appendChild(li_category);
        li_category.appendChild(li_items_div);
        li_items_div.appendChild(li_icons_outer);
        li_icons_outer.appendChild(li_icons_outer_img);
        li_icons_outer.appendChild(li_icons_outer_checkbox);
        li_items_div.appendChild(li_icons_outer_category_name_div);

        var ul_inner = document.createElement('ul');
        ul_inner.setAttribute('class', 'non_decorated list_inner');

        var only_unique_subcagegories = []

        value.forEach(product => 
            {
                // console.log(product);

                if(!only_unique_subcagegories.includes(product.type))
                {
                    only_unique_subcagegories.push(product.type);

                    var li_item_inner = document.createElement('li');
                    li_item_inner.setAttribute('class', 'li_item_inner');

                    var li_icons_inner = document.createElement('div');
                    li_icons_inner.setAttribute('class', 'li_icons');

                    var item_inner_checkbox = document.createElement('input');
                    item_inner_checkbox.setAttribute('type', 'checkbox');
                    item_inner_checkbox.setAttribute('class', 'subcategory_input');

                    item_inner_checkbox.addEventListener('click', (e)=>
                    {

                        const ul = e.target.parentNode.parentNode.parentNode;
                        const subcategory_checkboxes_all = ul.querySelectorAll('input');
                        const subcategory_checkboxes_checked = ul.querySelectorAll('input:checked');

                        const div_category_outer =  ul.previousSibling;
                        const category_input = div_category_outer.querySelector('input');

                        if(subcategory_checkboxes_all.length == subcategory_checkboxes_checked.length)
                        {
                            category_input.checked = true;
                        }
                        else
                        {
                            category_input.checked = false;
                        }

                        updateMainSectionWithProducts();
                    });

                    var item_inner_subcategory_div = document.createElement('div');
                    item_inner_subcategory_div.innerHTML = product.type;

                    ul_inner.appendChild(li_item_inner);
                    li_item_inner.appendChild(li_icons_inner);
                    li_item_inner.appendChild(item_inner_subcategory_div);

                    li_icons_inner.appendChild(item_inner_checkbox);
                }

            });
        
        li_category.appendChild(ul_inner);
        
        menu_container.appendChild(item_div);

      }

});

const getArrayOfCheckedSubCategories = () =>
{
    const subcategory_inputs = document.querySelectorAll('.subcategory_input:checked');
    let subcategories = [];

    subcategory_inputs.forEach(input =>
    {
        const subcategory_name = input.parentNode.nextSibling.innerHTML;
        subcategories.push(subcategory_name);
    });

    return subcategories;
};  

const updateMainSectionWithProducts = () =>
{
    const menu_item_list = document.getElementById('menu_item_list');
    const subcategories_checked = getArrayOfCheckedSubCategories();
    let list_of_products = [];

    menu_item_list.innerHTML = '';

    for (const [key, value] of Object.entries(products_object))
    {

        value.forEach(product => 
        {
             if(subcategories_checked.includes(product.type) && !list_of_products.includes(product.value))
             {
                list_of_products.push(product.value);

                let li_item = document.createElement('li');
                li_item.innerHTML = product.value;
                menu_item_list.appendChild(li_item);
             }
        });
    }

};