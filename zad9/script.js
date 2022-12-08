// handling start form
// documents consts selectors
const submit_username_btn = document.getElementById('submit_username_btn');
const username_input = document.getElementById('username_input');
const start_container = document.getElementById('start_container');
const container = document.getElementById('game_container');
const end_container = document.getElementById('end_container');
const result_username = document.getElementById('result_username');
const start_new_game_btn = document.getElementById('start_new_game_btn');
const body = document.querySelector('body');
const preloader = document.getElementById('load');
const users_results_div = document.getElementById('users_results');

var inputed_username = "";

submit_username_btn.addEventListener('click', (e)=>
{
    e.preventDefault();

    inputed_username = username_input.value;
    result_username.innerHTML = inputed_username;

    showTrailerAndStartGameAfterSeconds(3);
});

// handling cursors and zombies game logic 
const cursor = document.querySelector('.cursor');
const cursorinner = document.querySelector('.cursor2');
const zombie_character = document.getElementsByClassName('zombie')[0];
const results_title = document.getElementById('result_title');

// settings of game
var user_points = 0;
const points_for_good_shooting = 12;
const points_for_not_shooting = 6;
var how_many_zombies_passed = 0;
var was_zombie_created = true;
const dx = 2;
const speed = 1;

var new_zombie_id = 0;
var zombies_intervals_ids = [];
var creation_of_zombie_interval_id = null;

var level = 0;  // we have 3 levels [ 0 , 1 , 2] | [ simple , medium , hard], it is changing after gettting more points
var intervals_levels_creation = [1000, 600, 400];
var intervals_levels_speed = [120, 90, 60];

const breakpoint_in_points_for_medium_level = 500;
const breakpoint_in_points_for_hard_level = 1000;

var users_results_from_db = null;

// arbitrary functions to handle mouse events

function removeEventListenersOnGameContainerAndHideGameCursor()
{
    document.removeEventListener('mousemove', mousemove_cursor);
    
    document.removeEventListener('mousemove', mousemove_innercursor);
    
    document.removeEventListener('mousedown', mouse_down);
    
    document.removeEventListener('mouseup', mouse_up);

    cursor.classList.add('inactive');
    cursorinner.classList.add('inactive');
    body.style.cursor = 'auto';
}

function addEventsListenersOnMouseAndShowGameCursor()
{

    document.addEventListener('mousemove', mousemove_cursor);
    
    document.addEventListener('mousemove', mousemove_innercursor);
    
    document.addEventListener('mousedown', mouse_down);
    
    document.addEventListener('mouseup', mouse_up);

    cursor.classList.remove('inactive');
    cursorinner.classList.remove('inactive');
    body.style.cursor = 'none';
}

// mouse events handlers
function mousemove_cursor(e){
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
}

function mousemove_innercursor(e){
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + 'px';
  cursorinner.style.top = y + 'px';
}

function mouse_down(){
  cursorinner.classList.add('cursorinnerhover')
  user_points -= points_for_not_shooting;
  updateResult();
  animate_result_after_misshot();
}

function mouse_up(){
  cursorinner.classList.remove('cursorinnerhover')
}

// this section is for detecting if zombie (non-transparet part of png was clicked)
var canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d', {willReadFrequently: true});

function updateResult()
{
    results_title.innerHTML = user_points;
}

function animate_result_after_misshot()
{
    results_title.style.color = 'red';
    setTimeout(()=>{results_title.style.color = 'white';}, 300);
}

