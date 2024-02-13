//変数宣言
let element_units = {cryo:0,dendro:0,pyro:0,burning:0};
//関数定義
function ganyu(distance){
  let data = {
    CA:{
      frame:{CA:113,swap:113},
      hit_num:2,
      hit1:Math.round(103+60*distance/5.5),
      hit2:Math.round(103+22+60*distance/5.5),
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
  return data;
}

function make_plan(rotation){
  let char_data = {Ganyu:ganyu(0),
                   Nahida:nahida(),
                   Bennett:bennett()
                  };
  let char_field = "Nahida";
  let action_frame = 0;
  let reading = char_data[char_field];
  let plan = {};
  console.log(Object.keys(char_data));
  for(let i=0; i<rotation.length-1;i++){
    if(rotation[i]=="swap"){
      i++;
      if(!(char_field==rotation[i])){
        char_field = rotation[i];
        reading = char_data[char_field];
        action_frame += 3;
      }
    }else{
      for(let j = 1; j<reading[rotation[i]]["hit_num"]+1; j++){
        plan["_"+(action_frame+reading[rotation[i]]["hit"+j])]={type:reading[rotation[i]]["type"],GU:reading[rotation[i]]["GU"],ICD:reading[rotation[i]]["ICD"]};
      }
      action_frame += reading[rotation[i]]["frame"][rotation[i+1]];
    }
  }
  console.log(plan);
  return plan;
}

function simulate(plan){
  let TKP_CD = 0;
  let burning_pyro = 0;
  let plan_key=Object.keys(plan);
  console.log(plan_key);
  for(let frame = 0; frame<1100; frame++){
    console.log(frame);
    if(plan_key.includes(String("_"+frame))){
     let reaction = applicate(plan["_"+frame]);
     if(!(reaction=="none")){
       console.log(reaction);
       if(TKP_CD==0){
         TKP_CD = 2.5*60;
         plan_key["_"+(frame+4)]={type:"dendro",GU:1.5,ICD:1};
       }
     }
    }
    if(element_units.burning>0){
      if(burning_pyro == 120){
        burning_pyro = 0;
        element_units.pyro = 1;
      }else{
        burning_pyro++;
      }
    }
    if(TKP_CD>0){
      TKP_CD--;
    }
  }
}
function applicate(element_data){
  let type_ = element_data.type;
  let units_ = element_data.GU;
  if(type_ == "pyro"){
    if(element_units.pyro<0.8*units_){
      element_units.pyro = 0.8*units_;
    }
  }
  if(type_ == "cryo"){
    if(element_units.burning>0){
      element_units.burning -= 0.5*units_;
      if(element_units.burning<0){
        element_units.burning = 0;
        return "melt";
      }
    }else if(element_units.pyro){
      element_units.pyro -= 0.5*units_;
      if(element_units.pyro<0){
        element_units.pyro = 0;
        return "melt";
      }
    }else{
      if(element_units.cryo<0.8*units_){
        element_units.cryo = 0.8*units_;
      }
    }
  }
  if(type_ == "dendro"){
    element_units.dendro = 0.8*units_;
    if(element_units.pyro>0 && element_units.burning==0){
      element_units.burning = 2;
      return "burning";
    }
  }
  return "none";
}
simulate(make_plan(["swap","Nahida","tE","Q","swap","Bennett","tE","Q","swap","Ganyu","CA","CA","CA","CA","CA","CA","CA","swap"]));
