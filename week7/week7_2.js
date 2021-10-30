// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
//var content = fs.readFileSync('../week1/data/m01.txt');

var files = ['../week1/data/m01.txt','../week1/data/m02.txt','../week1/data/m03.txt','../week1/data/m04.txt','../week1/data/m05.txt','../week1/data/m06.txt','../week1/data/m07.txt','../week1/data/m08.txt','../week1/data/m09.txt','../week1/data/m10.txt'];

var meetingData = [];
for (var i = 0; i < files.length; i++){
var content = fs.readFileSync(files[i]);

// load `content` into a cheerio object
var $ = cheerio.load(content);


                    
$('form').next().find('tbody')
    .children()
    .each(function (index, element) {
       
        //TODO tetrive meta data from element
        
        var meeting = {};
        
        var Title = $(element).find('td')
                .first()
                .find('b')
                .text()
                .trim()
                .replace(/(\r\n|\n|\r|\t)/gm, '');
        if (Title.endsWith(" -")){
            Title = Title.substring(0,Title.length-2);
        }
        meeting.Title = Title;


        var Building = $(element).find('h4').text()
                .trim()
                .replace(/(\r\n|\n|\r|\t)/gm, '');
        //console.log(Building + "\n"); 
        meeting.Building = Building;
        
        var MeetingDetail = $(element).find('div')
                            .addClass( "detailsBox" )
                            .text()
                            .trim()
                             .replace(/(\r\n|\n|\r|\t)/gm, '');
        meeting.MeetingDetail = MeetingDetail;
      
        
        var Wheelchair = $(element).find('span').text()
                .trim()
                .replace(/(\r\n|\n|\r|\t)/gm, '');
        meeting.Wheelchair = Wheelchair;
        

        var Address = $(element).find('td')
                .first().html().split("<br>")[2]
                .trim()
                .replace(/(\r\n|\n|\r|\t|,\s*$)/gm, '')
                .split(",")
                .shift();
                //.toString();
            meeting.Address = Address;
       console.log(Address);
        
        var AddressDetail = $(element).find('td')
                .first().html().split("<br>")[3]
                .trim()
                .replace(/(\r\n|\n|\r|\t)/gm, '');
        meeting.AddressDetail = AddressDetail;
        
        
           

        var schedules = $(element).find('td')
                .next().html().trim().replace(/(\r\n|\n|\r|\t)/gm, '').split("<br>");
        var times = [];
        var start, end, day, type, special;
        for (var i = 0; i < schedules.length; i++) {
            var line = $(schedules[i]).text().trim().replace(/(\r\n|\n|\r|\t)/gm, '');
                if (line.indexOf("From") > 0) {
                var current = {};
                var startIndex = line.indexOf("From ");
                var endIndex = line.indexOf(" to");
                day = line.substring(0, startIndex-1);
                start = line.substring(startIndex + 6, endIndex);
                end = line.substring(endIndex + 4);
                    current.ScheduleDay = day;
                    current.ScheduleTimeFrom = start;
                    current.ScheduleTimeTo = end;
                    //type
                    var nextLine = $(schedules[i + 1]).text().trim().replace(/(\r\n|\n|\r|\t)/gm, '');  
                    type = nextLine.substring(13);  
                    current.MeetingType = type;
                    times.push(current);
                    //special interest
                    var next2line = $(schedules[i + 2]).text().trim().replace(/(\r\n|\n|\r|\t)/gm, '');  
                    special = next2line.substring(17);  
                    current.SpecialInterest = special;
              }
        }
        
            for (var i = 0; i < times.length; i++) {
                var newMeeting = {};
                newMeeting = Object.assign(newMeeting, meeting);
                newMeeting.ScheduleDay = times[i].ScheduleDay;
                newMeeting.ScheduleTimeFrom = times[i].ScheduleTimeFrom;
                newMeeting.ScheduleTimeTo = times[i].ScheduleTimeTo;
                newMeeting.MeetingType = times[i].MeetingType;
                newMeeting.SpecialInterest = times[i].SpecialInterest;
                meetingData.push(newMeeting);
            }
         
        
       
    });
//address = address.slice(0, address.length -1);
}
fs.writeFileSync('./meeting.json', JSON.stringify(meetingData));