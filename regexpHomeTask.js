

var addresses = require('./addresses');

var result = [];

// ... some good code ...
for(elem in addresses){
    var addres = addresses[elem].trim(); //забрати пробліли на початку та в кінці

    if(/ул.?|пр-т.?|пл.?|пер.?/.test(addres)){
        addres =addres.replace((/ул.?|пр-т.?|пл.?|пер.?/), '').trim();
    }

    // next step
    var element = {};
    addres = addres.trim();

    var street = addres.match(/[^,]+/)[0],
        streetWithNumber = street.split(" ");

    if(streetWithNumber.length == 2 && streetWithNumber[1].search((/[А-я]/g))) {
        element["street"] = streetWithNumber[0];
        var slash = streetWithNumber[1].split("/");
        element["house"] =  slash[0];
        element["flat"] =  slash[1];
    } else {
        element["street"] = street;
    }

    var house_number = (addres.split(/,\s*/))[1],
        flat = (addres.split(/,\s*/))[2];

    if(house_number && house_number.indexOf("дом") === -1) {
        var slash = (addres.split(/,\s*/))[1].split("/");
        element["house"] = slash[0];
        if(!/undefined/.test(slash[1])){
            element["flat"] =  slash[1];
        }

    } else if(house_number && house_number.indexOf("дом") !== -1) {
        element["house"] = (addres.split(/,\s*/))[1].replace(" ", "").replace("дом", "");
    }

    if(flat && flat.indexOf("кв.")!==-1) {
        element["flat"] = (addres.split(/,\s*/))[2].replace("кв.", "").replace(" ","");
    }
    result.push(element);
}
    console.log(result);
/*
приклад структури масиву result
>>> result
[
  ...
  {
    "street": 'Юности', //string
    "house": '25',      //string
    "flat": '6'         //string
  }
 ...
]
*/
module.exports = result;








