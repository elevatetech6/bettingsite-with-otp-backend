const express = require('express');
// const dotenv = require .config()
// const cors = require ('cors');

const PORT = 10001

const app = express();
TJIHY7TN2K

app.get('/', (req, res) => res.send("the backend is up and running"));
app.post('login', async(req, res)=>{
    const{email, password} = req.body;
    try{
    	let user = await User.findOne({email});
    	if (!user) {
    		return res(400).json('invalid credentials');
    	}
    	const isMatch = await User.matchPassword({password});
    	if (!isMatch) {
    		return res(400).json('check your password and try again..');
    	}else{
    		return res(200).json('logged in successfully')
    	}
    	const payload = {
    		user:{
    			id: user.id,
    		},
    	};
    }catch(err){
    	console.error(err.message);
     process.exit(1);
}

})



app.listen(PORT, () => console.log(`server is running in http://localhost:${PORT}`))