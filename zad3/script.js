console.log('It is working !');

const hide_answer_btns = document.getElementsByClassName('extend_answer_icon');
const answers = document.getElementsByClassName('answer');

for(let i=0;i<hide_answer_btns.length; ++i)
{
    hide_answer_btns[i].addEventListener('click', (e)=>
    {
        answers[i].classList.toggle('active');
    });
}


// hide_answer_btns.forEach((btn, index)=> 
// {
//         btn.addEventListener('click', (e)=>
//         {
//             answers[index].classList.toggle('inactive');
//         });
// });

fetch("http://localhost:3000/cities")
    .then((response) => {

        if (response.status !== 200) {
            console.log("są błędy");
        }

        console.log("OK");
        return response.json();
    })
    .then(data=> {appendData(data);})
    .catch((err) => {
        console.log("błąd podczas pobierania danych", err);
        // error msg on the screen
    });


const appendAnswersToFirstTask = (data)=>
{
    let answer_list = document.querySelector('.question_card:nth-child(1) .answer ul');
    const result = data.filter((city)=>{
        return city.province == "małopolskie";
    });

    // console.log(result);

    result.forEach(city => {
        let new_li = document.createElement('li');
        new_li.innerHTML = city.name;
        answer_list.appendChild(new_li);
    });
};

const  appendAnswersToSecondTask = (data) => 
{
    let answer_list = document.querySelector('.question_card:nth-child(2) .answer ul');
    const result = data.filter((city)=>{

        splitted = city.name.toLowerCase().split('a');

        if(splitted.length == 3)
        {
            return true;
        }

        return false;
    });

    console.log(result);

    result.forEach(city => {
        let new_li = document.createElement('li');
        new_li.innerHTML = city.name;
        answer_list.appendChild(new_li);
    });
};

const appendAnswersToThirdTask = (data) =>
{
    let answer_list = document.querySelector('.question_card:nth-child(3) .answer ul');
    const result = data.sort((c1,c2)=> {
        return (c1.density < c2.density) ? 1 : (c1.density > c2.density ? -1 : 0);
    });

    console.log(result);

    fifth_city = result[4];
    let new_li = document.createElement('li');
    new_li.innerHTML = fifth_city.name;
    answer_list.appendChild(new_li);

}

const appendAnswersToFourthTask = (data) =>
{
    let answer_list = document.querySelector('.question_card:nth-child(4) .answer ul');
    const result = data.map(city => 
        {
            if(city.people > 100000)
            {
                city.name += ' city';
            }
            return city;
        });

    console.log(result);

    result.forEach(city => {
        let new_li = document.createElement('li');
        new_li.innerHTML = city.name;
        answer_list.appendChild(new_li);
    });

}

const appendAnswersToFifthTask = (data) =>
{
    let answer_list = document.querySelector('.question_card:nth-child(5) .answer ul');
    above_80000 = 0
    below_80000 = 0

    data.forEach(city => {
        if(city.people > 80000)
        {
            above_80000 += 1;
        }
        else 
        {
            below_80000 += 1;
        }
    });

    let new_li = document.createElement('li');
    new_li.innerHTML = "Więcej niz 80 000 ludzi:   " + above_80000 + " miast";
    answer_list.appendChild(new_li);

    let new_li2 = document.createElement('li');
    new_li2.innerHTML = "Mniej niz 80 000 ludzi:   " + below_80000 + " miast"; 
    answer_list.appendChild(new_li2);
}


const appendAnswersToSixthTask = (data) =>
{
    let answer_list = document.querySelector('.question_card:nth-child(6) .answer ul');
   
   const proper_cities = data.filter( city =>
    {
        if(city.township.toLowerCase().startsWith('p'))
        {
            return true;
        }
        return false;
    }
   );



   const average_area = proper_cities.reduce(
   (accumulator, currentCity) => accumulator + currentCity.area, 0) / proper_cities.length;
    console.log(average_area);

    new_li = document.createElement('li');
    new_li.innerHTML = 'Srednia powierzchnia: ' + average_area.toFixed(2);
    answer_list.appendChild(new_li);
}


const appendAnswersToSeventhTask = (data) =>
{
    let answer_list = document.querySelector('.question_card:nth-child(7) .answer ul');
   
    const cities_from_pomorskie = data.filter( city =>
        {
            if(city.province == 'pomorskie')
            {
                return true;
            }
            return false;
        }
    );
    
    const cites_from_pomorskie_above_5000 = cities_from_pomorskie.filter(city =>
        {
            if(city.people > 5000)
            {
                return true;
            }
            return false;
        });

    condition_result = ( cities_from_pomorskie.length == cites_from_pomorskie_above_5000.length );
    how_many_above_5000 = cites_from_pomorskie_above_5000.length;

    new_li = document.createElement('li');
    new_li.innerHTML = 'Spełnienie warunku: ' + condition_result;
    answer_list.appendChild(new_li);

    new_li2 = document.createElement('li');
    new_li2.innerHTML = 'Ile miast spełniających warunek: ' + how_many_above_5000;
    answer_list.appendChild(new_li2);
}

const appendData = (data)=>
{
    appendAnswersToFirstTask(data);
    appendAnswersToSecondTask(data);
    appendAnswersToThirdTask(data);
    appendAnswersToFourthTask(data);
    appendAnswersToFifthTask(data);
    appendAnswersToSixthTask(data);
    appendAnswersToSeventhTask(data);
}
