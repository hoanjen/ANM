const {createUser, userLogin} = require('../services/user');
const {create, endVote} = require('../services/voting');

const register = async (req,res) =>{
   const user = await createUser(req);
   res.status(201).send({message: "Đăng kí thành công"})
}

const login = async (req,res) =>{
   const access_token = await userLogin(req);
   res.status(200).send({access_token,message: "Đăng nhập thành công"});
}

const createCandidate = async (req,res) =>{
   const a = await create(req);
   res.status(201).send({message: "Tạo cuộc bầu cử thành công"})  
}

const endVoting = async (req,res) =>{
   console.log("1111111111111111111111")
   const voting = await endVote(req);
   res.status(200).send({message: "Kết thúc cuộc bầu cử thành công", voting})  
}

module.exports = { register, login, createCandidate, endVoting}