// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn_first_photo = document.getElementById('open_modal_first_photo');
var btn_second_photo = document.getElementById('open_modal_second_photo');
var btn_third_photo = document.getElementById('open_modal_third_photo');

photos_srcs = ['images/img1-medium.jpg', 'images/img2-medium.jpg', 'images/img3-medium.jpg'];
btns = [btn_first_photo, btn_second_photo, btn_third_photo];

// Get modal-content photo

var content_modal_img = document.getElementById('modal_content_photo');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

btns.forEach( (btn,index) => {

    btn.addEventListener('click', (e)=>
    {
        modal.style.display = "block";
        content_modal_img.setAttribute('src', photos_srcs[index]);
    });

});
