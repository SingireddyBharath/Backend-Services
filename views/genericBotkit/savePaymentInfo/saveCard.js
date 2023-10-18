function countryChange() {
    var countryState = [
        [
            'US', [
            ['', 'State/Province'],
            ['AL', 'Alabama'],
            ['AK', 'Alaska'],
            ['AZ', 'Arizona'],
            ['AR', 'Arkansas'],
  ], ],
[
            'CA', [
            ['', 'State/Province'],
            ['AB', 'Alberta'],
            ['BC', 'British Columbia'],
            ['MB', 'Manitoba'],
            ['NB', 'New Brunswick'],
  ]]
   ];

    var countryElement = document.getElementById('countryId');
    var stateElement = document.getElementById('stateId');
    var stateLabelElement = document.getElementById('stateLabel');

if (countryElement && stateElement) {
        var listOfState = [
            ['XX', 'None']
        ];

        var currentCountry = countryElement.options[countryElement.selectedIndex].value;
        for (var i = 0; i < countryState.length; i++) {
            if (currentCountry == countryState[i][0]) {
                listOfState = countryState[i][1];
            }
        }
        if (listOfState.length < 2) 
            {
            stateElement.style.display = 'none';
            stateLabelElement.style.display = 'none';
            }
    else 
        {
        stateElement.style.display = 'inline';
        stateLabelElement.style.display = 'inline';
        }
        var selectedState;
        for (var i = 0; i < stateElement.length; i++) {
            if (stateElement.options[i].selected === true) {
                selectedState = stateElement.options[i].value;
            }     
        }
        stateElement.options.length = 0;
        for (var i = 0; i < listOfState.length; i++) {
            stateElement.options[i] = new Option(listOfState[i][1], listOfState[i][0]);
            if (listOfState[i][0] == selectedState) {
                stateElement.options[i].selected = true;
            }    
        }      
    }
}
function cardSubmit(){
    return true;
   }
module.exports = {
    cardSubmit
}