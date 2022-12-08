
// arbitrary function to dates
function convertStampDate(unixtimestamp){
    // Months array
    var months_arr = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    
    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp);
    
    // Year
    var year = date.getFullYear();
    
    // Month
    var month = months_arr[date.getMonth()];
    
    // Day
    var day = date.getDate();
    
    // Hours
    var hours = "";
  
    if(date.getHours() < 10)
    {
      hours = "0";
    }
  
    hours += date.getHours();
  
    // Minutes
  
    var minutes = "";
  
    if(date.getMinutes() < 10)
    {
      minutes = "0";
    }
  
    minutes += date.getMinutes();
    
    // Display date time in MM-dd-yyyy h:m format
    var fulldate = day + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes;
    
    return fulldate;
  }

  function clear_all_intervals()
  {
    // Get a reference to the last interval + 1
    const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
  
    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
  }


function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
  }

  