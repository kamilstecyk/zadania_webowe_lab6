console.log("It is working!");

counter = 0;
are_logs_visible = true;
is_set_propagation = true;

const circle_1 = document.getElementById('circle1');
const circle_2 = document.getElementById('circle2');
const circle_3 = document.getElementById('circle3');
const counter_value = document.getElementById('counter_value');
const logs_container = document.getElementById('logs');
const logs_btn = document.getElementById('log_btn');

const start_stop_propagation_btn = document.getElementById('start_stop_propagation_btn');
const reset_btn = document.getElementById('reset_btn');
const change_sequence_btn = document.getElementById('change_sequence_btn');


const update_counter = () =>
{
    counter_value.innerHTML = counter;
};

const add_log = (log_value) =>
{
    var new_log = document.createElement('p');
    new_log.innerHTML = log_value;

    logs_container.appendChild(new_log);
};

const handle_circle_1_click = (e) => 
{
    
    
    if(!is_set_propagation)
    {
        e.stopPropagation();
    }

    console.log("You pressed gray circle 1 with value: 1")
    counter += 1;
    update_counter();
    add_log("You pressed gray circle 1 with value: 1");
    handle_points();
};

const handle_circle_2_click = (e) => 
{
    if(!is_set_propagation)
    {
        e.stopPropagation();
    }

    console.log("You pressed red circle 2 with value: 2")
    counter += 2;
    update_counter();
    add_log("You pressed red circle 2 with value: 2");
    handle_points();
};

const handle_circle_3_click = (e) => 
{
    if(!is_set_propagation)
    {
        e.stopPropagation();
    }

    console.log("You pressed yellow circle 3 with value: 5")
    counter += 5;
    update_counter();
    add_log("You pressed yellow circle 3 with value: 5");
    handle_points();
};

const handle_logs_btn = (e) => 
{
    are_logs_visible = !are_logs_visible;
    if(are_logs_visible)
    {
        logs_container.style.visibility = 'visible';
    }
    else 
    {
        logs_container.style.visibility = 'hidden';
    }
};

const handle_points = ()=>
{
    if(counter > 30)
    {
        circle_2.removeEventListener('click', handle_circle_2_click);
    }
    
    if(counter > 50)
    {
        circle_3.removeEventListener('click', handle_circle_3_click);
    }
}

const reset_events_handlers = ()=>
{
    circle_1.removeEventListener('click', handle_circle_1_click);
    circle_2.removeEventListener('click', handle_circle_2_click);
    circle_3.removeEventListener('click', handle_circle_3_click);

    circle_1.addEventListener('click', handle_circle_1_click);
    circle_2.addEventListener('click', handle_circle_2_click);
    circle_3.addEventListener('click', handle_circle_3_click);
};


circle_1.addEventListener('click', handle_circle_1_click);
circle_2.addEventListener('click', handle_circle_2_click);
circle_3.addEventListener('click', handle_circle_3_click);

logs_btn.addEventListener('click', handle_logs_btn);

reset_btn.addEventListener('click', (e)=>
{
    location.reload();
});

start_stop_propagation_btn.addEventListener('click', (e)=>
{
    is_set_propagation = !is_set_propagation;

    if(is_set_propagation)
    {
        add_log("Propagation is on");
    }
    else 
    {
        add_log("Propagation is off");
    }

    reset_events_handlers();
});
