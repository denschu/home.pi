Object.prototype.keys = function ()
{
  var keys = [];
  for(var i in this) if (this.hasOwnProperty(i))
  {
    keys.push(i);
  }
  return keys;
}

var groups = {
   wohnzimmer: "Wohnzimmer",
   wohnzimmer_schrank: "Schrank"
};

//console.log('Debug: ' + JSON.stringify(groups.wohnzimmer));
console.log('Debug: ' + groups.keys());