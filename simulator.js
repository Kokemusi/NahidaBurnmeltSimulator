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
};
function nahida(){
  let data = {
    E:{
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
};
console.log(ganyu(2));
