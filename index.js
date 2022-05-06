const express = require("express")
const app = express()
const Database = require("@replit/database")
const db = new Database()
const currency = "<:comfy:829557081819316245>"
const cooldownForBal = new Set()
const cooldownForBeg = new Set()
const cooldownForShop = new Set()
const cooldownForDaily = new Set()
const cooldownForPassive = new Set()
const cooldownForSearch = new Set()
const cooldownForWork = new Set()

app.get("/", (req, res) => {
  res.send("Hello hell.")
})

app.listen(3000, () => {
  console.log("The project is ready")
})

let Discord = require("discord.js")
let client = new Discord.Client()
client.on("ready", () => {
  client.user.setPresence({ activity: { name: `Handling RC Bank.` } });
});
client.on("message", async message => {
  if(message.content.toLowerCase().startsWith("%balance")|| message.content.toLowerCase().startsWith("%bal")){
    if(cooldownForBal.has(message.author.id)){
      message.reply("You have used this command in the last 15 seconds, please wait before using this command again.")
    }else{
      let balance = await db.get(`wallet_${message.author.id}`)
      let bank = await db.get(`bank_${message.author.id}`)
      if(balance === null) balance = 0
      if(bank === null) bank = 0
      let MoneyEmbed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username}'s Wallet and Bank`)
      .setDescription(`Wallet: ${balance} ${currency}\nBank: ${bank} ${currency}`)
      .setColor("RANDOM")
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      message.channel.send(MoneyEmbed)
    }
    cooldownForBal.add(message.author.id)
      setTimeout(() => {
      cooldownForBal.delete(message.author.id)
    }, 15000)
  }
  if(message.content.toLowerCase().startsWith("%beg")){
    if(cooldownForBeg.has(message.author.id)){
      message.reply("You have used this command in the last 15 seconds, please wait before using this command again.")
    }else{
      let random = [0, 100, 10, 20, 30, 40, 50, 0, 2, 6, 70, 10, 23, 183, 123, 150]
      let random1 = random[Math.floor(Math.random()*random.length)]
      if(random1 === 0){
      message.reply("Oof, no one donated any money, try again next time :D")
      }else{
        message.reply(`nice! People gave you ${random1} ${currency}!`)
        let balance = await db.get(`wallet_${message.author.id}`)
        let money = balance + random1
        db.set(`wallet_${message.author.id}`, money).then(() => {});
      }
      cooldownForBeg.add(message.author.id)
      setTimeout(() => {
      cooldownForBeg.delete(message.author.id)
    }, 15000)
    }
  }
  if(message.content.toLowerCase().startsWith("%shop")){
    if(cooldownForShop.has(message.author.id)){
      message.reply("You have used this command in the last 15 seconds, please wait before using this command again.")
    }else{
      let embed = new Discord.MessageEmbed()
      .setTitle("Roles Shop")
      .setDescription("You can get roles that you can't find in #get-a-role channel and badges for the Forum! Buy using `%buy ID`.")
      .addFields({name:"VIP [id: vip]", value:`1000000 ${currency}`},
      {name: "Discord Server Owner (gets access to promotion channel) [id: dsc]", value: `500 ${currency}`},
      {name: "YT Crew (gets access to promotion channel) [id: yt]", value:`500 ${currency}`},
      {name:"VIP Badge in the Forums [id: webVIP]", value:`10000 ${currency}`})
      message.channel.send(embed)
    }
    cooldownForShop.add(message.author.id)
      setTimeout(() => {
      cooldownForShop.delete(message.author.id)
    }, 15000)
  }
  if(message.content.toLowerCase().startsWith("%buy vip")){
    let balance1 = await db.get(`wallet_${message.author.id}`)
    let balance = parseInt(balance1, 10)
    if(balance < 1000000){
      let less = 1000000 - balance
      message.reply(`You are lacking ${less} ${currency}! Get some more ${currency} to get the ultimate VIP role!`)
    }else if(balance === null){
      message.reply(`ah, you don't have any ${currency} to spend! Get some money before you can buy it!`)
    }else if(balance === 1000000){
      message.reply("You sure you wanna do this? It is going to take all your money! You better get some more money before buying this :D")
    }else{
      let role = message.guild.roles.cache.find(role => role.name === "VIP")
      message.member.roles.add(role)
      db.set(`wallet_${message.author.id}`, balance - 1000000).then(() => {});
      message.reply("gave you the VIP role! Congrats!")
    }
  }
  if(message.content.toLowerCase().startsWith("%buy dsc")){
    let balance1 = await db.get(`wallet_${message.author.id}`)
    let balance = parseInt(balance1, 10)
    if(balance < 500){
      let less = 500 - balance
      message.reply(`You are lacking ${less} ${currency}! Get some more ${currency} to get this role!`)
    }else if(balance === null){
      message.reply(`ah, you don't have any ${currency} to spend! Get some money before you can buy it!`)
    }else if(balance === 500){
      message.reply("I wouldn't do that if I were you! You would go bankrupt if you bought this role now. Get some more <:comfy:829557081819316245> before you can buy this.")
    }else{
      let role = message.guild.roles.cache.find(role => role.name === "Discord Server Owner")
      message.member.roles.add(role)
      db.set(`wallet_${message.author.id}`, balance - 500).then(() => {});
      message.reply("gave you the Discord Server Owner role! You can now access the promotion channel!")
    }
  }
  if(message.content.toLowerCase().startsWith("%buy yt")){
    let balance1 = await db.get(`wallet_${message.author.id}`)
    let balance = parseInt(balance1, 10)
    if(balance < 500){
      let less = 500 - balance
      message.reply(`you are lacking ${less} ${currency}! Get some more ${currency} to get this role!`)
    }else if(balance === null){
      message.reply(`ah, you don't have any ${currency} to spend! Get some money before you can buy it!`)
    }else if(balance === 500){
      message.reply("I wouldn't do that if I were you! You would go bankrupt if you bought this role now. Get some more <:comfy:829557081819316245> before you can buy this.")
    }else{
      let role = message.guild.roles.cache.find(role => role.name === "YT crew")
      message.member.roles.add(role)
      db.set(`wallet_${message.author.id}`, balance - 500).then(() => {});
      message.reply("gave you the YT Crew role! You can now access the Promotion channel! Happy Subs to you!")
    }
  }
  if(message.content.toLowerCase()=== "%help"){
    let embed = new Discord.MessageEmbed()
    .setTitle("Command List")
    .setDescription("Commands that this bot can understand")
    .addFields({name:`Check up on your ${currency}`, value:"`%bal`"},
    {name:`Ask for some donations from the Virtual Public`, value:"`%beg`"},
    {name:`Check out the Store!`, value:"`%shop`"},
    {name: `Kill someone`, value: "`%kill`"},
    {name: `Hide from killers (default)`, value: "`%passive on`"},
    {name:`Be able to kill people`, value: "`%passive off`"},
    {name: `Get daily ${currency}`, value: "`%daily`"},
    {name:`Deposit all coins into the bank`, value: "`%dep`"},
    {name:`Withdraw all coins from the bank`, value: "`%with`"},
    {name: `Search your surroundings for ${currency}`, value: "`%search`"})
    .setFooter("Page 1 of 2")
    .setColor("RANDOM")
    message.channel.send(embed)
  }
  if(message.content.toLowerCase()==="%daily"){
  if(cooldownForDaily.has(message.author.id)){
      message.reply("You have used this command in the last 24 hours, please wait before using this command again.")
  }else{
    let balance = await db.get(`wallet_${message.author.id}`)
    
    db.set(`wallet_${message.author.id}`, balance + 150).then(() => {});
    message.reply("Rising Cousins gave you 150 <:comfy:829557081819316245> reward for being awesome!")
  }
    cooldownForDaily.add(message.author.id)
      setTimeout(() => {
      cooldownForDaily.delete(message.author.id)
    }, 86400000)
  }
  if(message.content.toLowerCase() === "%dep"){
    let bank = await db.get(`bank_${message.author.id}`)
    let wallet = await db.get(`wallet_${message.author.id}`)
    let total = bank + wallet 
    db.set(`bank_${message.author.id}`, total).then(() => {});
    message.reply(`you deposited your ${wallet} <:comfy:829557081819316245> in you bank.`)
    db.set(`wallet_${message.author.id}`, 0).then(() => {});
  }
  if(message.content.toLowerCase()=== "%with"){
    let bank = await db.get(`bank_${message.author.id}`)
    let wallet = await db.get(`wallet_${message.author.id}`)
    let total = bank + wallet
    db.set(`wallet_${message.author.id}`, total).then(() => {});
    db.set(`bank_${message.author.id}`, 0).then(() => {});
    message.reply(`you withdrew ${bank} ${currency} from your bank!`)
  }
  if(message.content.toLowerCase().startsWith("%kill")){
    let victim = message.mentions.members.first()
    let murdererPassive = await db.get(`passive_${message.author.id}`)
    let murdererWallet = await db.get(`wallet_${message.author.id}`)
    if(murdererPassive === "true" || murdererPassive === null){
      message.reply("you are on passive mode! Turn it off to be able to be kill players.")
    }else if(murdererWallet < 100){
      message.reply(`you need 100 ${currency} to prepare the murder of ${victim}, which you do not have.`)
    }else{
      if(!victim){
       message.reply("Who do you want to kill? Ping the victim! Mwahaha")
      }else if(victim.id === message.author.id){
        message.reply("why do you want to kill yourself?! Get some help.\nIf you are having Suicidal thoughts, please contact a therapist. Nothings worth taking your life!")
      }else{
        let victimPassive = await db.get(`passive_${victim.id}`)
        let victimWallet = await db.get(`wallet_${victim.id}`)
        if(victimPassive === "true" || victimPassive === null){
          message.reply(" your victim is on passive mode!")
        }else if(victimWallet < 100){
          message.reply(`the victim doesn't even have 100 ${currency} in their wallet! Its not worth it to murder them.`)
        }else{
        let murders = ["was shot by", "was slain by", "was shot by", "didn't want to live in the same world as", "was scared to death by", "was killed by the goons of"]
        let random1 = [1, 55, 150, 122]
        let randomMurder = murders[Math.floor(Math.random() * murders.length)]
        let randomMoney = random1[Math.floor(Math.random() * random1.length)] 
        message.channel.send(`${victim} ${randomMurder} ${message.author} and got ${randomMoney}`)
        let MurdererMoney = murdererWallet + randomMoney - 100
        let VictimMoney = victimWallet - randomMoney
        console.log(murdererWallet)
        console.log(victimWallet)
        db.set(`wallet_${message.author.id}`, MurdererMoney).then(() => {});
        db.set(`wallet_${victim.id}`, VictimMoney).then(() => {});
        }
      }
    }
  }
  if(message.content.toLowerCase()==="%passive on"){
    if(cooldownForPassive.has(message.author.id)){
      message.reply("You have used this command in the last 12 hours, please wait before using this command again.")
    }else{
    db.set(`passive_${message.author.id}`, "true").then(() => {});
    message.reply("you are now a passive user. No one will be able to kill you now :)")
    }
    cooldownForPassive.add(message.author.id)
      setTimeout(() => {
      cooldownForPassive.delete(message.author.id)
    }, 43200000)
  }
  if(message.content.toLowerCase()==="%passive off"){
    if(cooldownForPassive.has(message.author.id)){
      message.reply("You have used this command in the last 12 hours, please wait before using this command again.")
    }else{  
    db.set(`passive_${message.author.id}`, "false").then(() => {});
    message.reply("you are now not a passive user. Watch out! People can kill you and get your <:comfy:829557081819316245>!")
    }
    cooldownForPassive.add(message.author.id)
      setTimeout(() => {
      cooldownForPassive.delete(message.author.id)
    }, 43200000)
  }
  if(message.content.toLowerCase().startsWith("%search")){
    if(cooldownForSearch.has(message.author.id)){
      message.reply("You have used this command in the last 15 seconds, please wait before using this command again.")
    }else{
      let searchPlace = ["air", "pocket", "chair", "car", "bookshelf", "YouTube giveaways", "discord DMs", "campk12 dashboard"]
      let money = [0, 10, 100, 0, 20, 10, 2, 30, 10, 10, 100, 10000, 12, 23, 134, 134, 54, 500, 999, 131, 51, 343, 24, 135, 222, 134, 1349, 493, 13]
      let randomPlace = searchPlace[Math.floor(Math.random()*searchPlace.length)]
      let wallet = await db.get(`wallet_${message.author.id}`)
      let randomMoney = money[Math.floor(Math.random()*money.length)]
      if(randomMoney===0){
        message.reply(`you searched ${randomPlace} but you couldn't find any ${currency}. Sed.`)
      }else{
        let total = randomMoney + wallet
        db.set(`wallet_${message.author.id}`, total).then(() => {});
        message.reply(`you searched ${randomPlace} and found ${randomMoney} ${currency}.`)
      }
    }
    cooldownForSearch.add(message.author.id)
      setTimeout(() => {
      cooldownForSearch.delete(message.author.id)
    }, 15000)
  }
  if(message.content === "%reset"){
    db.set(`wallet_${message.author.id}`, 0).then(() => {});
  }
  if(message.content.toLowerCase().startsWith("%buy webvip")){
    let wallet = await db.get(`wallet_${message.author.id}`)
    console.log(wallet)
    if(wallet < 10000){
      let less = 10000 - wallet
      console.log(less)
      message.reply(`hey! You are lacking ${less} ${currency}.`)
    }else{
      message.reply("congrats! You can now have the VIP Badge in our Website. DM Radical1233#9596 with your username (in the website) and a screenshot of you getting this message!")
      let ohno = wallet - 10000
      console.log(ohno)
      db.set(`wallet_${message.author.id}`, ohno).then(() => {});
    }
  }
  if(message.content.toLowerCase().startsWith("%worklist")){
    let embed = new Discord.MessageEmbed()
    .setTitle("For Hire")
    .setDescription("Ask for an application using %workapp ID")
    .addFields({name:"Pizza Place (ID: pp)", value:`500 ${currency} Salary per hour`},
    {name:"CampK12 Dev (ID: ck12)", value:`750 ${currency} Salary per hour`},
    {name:"Udemy Course Teacher (id: uct)", value: `1000 ${currency} Salary per hour`},
    {name:"Minecraft Streamer (ID:mc)", value:`10,000 ${currency} per hour`})
    message.channel.send(embed)
  }
  if(message.content.toLowerCase().startsWith("%workapp pp")){
    let please = ["no", "yes"]
    let randomAnswer = please[Math.floor(Math.random()*please.length)]
    let job = await db.get(`job_${message.author.id}`)
    let firstjob = await db.get(`firstjob_${message.author.id}`);
    if(job === null){
      if(firstjob === "done"){
        message.reply("Uh....why do you want to degrade your job? I don't want to make your life harder, keep your old job.")
      }else{
        if(randomAnswer === "no"){
          message.reply("I am sorry. The Pizza Place didn't hire you :( try again later, maybe?")
        }else{
          message.reply(`congrats! The Pizza Place hired you! You now have a 500 ${currency} salary job! To work, do the %work command. You will have to work here 50 times before you can take the CampK12 Dev job. You gotta take it easy, man!`)
          db.set(`job_${message.author.id}`, "pp").then(() => {});
          db.set(`firstjob_${message.author.id}`, "done").then(() => {});
        }
      }
    }else{
      message.reply("uhhhh. This is awkward but you already have a job or you...? You will have to quit from your current job to apply here.")
    }
  }
  if(message.content.toLowerCase()==="%work"){
    if(cooldownForWork.has(message.author.id)){
      message.reply("You have used this command in the last 1 hour, please wait before using this command again.")
    }else{
      let wallet = await db.get(`wallet_${message.author.id}`)
      let job = await db.get(`job_${message.author.id}`)
      if(job === "pp"){
        let times1 = await db.get(`firstjobTime_${message.author.id}`)
        let times2 = times1 + 1
        let pizzaMoneh = ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "no","yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes"]
        let randomPizzaMoneh = pizzaMoneh[Math.floor(Math.random()*pizzaMoneh.length)]
        if(randomPizzaMoneh === "no"){
          let pizzafails = ["burned the pizza", "were watching YouTube in your shift", "didn't show up for your shift"]
          let pizzafailsrandom = pizzafails[Math.floor(Math.random()*pizzafails.length)]
        message.reply(`you ${pizzafailsrandom}. So the boss didn't give you any ${currency}. Don't worry, you haven't lost your job.`)
        }else{
          let money = wallet + 500
          db.set(`wallet_${message.author.id}`, money).then(() => {});
          db.set(`firstjobTime_${message.author.id}`, times2).then(() => {});
          let moreTime = 50 - times2
          message.reply(`nice! The Pizza Place gave you 500 ${currency} for your service! You have to work ${moreTime} times more to be able to able to apply for the CampK12 Dev job!`)
        }
      }else if(job === "ck12"){
        let campk12moneh = ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "no","yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes"]
        let randomCampk12 = campk12moneh[Math.floor(Math.random()*campk12moneh.length)]
        if(randomCampk12==="no"){
          let codingFails = ["bugged the website", "took a sick day", "accidently came to the wrong branch", "had a party"]
          let codingFailsRandom = codingFails[Math.floor(Math.random()*codingFails.length)]
          message.reply(`you ${codingFailsRandom}. So the boss didn't give you any ${currency}. Don't worry, you haven't lost your job...yet`)
        }else{
          let times = db.get(`secondjobTime_${message.author.id}`)
          let finaltime = times + 1
          let lefttime = 100 - finaltime
          message.reply(`nice! CampK12 gave you 750 ${currency}! You need to work ${lefttime} times more to be able to get the Udemy Course Teacher job!`)
          let campk12money = wallet + 750
          db.set(`wallet_${message.author.id}`, campk12money).then(() => {});
          db.set(`secondjobTime_${message.author.id}`, finaltime).then(() => {});
        }
      }else if(job === "uct"){
        let uctmoneh = ["yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "no","yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes", "yes"]
        let uctrandom = uctmoneh[Math.floor(Math.random()*uctmoneh.length)]
        if(uctrandom === "no"){
          let uctFails = ["gave all your money to the charity", "bought a gaming chair", "bought a new microphone"]
          let randomuctFails = uctFails[Math.floor(Math.random()*uctFails.length)]
          message.reply(`you ${randomuctFails}. So, technically, you didn't gain any ${currency}. Sed.`)
        }else{
          message.reply(`nice! Udemy gave you 1000 ${currency}! You need to get the VIP role to be able to work as a MC Streamer!`)
          let udemymoney = wallet + 750
          db.set(`wallet_${message.author.id}`, udemymoney).then(() => {});
        }
      }
    }
    cooldownForWork.add(message.author.id)
      setTimeout(() => {
      cooldownForWork.delete(message.author.id)
    }, 3600000)
  }
  if(message.content.toLowerCase().startsWith("%workapp ck12")){
    let firstjobTime = await db.get(`firstjobTime_${message.author.id}`)
    let secondJob = await db.get(`secondjob_${message.author.id}`)
    if(firstjobTime < 50 || firstjobTime === null){
      let moreTimes = 50 - firstjobTime
      message.reply(`you need to work ${moreTimes} times in the Pizza Place to be able to apply here!`)
    }else if(secondJob === "done"){
      message.reply("You already have a better job than this! ")
    }else{
      let please = ["yes", "no"]
      let prettyplease = please[Math.floor(Math.random()*please.length)]
      if(prettyplease === "no"){
        message.reply("I'm sorry. CampK12 is busy at the moment. Maybe try again (like now?).")
      }else{
        let job = await db.get(`job_${message.author.id}`)
        if(job === null){
          db.set(`job_${message.author.id}`, "ck12").then(() => {});
          message.reply(`congratulations! CampK12 hired you! You will now get 750 ${currency} when you work with the %work command every 1 hour. You have to work 100 times to be able to apply for the Udemy Course Teacher job!`)
          db.set(`secondjob_${message.author.id}`, "done").then(() => {});
        }else{
          message.reply("you already have a job....? You will have to quit from your current job to be able to apply")
        }
      }
    }
  }
  if(message.content.toLowerCase() === "%help 2"){
    let embed = new Discord.MessageEmbed()
    .setTitle("List of Commands")
    .setDescription("Page 2 of the list of commands the bot understands")
    .addFields({name:"Look for a job", value:"`%worklist`"},
    {name:"Retire from your current job (you can reapply)", value:"`%retire`"})
    message.channel.send(embed)
  }
  if(message.content.toLowerCase().startsWith("%workapp uct")){
    let secondjobTime = await db.get(`secondjobTime_${message.author.id}`)
    let secondJob = await db.get(`secondjob_${message.author.id}`)
    if(secondjobTime < 100 || secondjobTime === null){
      let moreTimes = 100 - secondjobTime
      message.reply(`you need to work ${moreTimes} times in CampK12 to be able to apply here!`)
    }else{
      let please = ["yes", "no"]
      let prettyplease = please[Math.floor(Math.random()*please.length)]
      if(prettyplease === "no"){
        message.reply("I'm sorry. Udemy is busy at the moment. Maybe try again (like now?).")
      }else{
        let job = await db.get(`job_${message.author.id}`)
        if(job === null){
          db.set(`job_${message.author.id}`, "uct").then(() => {});
          message.reply(`congratulations! Udemy hired you! You will now get 1000 ${currency} when you work with the %work command every 1 hour. You will have to get the VIP Role in the Discord Server to be able to get the MC Streamer Job.`)
        }else{
          message.reply("you already have a job....? You will have to quit from your current job to be able to apply")
        }
      }
    }
  }
  if(message.content.toLowerCase().startsWith("%retire")){
    message.reply("oh. I am sorry to hear that you want to quit this job. If you want to retire....ok I guess. You are now unemployed.")
    db.set(`job_${message.author.id}`, null).then(() => {});
  }
  if(message.content.toLowerCase().startsWith("%workapp mc")){
    message.reply("I'm sorry but this command is being worked on.")
  }
})
const token = process.env['Token Bois']
client.login(token)
