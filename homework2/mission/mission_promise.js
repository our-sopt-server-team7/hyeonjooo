let isMomHappy = false;
let phone = {
    brand : 'Samsung',
    color : 'black'
};

var willIGetNewPhone = new Promise((resolve, reject) =>{
    if(isMomHappy == true){
        resolve(console.log(phone));
    }
    else{
        reject(new Error('mom is not happy'));
    }
});

const promise = willIGetNewPhone;