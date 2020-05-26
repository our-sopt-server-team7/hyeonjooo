var info = [
    {name: '박현주', age: '25', univ: 'dankook'},
    {name: '김성윤', age: '23', univ: 'chungang'},
    {name: '백선혜', age: '22', univ: 'sungsin'},
    {name: '최정균', age: '25', univ: 'hanseo'},
    {name: '천명희', age: '24', univ: 'duksung'},
    
];

for(var infos of info)(
    console.log("이름은 " + infos.name + ", 나이는 " + infos.age + ", 학교는 " + infos.univ)
);


info.forEach(
    info => console.log("이름은 " + info.name + ", 나이는 " + info.age + ", 학교는 " + info.univ)
);