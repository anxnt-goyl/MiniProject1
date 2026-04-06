const axios = require('axios');
setInterval( async() => {
    
const data = {
    userId : "user1",
    humidity: Math.floor( Math.random() * 100),
    temperature: Math.floor( Math.random() * 40)
};
try{
    await axios.post('http://localhost:3000/data', data);
    console.log('Data sent:', data);
}catch(err){ console.error('Error sending data:', err);}
},3000);