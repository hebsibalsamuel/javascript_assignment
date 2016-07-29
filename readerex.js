var fs=require('fs');
var lineReader = require('readline').createInterface({
 input: fs.createReadStream('cr.csv')
});

var des,typ,yr;
//var a,b;
var data;
var count=0;
function yeardata(yr,under500,above500)
{
 this.yr=yr;
 this.under500=under500;
 this.above500=above500;
}
var years=[];
var final_array_of_objects=[];


lineReader.on('line', function (line)
{
count=count+1;
 if(count==1)
 {
   //console.log();
    var h=line.split(",");
    //console.log(h);
for(var i=0;i<h.length;i++)
 {
   if(h[i]=="Description")
   {
     des=i;


   }
   if(h[i]=="Primary Type")
   {
     typ=i;
   }
   if(h[i]=="Year")
   {
     yr=i;
   }

}
}
 else if(count>=2)
 {
    data=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
var year=(data[yr]);
var index=years.indexOf(year);
if(index<0)
{
 years.push(year);
 var yeardata_obj=new yeardata(year,0,0);
 if(data[des]=='$500 AND UNDER')
 {
   yeardata_obj.under500=yeardata_obj.under500+1;
 }
 else if(data[des]=='OVER $500')
 {
   yeardata_obj.above500=  yeardata_obj.above500+1;
 }
 final_array_of_objects.push(yeardata_obj);

}
else
{
var yeardata_obj=final_array_of_objects[index];
if(data[des]=='$500 AND UNDER')
{
 yeardata_obj.under500=yeardata_obj.under500+1;
}
else if(data[des]=='OVER $500')
{
 yeardata_obj.above500=  yeardata_obj.above500+1;
}
final_array_of_objects[index]=yeardata_obj;

}


 }
//  console.log(final_array_of_objects);
});
lineReader.on('close', function() {

  final_array_of_objects.sort(function(a,b){
    return parseInt(a.yr)-parseInt(b.yr);
  });

 console.log(final_array_of_objects);


   var file=JSON.stringify(final_array_of_objects);
   fs.writeFile("part_1_json.json",file,"utf8",function(error){
     if(error)
     throw error;
     });

});
