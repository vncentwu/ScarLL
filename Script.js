var JSON_Encoded;
var JSON_Decoded;

function summonerLookUp() {
    var SUMMONER_NAME = "";
    SUMMONER_NAME = $("#userName").val();
    


    var API_KEY = "";
    API_KEY = "cd45f090-7b54-4f95-99ea-7e291c3263e2";

    if (SUMMONER_NAME !== "") {

        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + SUMMONER_NAME + '?api_key=' + API_KEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {
                var SUMMONER_NAME_NOSPACES = SUMMONER_NAME.replace(" ", "");

                SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();

                summonerLevel = json[SUMMONER_NAME_NOSPACES].summonerLevel;
                summonerID = json[SUMMONER_NAME_NOSPACES].id;
                iconID = json[SUMMONER_NAME_NOSPACES].profileIconId;

                document.getElementById("sLevel").innerHTML = summonerLevel;
                document.getElementById("sID").innerHTML = summonerID;
                document.getElementById("iID").innerHTML = iconID;

                letsGetMasteries(summonerID, API_KEY);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting Summoner data!");
            }
        });
    } else {}  
}

function letsGetMasteries(summonerID, API_KEY) {
    $.ajax({
        url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + summonerID + "/masteries?api_key=" + API_KEY,
        type: 'GET',
        dataType: 'json',
        data: {

        },
        success: function (resp) {
            numberOfPages = resp[summonerID].pages.length;
            numberOfPage1 = resp[summonerID].pages[0].name;
            mastery0id = resp[summonerID].pages[0].masteries[0].id;
            
            document.getElementById("masteryPageCount").innerHTML = numberOfPages;
            document.getElementById("masteryPages1st").innerHTML = numberOfPage1;
            document.getElementById("m0id").innerHTML = mastery0id;
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting Summoner data 2!");
        }
    });
}