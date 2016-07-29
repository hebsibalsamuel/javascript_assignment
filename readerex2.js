var fs=require('fs');
var lineReader = require('readline').createInterface({
 input: fs.createReadStream('cr.csv')
});

var arrest,typ,yr;
//var a,b;
var data;
var count=0;
function yeardata(yr,true_count,false_count)
{
 this.yr=yr;
 this.true_count=true_count;
 this.false_count=false_count;

}
var years=[];
var final_array_of_obj=[];// final JSON object


lineReader.on('line', function (line)
{
count=count+1;
 if(count==1)
 {
   //console.log();
    var h=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    //console.log(h);
for(var i=0;i<h.length;i++)
 {
   if(h[i]=="Arrest")
   {
     arrest=i;


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


if(data[typ]=="ASSAULT")
{
  var year=(data[yr]);

  var index=years.indexOf(year);
  if(index<0)
  {
   years.push(year);
   var yeardata_obj=new yeardata(year,0,0);
   if(data[arrest]=="false")
   {
     yeardata_obj.false_count=yeardata_obj.false_count+1;
   }
   else if(data[arrest]=="true")
   {
     yeardata_obj.true_count=  yeardata_obj.true_count+1;
   }
   final_array_of_obj.push(yeardata_obj);

  }
  else
  {
  var yeardata_obj=final_array_of_obj[index];
  if(data[arrest]=="false")
  {
   yeardata_obj.false_count=yeardata_obj.false_count+1;
  }
  else if(data[arrest]=="true")
  {
   yeardata_obj.true_count=  yeardata_obj.true_count+1;
  }
  final_array_of_obj[index]=yeardata_obj;

  }

}


 }



//  console.log(final_array_of_obj);
});

/*final_array_of_obj.sort(function(a,b){
  return parseInt(a.yr)-parseInt(b.yr);
});
*/
lineReader.on('close', function() {


 final_array_of_obj.sort(function(a,b){
   return parseInt(a.yr)-parseInt(b.yr);
 });
  console.log(final_array_of_obj);
   var file=JSON.stringify(final_array_of_obj);

   fs.writeFile("part_2_json.json",file,"utf8",function(error){
     if(error)
     throw error;
     });

});