// here we have handling of shooting to zombie
function zombie_shooting_handler(event)
{
  event.stopPropagation();

  // Get click coordinates
  var x = event.pageX + 5 - this.offsetLeft,
      y = event.pageY + 5 - this.offsetTop,
      w = ctx.canvas.width = this.width,
      h = ctx.canvas.height = this.height,
      alpha;
  
  // console.log(event.pageX);
      
  // Draw image to canvas
  // and read Alpha channel value
  ctx.drawImage(this, 0, 0, w, h);
  alpha = ctx.getImageData(x, y, 1, 1).data[3]; // [0]R [1]G [2]B [3]A

  // If pixel is transparent,
  // retrieve the element underneath and trigger it's click event
  if( alpha===0 ) {
    this.style.pointerEvents = "none";
    document.elementFromPoint(event.clientX, event.clientY).click();
    this.style.pointerEvents = "auto";
    user_points -= points_for_not_shooting;
    console.log("misshot zombie! (-6) ")
    updateResult();
    animate_result_after_misshot();
  } else {
    // here we have handling of shooting zombie 

    console.log("Zombie was shot! (+12)");
    user_points += points_for_good_shooting;
    updateResult();

    clear_zombie_interval(this);
    this.remove();
  }
}

function clear_zombie_interval(zombie)
{
  var zombie_interval_id_index = parseInt(zombie.id);
  clearInterval(zombies_intervals_ids[zombie_interval_id_index]);
}

function check_if_zombie_passed(zombie)
{
  splitted_right = zombie.style.right.split('%');
  actual_position = parseInt(splitted_right[0]);
  // console.log("zombie position" + actual_position);
  
  if(actual_position >= 105)
  {
    how_many_zombies_passed += 1;

    clear_zombie_interval(zombie);
    zombie.remove();
  }

  if( how_many_zombies_passed >= 3 )
  {
    alert("Unfortunately you lost the game! Your result is: " + user_points + " points. Congratulations!");
    end_game();
  }
}

function move_zombie(zombie)
{
  splitted_right = zombie.style.right.split('%');
  new_position = parseInt(splitted_right[0]) + (dx * speed);
  zombie.style.right = new_position + "%";
  check_if_zombie_passed(zombie);
}

function create_zombie()
{
  console.log("new zombie has just been created! Be careful!");
  var random_y_position = getRandomFloat(0, 40, 0);
  var random_size_of_zombie = getRandomFloat(0.2, 0.4, 2) * 100; // we need %

  var new_zombie = document.createElement('img');
  new_zombie.setAttribute('src', 'images/zombie.png');
  new_zombie.setAttribute('alt', 'Zombie img');
  new_zombie.setAttribute('id', new_zombie_id);
  new_zombie.style.position = 'absolute';
  new_zombie.style.right = '-10%';
  new_zombie.style.bottom = random_y_position + "%";
  new_zombie.style.width = `${random_size_of_zombie}%`;
  new_zombie.style.height = `${random_size_of_zombie*1.5}%`;

  new_zombie_id += 1;

  container.appendChild(new_zombie);
  new_zombie.onmousedown = zombie_shooting_handler;
  was_zombie_created = true;

  const random_speed_movement = getRandomFloat(0.55, 1, 2);
  var zombie_speed = random_speed_movement * intervals_levels_speed[level];
  var zombie_interval_id = setInterval(()=>{move_zombie(new_zombie);}, zombie_speed);
  zombies_intervals_ids.push(zombie_interval_id);

  check_how_many_points_and_change_level();
}

function restart_game_points()
{
  user_points = 0;
  updateResult();
}

function clear_left_zombies_after_end()
{
  var left_images = document.querySelectorAll('#game_container img');

  left_images.forEach((zombie_img) =>
  {
    zombie_img.remove();
  });
}

function clear_zombies_data()
{
  zombies_intervals_ids = [];
  new_zombie_id = 0;
  how_many_zombies_passed = 0;
}

function check_how_many_points_and_change_level()
{
  if(user_points >= breakpoint_in_points_for_hard_level && level != 2)
  {
    level = 2;
    create_zombie_with_new_random_time();
    console.log("level was changed!");
  }
  else if(user_points >= breakpoint_in_points_for_medium_level && level != 1)
  {
    level = 1;
    create_zombie_with_new_random_time();
    console.log("level was changed!");
  }
}

