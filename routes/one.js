
const express = require ('express')
const dotenv = require ('dotenv')
const router = express.Router()
const mongoose = require ('mongoose')
const bcrypt = require ('bcryptjs')

const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = async () => {
try {await mongoose.connect(process.env.MONGO_URI);
console.log ('database connected')
} catch (err){
	console.error(err.message);
	process.exit(1);
}
}
app.get('/', (req, res) => res.send("the backend is up and running"));
app.post('/register', async(req, res) => {
	const { username, email, password } = req.body;
	try{
	let user = await user.findOne({email});

	if(user) {
	return res.status(400).json({msg:"user already exists"});
	}

	user = newUser({
	
	username,
	email,
	password,
	});
}	catch (err){
	console.error(error.message);
	return res.status(500).json("internal server error");
}
});

app.post('/login', async(req, res)=>{
	const {email, password} = req.body;
	try{
		let user = await User.findOne({email});
		if (!user) {return res.status(400).json({msg: "invalid credentials"})
	}
const isMatch = await User.matchPassword(password);
if (!isMatch) {
	return res.status(400).json({msg: "invalid credentials"});
}
const payload = {
	user: {
		id: userid,
	},
}
} catch(err){
	console.error(error.message);
	return res.status(500).json('internal server error')
}
});

app.listen(PORT, () =>console.log(`server is running on port ${PORT}`));