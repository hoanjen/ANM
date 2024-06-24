const CandidateUser = require('../models/CandidateUser');
const Voting = require('../models/Voting');
const User = require('../models/User');
const Signature = require('../models/Signature');


const isPrime = (x) =>
   {
      if(x<2){
         return false;

      }
      for(let i=2; i<=x/2; i++)
         if(x%i==0)
            return false;
      return true;
   }
function findLargePrime(min, max) {
  let prime;
  do {
    prime = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (!isPrime(prime));
  return prime;
}


function findTwoLargePrimes(min, max) {

  const p = findLargePrime(min, max);
  const q = findLargePrime(min, max);

  return { p, q };
}

function gcd(a, b) {
  while (b != 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}


function findN(rangeMax) {
   let primeFound = false;
   let randomNum; 
   while (!primeFound) {
       randomNum = Math.floor(Math.random() * (10000 - 2)) + 1000; // Số ngẫu nhiên trong khoảng từ 2 đến n-1
      if (isPrime(randomNum)) {
         primeFound = true;
      }
   }
   return randomNum; 
}


function modInverse(d, n) {
  let [t, newT] = [0, 1];
  let [r, newR] = [n, d];

  while (newR !== 0) {
    const quotient = Math.floor(r / newR);
    [t, newT] = [newT, t - quotient * newT];
    [r, newR] = [newR, r - quotient * newR];
  }

  if (t < 0) {
    t = t + n;
  }

  return t;
}

function modExp(base, exponent, modulus) {
      if (modulus === 1) return 0;

      let result = 1;
      base = base % modulus;

      while (exponent > 0) {
         if (exponent % 2 === 1) {
            result = (result * base) % modulus;
         }
         base = (base * base) % modulus;
         exponent = Math.floor(exponent / 2);
      }

      return result;
   }


const create = async (req) => {
   
   const {p, q} = findTwoLargePrimes(1000,10000)
   const n = p*q;
   const o = (p-1)*(q-1);
   const d =  findN(o);
   const e = modInverse(d,o);

   const newVoting = {
      user: req.user.id,
      title: req.body.title,
      listIdVoted: [],
      state: true,
      d,
      e,
      n,
   }
   const voting = new Voting(newVoting)
   await voting.save();
   Voting.updateMany()
   const arrName = req.body.arrName.map((item, index) =>{
      return {name:item,voting: voting._id, choose: 0, index: index+1 };
   });
   await CandidateUser.insertMany(arrName);
   return true;
}

const userVoting = async (req) => {
   const voting = await Voting.findById(req.body.voting);
   const check = modExp(parseInt(req.body.sig),voting.e,voting.n);
   if(voting.listIdVoted.includes(req.user._id)){
      return false;
   }
   if(check == req.body.m ){
      const a = await CandidateUser.findOneAndUpdate({index: req.body.m, voting: req.body.voting},{$inc: {choose: 1}});
      return true;
   }
   return false
}

const userSendC = async (req) => {
   const votingCheck = await Voting.findById(req.body.voting);
   if(votingCheck.listIdVoted.includes(req.user._id)){
      return false;
   }

   await Voting.updateOne({_id:votingCheck._id},{$push : {listIdVoted: req.user._id}})
   const newSignature = {
      user: req.user._id,
      voting: req.body.voting,
      c: req.body.c,
      sig: null,
   }
   const signature = new Signature(newSignature);
   await signature.save();

   return true;
}

const adminBlindSig = async (req) => {

   const m = parseInt(req.body.sig);
   await Signature.findOneAndUpdate({voting: req.body.voting, user: req.body.user}, {sig: m});

   return true;
}

const getBlindSig = async (req) => {
   const signature = await Signature.findOne({user: req.user._id, voting: req.query.voting});
   if(signature.sig == null){
      return false;
   }
   return signature.sig;
}

const endVote = async (req) => {
   console.log(req.body.voting);
   const voting = await Voting.findOneAndUpdate({_id: req.body.voting}, {state: false});
   return voting;
}

const getListVoting = async () => {
   const list = await Voting.aggregate([
      {
         $lookup:
         {
            from: 'candidateusers', localField: '_id', foreignField: 'voting', as: 'candidateusers',
            "pipeline": [
               {
                  $project: {
                     _id: true,
                     name: true,
                     voting: true,
                     index: true,
                  }
               },
               {
                  $sort: {
                     index: 1,
                  } 
               }  
            ]
         },
                        
      },
      {$match: {state: true}}
   ])
   return list;
}

const getListVotingResult = async () => {
   const list = await Voting.aggregate([
      {
         $lookup:
         {
            from: 'candidateusers', localField: '_id', foreignField: 'voting', as: 'candidateusers',
            "pipeline": [
               {
                  $project: {
                     _id: true,
                     name: true,
                     voting: true,
                     index: true,
                     choose:true,
                  }
               },
               {
                  $sort: {
                     index: 1,
                  } 
               }  
            ]
         },
                        
      },
      {$match: {state: false}}
   ])
   return list;
}


const getListVotingAdmin = async () => {
   const list = await Voting.aggregate([
      {
         $lookup:
         {
            from: 'candidateusers', localField: '_id', foreignField: 'voting', as: 'candidateusers',
            "pipeline": [
               {
                  $project: {
                     _id: true,
                     name: true,
                     voting: true,
                     index: true,
                     n: true,
                     d: true,
                  }
               },
               {
                  $sort: {
                     index: 1,
                  } 
               }  
            ]
         },
                        
      },
      {
         $lookup:
         {
            from: 'signatures', localField: '_id', foreignField: 'voting', as: 'signatures',
            "pipeline": [
               {
                  $lookup: {
                     from: 'users', localField: 'user', foreignField: '_id', as: 'user',
                     "pipeline": [
                        {
                           $project:{
                              _id:true,
                              name:true,
                              cccd:true,
                              sig:true,
                           }
                        }
                        ]
                  }
               },
               {
                  $sort: {
                     index: 1,
                  } 
               },
               {$match: { sig: null}}
            ],
         },              
         
      },
      {$match: {state: true}}
   ])
   return list;
}


module.exports = {create, userVoting, getListVoting, userSendC, adminBlindSig, getListVotingAdmin, getBlindSig, getListVotingResult, endVote};