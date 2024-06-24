const {userVoting, getListVoting, userSendC, getListVotingAdmin ,adminBlindSig, getBlindSig , getListVotingResult} = require('../services/voting')

const listVoting = async (req, res) =>{
   const list = await getListVoting();

   res.render('pages/listvoting',{list, user: req.user});
}

const listVotingAdmin = async (req, res) =>{
   const list = await getListVotingAdmin();

   res.render('pages/listvotingAdmin',{list,user: req.user});
}

const voting = async (req,res) =>{
   const result = await userVoting(req);
   if(result){
      res.status(200).send({message: 'Biểu quyết thành công, chữ ký hợp lệ'});
   }
   else{
      res.status(400).send({message: 'Biểu quyết thất bại, chữ ký không hợp lệ', status: 400});
   }
}

const listResult = async (req,res) => {
   const list = await getListVotingResult();
   res.render('pages/result',{list, user: req.user});
}

const sendC = async (req,res) =>{
   const result = await userSendC(req);
   if(result){
      return res.status(200).send({message: 'Gửi bản mã thành công'});
   }
   res.status(400).send({message: 'Bạn chỉ có thể gửi một bản mã', status: 400});
}


const sig = async (req,res) =>{
   const result = await adminBlindSig(req);
   if(result){
      return res.status(200).send({message: 'Ký Mù thành công'});
   }
   res.status(400).send({message: 'ERR'});
}

const getSig = async (req,res) =>{
   const result = await getBlindSig(req);
   if(result){
      return res.status(200).send({message: 'Lấy chữ ký mù thành công', sig: result});
   }
   res.status(400).send({message: 'Lấy chữ ký mù thất bại, admin chưa ký ', status: 400});
}
   
module.exports = {listVoting ,voting, sendC, listVotingAdmin ,sig, getSig, listResult}