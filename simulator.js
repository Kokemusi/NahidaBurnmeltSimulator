function ganyu(distance){
  let data = {
    CA:{
      frame:{all:113},
      hit:[103+60*distance/5.5,103+22+60*distance/5.5,],
      type:"cryo",
      GU:1,
      ICD:0      
    },
  };
  return data;
};
window.alert(ganyu(10));