function create_zombie_with_new_random_time()
{
  clearInterval(creation_of_zombie_interval_id);

  var random_time_of_creation = getRandomFloat(1, 1.4, 2);
  var delay_of_creation = intervals_levels_creation[level] * random_time_of_creation;
    
  creation_of_zombie_interval_id = setInterval(()=>
        {
          create_zombie();
        }, delay_of_creation);
}

// this is implementation of countdown before the game starts

var countdown_interval_id = null;
const countdown_title = document.getElementById('countdown_time_in_second');
const trailer_container = document.getElementById('trailer_container');

const countdown = (event_date) =>
{
  const now = new Date().getTime();
  const gap = event_date.getTime() - now;

  // in milliseconds convertion
  const second = 1000;
  const minute = second * 60;
  
  const textSecond = Math.ceil((gap % minute) / second);
  countdown_title.innerHTML = textSecond + "...";;
  console.log("seconds_left " + textSecond);
  
  if(gap < 0)
  {
    // we start the game;
    console.log("The game starts!!!");
    clearInterval(countdown_interval_id);
    countdown_interval_id = null;

    addEventsListenersOnMouseAndShowGameCursor();
    start_game();

    trailer_container.classList.add('inactive');
    container.classList.remove('inactive');
  }
}

const showTrailerAndStartGameAfterSeconds = (seconds_to_start)=>
{
    trailer_container.classList.remove('inactive');
    start_container.classList.add('inactive');

    const coundDate = new Date();
    console.log("The game will start at: " + coundDate);
    coundDate.setSeconds(coundDate.getSeconds() + seconds_to_start );
    countdown_title.innerHTML = seconds_to_start + "...";
    countdown_title.style.animation = "blink 1s ease-in-out infinite";

    countdown_interval_id = setInterval(()=>{countdown(coundDate);}, 1000);
};

// this is core funtion to handle game

function start_game()
{
    var random_time_of_creation = getRandomFloat(1, 1.4, 2);
    var delay_of_creation = intervals_levels_creation[level] * random_time_of_creation;
    
    creation_of_zombie_interval_id = setInterval(()=>
        {
          create_zombie();
        }, delay_of_creation);
}

start_new_game_btn.addEventListener('click', (e)=>
{
  users_results_div.innerHTML = '';

  end_container.classList.add('inactive');
  container.classList.add('inactive');

  cursor.classList.add('inactive');
  cursorinner.classList.add('inactive');

  // we reset user results if we have sth from previous game

  showTrailerAndStartGameAfterSeconds(3);
});

function restore_default_settings_of_game()
{
  clear_all_intervals();
  removeEventListenersOnGameContainerAndHideGameCursor();

  clear_left_zombies_after_end();
  clear_zombies_data();

  clearInterval(creation_of_zombie_interval_id);
  level = 0;
}

function end_game()
{
  container.classList.add('inactive');
  end_container.classList.remove('inactive');

  restore_default_settings_of_game();
  
  console.log("your result is: " + user_points);

  // we display preloader when we get data

  preloader.style.display = "block";

  // here we want to store results in db, and then read, sorted dynamically binding them in js

  getUsersResults().then(()=>
  {
    console.log("results in variable: ");
    var new_db_record = {points : user_points, username : inputed_username, game_date : Date.now()};
    users_results_from_db.push(new_db_record);

    users_results_from_db = users_results_from_db.sort(
      (ur1, ur2) => (ur1.points < ur2.points) ? 1 : (ur1.points > ur2.points) ? -1 : 0);

    if(users_results_from_db.length >= 7)
    {
      users_results_from_db = users_results_from_db.slice(0, 7);  // we always store 7 top results in db
    }

    // biind with setTimeout, because want to show effect of preloader, this is simulation of realistic db actions
    setTimeout(()=>{bindUsersResults(users_results_from_db);}, 1000);

    restart_game_points();

  }).then(()=>{ addUsersResults();});

}


