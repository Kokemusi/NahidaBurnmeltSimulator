function ganyu(distance){
  let data = {
    CA:{
      frame:{all:113},
      hit_num:2,
      hit1:(103+60*distance/5.5),
      hit2:(103+22+60*distance/5.5),
      type:"cryo",
      GU:1,
      ICD:0
    }
  };
  return data;
}
function nahida(){
  let data = {
    tE:{
      frame:{Q:32,swap:25},
      hit_num:1,
      hit1:13,
      type:"dendro",
      GU:1,
      ICD:0,
    },
    Q:{
      frame:{E:112,swap:112},
      hit_num:0
    },
    TKP:{
      frame:{all:0},
      hit_num:1,
      hit1:4,
      type:"dendro",
      GU:1.5,
      ICD:1,}
  };
  return data;
}
function bennett(){
  let data = {
    tE:{
      frame:{Q:51,swap:50},
      hit_num:1,
      hit1:16,
      type:"pyro",
      GU:2,
      ICD:0,
    },
    Q:{
      frame:{E:52,swap:51},
      hit_num:1,
      hit1:37,
      type:"pyro",
      GU:2,
      ICD:0,
    }
  };
}
console.log(ganyu(2));
function make_plan(rotation){
  let char_data = {Ganyu:ganyu(),
                   Nahida:nahida(),
                   Bennett:bennett()
                  };
  let char_field = "Nahida";
  let action_frame = 0;
  let reading = char_data[char_field];
  let plan = {};
  console.log(Object.keys(char_data));
  for(let i=0; i<rotation.length-1;i++){
    if(rotation[i]="swap"){
      i++;
      if(!(char_field=rotation[i])){
        char_field = rotation[i];
        reading = char_data[char_field];
        action_frame += 3;
      }
    }else{
      plan["_"+String(action_frame)]=reading[rotation[i]];
      console.log(reading[rotation[i]]);
      action_frame += reading[rotation[i]][rotation[i+1]];
    }
    console.log(action_frame,i,rotation[i]);
  }
  console.log(plan);
}
make_plan(["swap","Nahida","tE","Q","swap","Bennett","tE","Q","swap","Ganyu","CA","CA","CA","CA","CA","CA","CA","done"]);
