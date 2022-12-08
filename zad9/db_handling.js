// here is section with handling db request
const getUsersResults = () => new Promise((resolve, reject) => 
{
  users_results_from_db = null;

  fetch('https://jsonblob.com/api/jsonBlob/1047673560524668928/',  {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(data => {
    return data.json();
  })
  .catch( err =>
  {
    console.log("error while getting results");
    reject("Error");
  })
  .then(response => {
      users_results_from_db = response.users_results;
      resolve("Good");
  });
});

function bindUsersResults(data)
{
  preloader.style.display = "none";

  data.forEach( (user_result,index) => 
  {
    console.log(index + " " + user_result);

    var user_result_container_div = document.createElement('div');
    user_result_container_div.setAttribute('class', 'user_result flex_center_row');

    var user_position_div= document.createElement('div');
    user_position_div.innerHTML = index + 1;

    var username_div = document.createElement('div');
    username_div.innerHTML = user_result.username;

    var user_points_div = document.createElement('div');
    user_points_div.innerHTML = user_result.points;

    var game_date_div = document.createElement('div');
    game_date_div.innerHTML = convertStampDate(user_result.game_date);

    user_result_container_div.appendChild(user_position_div);
    user_result_container_div.appendChild(username_div);
    user_result_container_div.appendChild(user_points_div);
    user_result_container_div.appendChild(game_date_div);

    users_results_div.appendChild(user_result_container_div);

  });

}

const addUsersResults = () => new Promise((resolve,reject)=>{

  var new_db_record = { users_results: users_results_from_db };

  console.log(JSON.stringify(new_db_record));

  fetch("https://jsonblob.com/api/jsonBlob/1047673560524668928", {
    method: "PUT",
    body: JSON.stringify(new_db_record),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
    })
    .catch(err => {console.log(err);reject("Error");})
    .then(res => res.json())
    .then(res => {
      console.log("Result of user has just been added");
      // console.log(res);
      resolve("Good");
    })
});
