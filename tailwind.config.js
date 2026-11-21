const c=(n)=>`rgb(var(--${n}) / <alpha-value>)`;
module.exports={content:["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"],
theme:{extend:{colors:{bg:c('bg'),surface:c('surface'),raised:c('raised'),line:c('line'),ink:c('ink'),mute:c('mute'),faint:c('faint'),brand:c('brand'),gold:c('gold'),sky:c('sky')},
fontFamily:{sans:['var(--font-jakarta)','system-ui','sans-serif']}}},plugins:[]};
