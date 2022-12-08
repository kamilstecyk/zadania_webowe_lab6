console.log("It is working..");

employees = [
    {src : 'images/employee1.jpg', worker_name : 'SUSAN DOE', worker_post : 'Java Developer', worker_desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, repellendus repudiandae explicabo quas labore dolorem. Illum aspernatur, maxime, commodi modi nobis consectetur tempora exercitationem error corporis autem sit laboriosam soluta.'} ,
    {src : 'images/employee2.jpg', worker_name : 'ALAN AKBAR', worker_post : 'Tester', worker_desc : 'Illum aspernatur, maxime, commodi modi nobis consectetur tempora exercitationem error corporis autem sit laboriosam soluta.'}, 
    {src : 'images/employee3.jpg', worker_name : 'ZOE SMITH', worker_post : 'Android Developer', worker_desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, repellendus repudiandae explicabo quas labore dolorem. Illum aspernatur, maxime, commodi modi nobis consectetur tempora exercitationem error corporis autem sit laboriosam soluta.'},
    {src : 'images/employee4.jpg', worker_name : 'JOSEPH DOEMN', worker_post : 'Devops', worker_desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
    {src : 'images/employee5.jpg', worker_name : 'JACK SMILE', worker_post : 'Proeject Manager', worker_desc : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, repellendus repudiandae explicabo quas labore dolorem. Illum aspernatur, maxime.'},
    {src : 'images/employee6.jpg', worker_name : 'SUSIE HACKIJE', worker_post : 'Tester', worker_desc : 'Repellat, repellendus repudiandae explicabo quas labore dolorem.  Consectetur tempora exercitationem error corporis autem sit laboriosam soluta.'}
];

const prev_slide_btn = document.getElementById('left_arrow');
const next_slide_btn = document.getElementById('right_arrow');
const random_employee_btn = document.getElementById('random_employee_btn');

const slider_employee_photo = document.getElementById('slider_employee_photo');
const slider_employee_name = document.getElementById('slider_employee_name');
const slider_employee_post = document.getElementById('slider_employee_post');
const slider_employee_desc = document.getElementById('slider_employee_desc');
const slider_content = document.getElementById('slider_content');

let current_index_in_slider = 0;
var was_animation_finished = false;

const handle_disallow_click_while_out_of_range_slider = ()=>
{
    if(current_index_in_slider == 0)
    {
        prev_slide_btn.style.pointerEvents = "none";
    }
    else
    {
        prev_slide_btn.style.pointerEvents = "all";
    }

    if(current_index_in_slider == (employees.length - 1))
    {
        next_slide_btn.style.pointerEvents = "none";
    }
    else
    {
        next_slide_btn.style.pointerEvents = "all";
    }
}

const change_content_of_slider = (duration, delay)=>
{
    person_to_display = employees[current_index_in_slider];
    slider_employee_photo.setAttribute('src', person_to_display.src);
    slider_employee_name.innerHTML = person_to_display.worker_name;
    slider_employee_post.innerHTML = person_to_display.worker_post;
    slider_employee_desc.innerHTML = person_to_display.worker_desc;
    was_animation_finished = false;

    if(delay == 0)
    {
        slider_content.style.animation = 'change_slide ' + duration + 's ' +'ease-out';
    }
    else
    {
        slider_content.style.animation = 'change_slide ' + duration + 's ' +'ease-out ' + delay + ' 1s';
    }

    setTimeout(()=>{
        slider_content.style.animation = 'none';

        prev_slide_btn.addEventListener('click', handle_prev_click);
        next_slide_btn.addEventListener('click', handle_next_click);
        was_animation_finished = true;
    }
        , (duration * 1000) + delay);
};


const change_content_of_slide_for_animation = (duration, index_of_person)=>
{
    person_to_display = employees[index_of_person];
    slider_employee_photo.setAttribute('src', person_to_display.src);
    slider_employee_name.innerHTML = person_to_display.worker_name;
    slider_employee_post.innerHTML = person_to_display.worker_post;
    slider_employee_desc.innerHTML = person_to_display.worker_desc;
    was_animation_finished = false;

    slider_content.style.animation = 'change_slide ' + duration + 's ' +'ease-out';
   
    setTimeout(()=>{
        slider_content.style.animation = 'none';
    }
        , (duration * 1000));
};

const handle_prev_click = (e) =>
{
    current_index_in_slider -= 1;
    if(current_index_in_slider < 0)
    {
        current_index_in_slider = 0;
    }
    change_content_of_slider(0.3, 0);

    // we remove click listener in order to finish animation
    prev_slide_btn.removeEventListener('click', handle_prev_click );

    handle_disallow_click_while_out_of_range_slider();
};

const handle_next_click = (e) =>
{
    current_index_in_slider += 1;
    if(current_index_in_slider >= employees.length)
    {
        current_index_in_slider = (employees.length - 1);
    }
    change_content_of_slider(0.3, 0);

    // we remove click listener in order to finish animation
    next_slide_btn.removeEventListener('click', handle_next_click );

    handle_disallow_click_while_out_of_range_slider();
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const handle_random_employee_btn = (e)=>
{   
    prev_slide_btn.removeEventListener('click', handle_prev_click );
    next_slide_btn.removeEventListener('click', handle_next_click );

    current_index_in_slider = 0;
    const random_employee_index = getRandomInt(0, (employees.length-1));
    animation_time = 0.25;

    delay = 0;
    for(let i=0;i<random_employee_index;++i)
    {
        current_index_in_slider = i;

        setTimeout(()=>{change_content_of_slide_for_animation(animation_time, i);
        }, (delay*1100));

        delay += animation_time;
    }

    current_index_in_slider = random_employee_index;
    setTimeout(()=>{change_content_of_slide_for_animation(animation_time, current_index_in_slider)
        }, delay*1100);
    console.log("Random index person: " + random_employee_index);

    prev_slide_btn.addEventListener('click', handle_prev_click);
    next_slide_btn.addEventListener('click', handle_next_click);
};

prev_slide_btn.addEventListener('click', handle_prev_click);
next_slide_btn.addEventListener('click', handle_next_click);
random_employee_btn.addEventListener('click', handle_random_employee_btn);
