const app = {};
window.addEventListener('load', init);
var groupsContainer;

const meetups = ["android_mcr", "BCS-Greater-Manchester-Branch", "blabtalks", "meetup-group-wHuRVtrk", "CIA-Chicks-in-Advertising-Manchester", "Code-Your-Future-Manchester", "CodeUpManchester", "CodeUp-Salford", "Digital-Analytics-Manchester", "Digital_North_", "DotNetNorth", "Enterprise-UX", "freelance-folk-manchester", "HackerNestMAN", "hackspace-manchester", "HadoopManchester", "HCD-Manchester", "IoTMCR", "JavaScript-North-West", "Ladies-of-Code-Manchester", "Lean-Agile-Manchester", "MaccTech", "Magento-Minds-of-Manchester", "MancDB", "Manchester-Bitcoin-blockchain-and-other-cryptocurrencies", "Manchester-Angular-Workshop", "manchesterentrepreneursclub", "Manchester-Futurists", "Manchester-Grey-Hats", "Manchester-InfoSec", "ManchesterUK-Java-Community", "Power-BI-Manchester-Meetup", "Manchester-R", "Manchester-React-User-Group", "ManchesterWordPressUserGroup", "MancJS", "McrFRED", "McrUXD", "Messaging-Bots-Manchester", "Neo4j-Manchester", "North-West-IT-Crowd-Beer-BBQ-Event", "North-West-Ruby-User-Group", "Open-Data-Manchester", "Practical-Business-Workshops-Manchester", "RealUX", "Salford-Lean-Startup", "scala-developers", "SEO-Manchester", "Social-Software-Development-Meetup-in-Manchester", "Tech-for-Good-Live", "Tech-Leads-NW", "Test-Hive-Manchester", "ThoughtWorks-Manchester-Events", "UK-North-Crypto-Currency-Meetup", "The-UX-Crunch-North", "VRManchester"];

var MeetupsJSON = meetups;

function init() {
    groupsContainer = document.getElementById("groupsContainer");
    initGetMeetups();
}

function initGetMeetups() {
    console.log(meetups);
    MeetupsJSON = MeetupsJSON.map(app.getMeetups);

    $.when(...MeetupsJSON)
        .then((...MeetupsJSON) => {
            MeetupsJSON = MeetupsJSON.map(a => a[0].data);
            console.log(MeetupsJSON); // MVP
            drawMeetups(MeetupsJSON);
        });
}

app.getMeetups = (meetup) => $.ajax({
    url: 'https://api.meetup.com/' + meetup,
    method: 'GET',
    dataType: 'jsonp'
});

function drawMeetups(JSON) {
    groupsContainer.innerHTML = "";
    for (var i = 0; i < JSON.length; i++) {
        var x = JSON[i];
        var name = x.name;
        var link = x.link;
        var members = x.members;
        var thumb = 'blank.jpg';
        if (x.hasOwnProperty('group_photo')) {
            thumb = x.group_photo.photo_link;
        } else {
            if(x.hasOwnProperty('organizer')) {
                if (x.organizer.hasOwnProperty('photo')) {
                    thumb = x.organizer.photo.photo_link;
                }
            }
        } 
        var group = groupDiv(i, thumb, link, name, members);
        groupsContainer.insertAdjacentHTML('beforeend', group);
    }
}

function groupDiv(id, thumbnail, link, name, members) {
    return '<div class="group" id="' + id + '"><img src="' + thumbnail + '"><div class="groupText"><a href="' + link + '" target="_blank"><p>' + name + '</p></a><p>Members: ' + members + '</p></div></div>';
}