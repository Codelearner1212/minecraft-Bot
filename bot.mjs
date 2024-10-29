import mineflayer from "mineflayer";
import chalk from "chalk";
import { getChatEvents } from './utils/getChatEvents.mjs';
import { getLocation } from './utils/getLocation.mjs';
import { readFile } from "fs/promises";
import readline from "readline";
import pkg, { IntentsBitField } from 'discord.js';
const { Client, GatewayIntentBits } = pkg;
const channelID="1223242682634211349";
import { ActivityType } from 'discord.js';
import { codeBlock } from "@discordjs/builders";
let go=false;
let hi=false;
process.title = 'Incast'; 
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,

   
  ],
});
client.once('ready', () => {
client.user.setPresence({ 
    activities: [{ 
        name: 'Life', 
        type: ActivityType.Watching, 
         url: '' 
    }], 
    status: 'dnd' 
});
});

let logging = false;
let collectedMessages = [];

client.setMaxListeners(30);

const token = "M";
client.login(token);

client.on('messageCreate', async message => {
    const allowedUserId = ''; 

    if (message.content.startsWith("||say ") && message.author.id === allowedUserId) {
        await message.delete();
        message.channel.send(message.content.slice(5));
    }
});
 
const limbo1 = `/is`;
const limbo = `/play skyblock`;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


let botArgs = {
    host: '',
    version: '1.8.9'
};


function onChat(username, message) {
    
    handleChat(this.bot, message, triggerWord);
}

// create minecraft bot
class MCBot {
    // constructor
    constructor(username, password, auth) {
        this.username = username;
        this.password = password;
        this.auth = auth;
        this.host = botArgs["host"];
        this.port = botArgs["port"];
        this.version = botArgs["version"];
      

        this.botLocation = {
            "server": null,
            "gametype": null,
            "lobbyname": null,
            "map": null
        };

       
        this.initBot();

        
        this.getChatEvents = getChatEvents;
        this.getLocation = getLocation;
        this.setupDiscordMessageHandler();
    }
    

    
    initBot() {
        this.bot = mineflayer.createBot({
            "username": this.username,
            "password": this.password,
            "auth": this.auth,
            "host": this.host,
            "port": this.port,
            "version": this.version,
            "hideErrors": true
        });

        // events
        this.initEvents();
        this.listenToUserInput();
        this.guildOnline();
    }
    
    //discord message handler for multiple functions
    setupDiscordMessageHandler() {

        client.on("messageCreate", async (message) => {
            
            if (!message.guild) return;
            if ((message.channel.id == 1248191661989826640||message.channel.id ==1248191812548558878)&&(!message.content.startsWith('!')) ){
               if((message.channel.id == 1248191661989826640)&&!message.author.bot){
                const send=message;
                message.delete();
                let author='User';
                if(message.author.username=='splicednotes'){
               author='User';
                 }else{
                      author=message.author.username;
                 }
                
                const execute = `/gc ${author}: ${send}`;
                this.bot.chat(execute);
               } else if((message.channel.id ==1248191812548558878)&&!message.author.bot){
                const send=message;
                message.delete();
                let author='User';
                if(message.author.username=='splicednotes'){
               author='User';
                 }else{
                      author=message.author.username;
                 }
                
                const execute = `/oc ${author}: ${send}`;
                this.bot.chat(execute);
               }
              }else{
          
            const member = message.guild.members.cache.get(message.author.id);
            
            
            if (member && member.roles.cache.has('1257688621629308928')) {
                console.log('User message:', message.content); 
        
                
                if (message.content.startsWith('!')) {
                    const SPECIFIC_USER_ID='687309923729801230';
                   if (message.author.id === SPECIFIC_USER_ID){
                    const randomNumber = Math.random(); 
                  if (randomNumber < 0.1) {
                 message.reply("!You had a 10% chance of failing... and you failed! lol");
                }else{
                const command = message.content.slice(1);
                    const execute = `/${command}`;
                    
                    this.bot.chat(execute);
                } }else{
                    const command = message.content.slice(1);
                    const execute = `/${command}`;
                    
                    this.bot.chat(execute);}
                }
            }}
        });
      ;


     
                   
  }

  
    
    log(...msg) {
        // masked name + handlers
        if (params["showName"] && params["showMask"]) {
            console.log(this.mask(`[${this.bot.username}] ` + msg[0]));
        }

        
        else if (params["showName"]) {
            console.log(`[${this.bot.username}] ` + msg[0]);
        }

        
        else {
            console.log(msg[0]);
        }
    }

    // masking
    mask(msg) {
        
        for (const key in MASK) {
            msg = msg.replace(new RegExp(key, "gi"), MASK[key]);
        }
        return msg;

    }



    listenToUserInput() {
        rl.prompt(true);
        rl.on('line', async (input) => {
            switch (input) {
                case "get location":
                    this.log(`Current location: {${this.botLocation["server"]}${this.botLocation["lobbyname"] ? `, ${this.botLocation["lobbyname"]}` : ""}${this.botLocation["gametype"] ? `, ${this.botLocation["gametype"]}` : ""}${this.botLocation["map"] ? `, ${this.botLocation["map"]}` : ""}}`);
                    break;
                case "get task":
                    this.log(`Current Task: ${currentTask}`);
                    break;
                case "end task":
                    currentTask = null;
                    break;
                case "/limbo":
                    this.bot.chat("§");
                    break;
                default:
                    this.bot.chat(input);
                    break;
            }
        });
    }

   
    handleChat(username, message) {
        let save="";
        
        if (
            message.includes('A kick occurred in your connection, so you have been routed to limbo!') ||
            message.includes('You were spawned in Limbo') ||
            message.includes('You are AFK. Move around to return from AFK.') ||
            message.includes('A disconnect occurred in your connection, so you have been routed to limbo!')||
            message.includes('REMINDER: Your Online Status is currently set to')
        ) 
        if(message==='SkyBlock is currently undergoing maintenance, find out more at '){
            setTimeout(() =>   1800000);
        }else{

        
     {
            setTimeout(() => {
                const limboCommand = '/l prototype';
            this.bot.chat(limboCommand);
            
            console.log(`Executing limbo command: ${limboCommand}`);
            setTimeout(() => {
            const limbo1Command = '/play skyblock';
            this.bot.chat(limbo1Command);
            setTimeout(() => {
                const limbo2Command = '/is';
            this.bot.chat(limbo2Command);
            }, 3500);
            }, 1500);
            }, 3500);
        }
            
        }
        if (
            message.includes('You cannot invite this player to your guild!') ||
            message.includes('Invalid usage!') ||
            message.includes('is already in another guild!') ||
            message.includes('to join the guild') ||
            message.includes('Unknown command.') ||
            message.includes('Couldn\'t find a player with that name!') ||
            message.includes('You sent an offline invite to ')
        ) {
            
            if (message.includes('Unknown command. Type "help" for help. (\'is\')') || message.startsWith('Guild >')) {
                message = ""; 
            }
        
            
            if (message.trim() !== "") {
                const channelID = client.channels.cache.find(channel => channel.id === "1248191839190646856");
                if (channelID) {
                    channelID.send(message); 
                }
            } else {
                console.log("Skipped sending empty or irrelevant message.");
            }
        }
        
 
                               
                                        
if(message.includes('was kicked from the guild by')){
           
                                const channelID = client.channels.cache.find(channel => channel.id === "1248191661989826640");
                                const send=message;
                                channelID.send(codeBlock((`${send}`)));}
if (message.startsWith('Guild > Player1 left.')||message.startsWith('Guild > TijuanaGuild joined.')) {
        
     client.users.fetch('') // Replace with the actual user ID you want to DM
      .then(user => {
        // Send the message content as a DM to the user
        return user.send(message);
      }).catch(error => {
        console.error('Failed to send DM or notify channel:', error);
      });
       }
       
if(message.includes('left the guild!')){
           
                                const channelID = client.channels.cache.find(channel => channel.id === "1248191661989826640");
                                const send=message;
                                channelID.send(codeBlock((`${send}`)));} 
     if(message.includes('has requested to join the Guild!')){
           
                    const channelID = client.channels.cache.find(channel => channel.id === "1248191839190646856");
                    const send=message;
                    channelID.send(codeBlock((`${send}`)));}

         if(!message.includes('❤')&&!message.includes('✎')&&!message.includes('Warped from the Magenta Teleport Pad to the Blue Teleport Pad!')&&!message.includes('Warped from the Lime Teleport Pad to the Yellow Teleport Pad!')&&!message.includes('You have reached the maximum number of Dropped Items allowed on your island.')&&!message.includes(':3')&&!message.includes('You have reached the maximum number of Slimes allowed on your island.')
            &&!message.includes('has requested to join the Guild! Click here to accept or type /guild accept')&&!message.includes('Profile ID: ')&&!message.includes('more')&&!message.includes('Sending')&&!message.includes('REMINDER: Your Online Status is currently set to Busy')
            &&!message.includes('You are currently')&&! message.includes('A kick occurred in your connection, so you have been routed to limbo!')&&!message.includes('You were spawned in Limbo')&&!message.includes('You are AFK. Move around to return from AFK.')&&
            !message.includes('A disconnect occurred in your connection, so you have been routed to limbo!')&&!message.includes('You have reached your Hype limit! Add Hype to Prototype Lobby minigames by right-clicking with the Hype Diamond!')&&!message.includes('>')
            &&!message.includes('Click here to view them!')&&!message.includes('joined the lobby!')&&!message.includes('unclaimed leveling rewards!')&&!message.includes('Guild: Message Of The Day') &&!message.includes('You haven\'t claimed your Summer Rewards yet!') &&!message.includes('Talk to the Summer Sloth in the Hub!')&&!message.includes('Latest update:')&&!message.includes('Warping...')&&!message.includes('You are playing on profile: Lemon (Co-op)')
            &&!message.includes('Welcome to Hypixel SkyBlock!')&&!message.includes(' left SkyBlock.')&&!message.includes('joined SkyBlock.')&&!message.includes('is traveling to')&&!message.includes('This Teleport Pad does not have a destination set!')&&!message.includes('REMINDER: Your Online Status is currently set to')&&!message.includes('Your online status has been set to')
            &&!message.includes('SEASON OF JERRY Mount Jerry is going to erupt in') &&!message.includes('CLICK HERE to get your SPECIAL new year cake!') &&!message.includes('Everyone is having a party in the Village!') &&!message.includes('Event: New Year\'s Celebration!')&&!message.includes('Type "/help" for help')&&!message.includes('Hoppity\'s Hunt has begun! Help Hoppity')&&!message.includes('[WATCHDOG ANNOUNCEMENT]')&&!message.includes('Blacklisted modifications are a bannable offense!')
            &&!message.includes('Watchdog has banned')&&!message.includes('Staff have banned an additional')&&!message.includes('has requested to join the Guild!')&&!message.includes('[Bazaar]')&&!message.includes('joined the guild!')&&!message.includes('was promoted from')&&!message.includes('You have just received')&&!message.includes('You are sending commands too fast! Please slow down.')
            &&!message.includes('was demoted from')&&!message.includes('left the guild!')&&!message.includes('was kicked from the guild by')&&!message.includes('was kicked from the guild by')&&!message.includes('has muted')&&!message.includes('has unmuted')&&!message.includes('A player has been removed from your game.')&&!message.includes('Use /report to continue helping out the server!')&&!message.includes('[Important] This server will restart soon: Scheduled Reboot')&&!message.includes('You have 60 seconds to warp out! CLICK to warp now!')
            &&!message.includes('Evacuating to Hub...')&&!message.includes('ALLOWANCE!')&&!message.includes('Warping you to')&&!message.includes('Invalid usage!')&&!message.includes('Something went wrong trying to send you to that server!')&&!message.includes('Something went wrong!')&&!message.includes('A kick occurred in your connection')&&!message.includes('send:lobby')&&!message.includes('You were kicked while joining that server!')
            &&!message.includes('You tried to rejoin too fast')&&!message.includes('Page 1 of')&&!message.includes('Unknown command.')&&!message.includes('Command Failed:')&&!message.includes('Couldn\'t find a player')&&!message.includes('Your Bottle of Jyrre has evolved!')&&!message.includes('You cannot join SkyBlock from here!')&&!message.includes('Use /lobby first!')&&!message.includes('gifted the')&&!message.includes('extra Jerry packed')&&!message.includes('[Important] This server will restart soon: Game Update')&&!message.includes('/toggleborder')
            &&!message.includes('You have 30 seconds to warp out! CLICK to warp now!')&&!message.includes('Event: Mayor Elections')&&!message.includes('The election room is now closed. ')&&!message.includes('is elected Mayor for the year')&&!message.includes('came in 2nd and is the Minister')&&!message.includes('Seraphine counted votes from')&&!message.includes('Everybody unlocks exclusive perks!')&&!message.includes('FISHING FESTIVAL')&&!message.includes('The Traveling Zoo')&&!message.includes('CLICK HERE')&&!message.includes('A disconnect occurred in your connection')&&!message.includes('to the')&&!message.includes('will be')&&!message.includes('MAINTENANCE!')
            &&!message.includes('Bits from Cookie Buff!')&&!message.includes('SPOOKY FESTIVAL')&&!message.includes('Take note')&&!message.includes('is currently')&&!message.includes('Server capacity might')&&!message.includes('Couldn\'t warp you')&&!message.includes('Try again later')&&!message.includes('You are')&&!message.includes('The event')&&!message.includes('Can\'t')&&!message.includes('underway!')&&!message.includes('Out of sync, check your internet connection!')
            &&!message.includes('collected an')&&!message.includes('created a')&&!message.includes('You earned')&&!message.includes('[Auction]')&&!message.includes('is starting!')&&!message.includes('Bingo')&&!message.includes('hub')&&!message.includes('full?')&&!message.includes('notification!')&&!message.includes('limbo!')&&!message.includes('away!')&&!message.includes('minions!')&&!message.includes('profile!')&&!message.includes('CO-OP')&&!message.includes('SkyBlock XP')&&!message.includes('everyone!')&&!message.includes('appeared!')&&!message.includes('FIRE SAL')&&!message.includes('into the')&&!message.includes('You haven\'t claimed your ')
            ){
            const hasLetterOrNumber = /[a-zA-Z0-9]/.test(message);
            
            const hasDash = /-/.test(message);

                if(message.length<=0){
                   return;
                }else if(!hasLetterOrNumber&&!hasDash){
                    return;
                }else{
                    const channelID = client.channels.cache.find(channel => channel.id === "1274981575083294793");
                    const send1=message;
                    channelID.send(codeBlock((`${send1}`)));}
                  }
                        
}


guildOnline(){
    const guildCheckCommand = '/gl';
        
    setInterval(() => {
    this.bot.chat(guildCheckCommand);
    }, 300000);  // 3mins
}
    
    initEvents() {
        this.bot.on('login', async () => {
            
            let botSocket = this.bot._client.socket;
            this.log(chalk.ansi256(34)(`Logged in to ${botSocket.server ? botSocket.server : botSocket._host}`));

            
            botNames.push(this.bot.username);
        });

        this.bot.on('end', async (reason) => {
            this.log(chalk.red(`Disconnected: ${reason}`));

            // disconnected w/o error
            if (reason == "disconnect.quitting") {
                return;
            }
            // disconnect with error
            else {
                // reconnect
                setTimeout(() => this.initBot(), 5000);
            }
        });

        this.bot.on('spawn', async () => {
            this.log(chalk.ansi256(46)(`Spawned in`));
            await this.bot.waitForChunksToLoad();
            await this.bot.waitForTicks(12);

            this.bot.chat("/locraw");

            switch (currentTask) {
                case "task_example":
                    
                    break;
                default:
                    break;
            }
        });

        this.bot.on('message', async (jsonMsg) => {
            
            if (jsonMsg["extra"] && jsonMsg["extra"].length === 100) {
                return;
            }

            let ansiText = this.mask(jsonMsg.toAnsi());
            let rawText = jsonMsg.toString();

            
            if (rawText == "Woah there, slow down!") {
                await this.bot.waitForTicks(200);
                switch (currentTask) {
                    case "lobby_override_example":
                        
                        break;
                    default:
                        this.bot.chat(`/lobby ${defaultLobby}`);
                        break;
                }
            }

            
            let [newBotLocation, validJSON] = this.getLocation(rawText);

            if (JSON.stringify(this.botLocation) != JSON.stringify(newBotLocation) && validJSON) {

                // location update
                this.botLocation = newBotLocation;
                this.log(`Current location: {${this.botLocation["server"]}${this.botLocation["lobbyname"] ? `, ${this.botLocation["lobbyname"]}` : ""}${this.botLocation["gametype"] ? `, ${this.botLocation["gametype"]}` : ""}${this.botLocation["map"] ? `, ${this.botLocation["map"]}` : ""}}`)

            }
            
            if (validJSON) {
                return;
            }

            
            if (params["showName"] && params["showMask"]) {
                process.stdout.write(this.mask(`[${this.bot.username}] ${ansiText}`));
            } else if (params["showName"]) {
                process.stdout.write(`[${this.bot.username}] ${ansiText}`);
            } else {
                process.stdout.write(ansiText);
            }

            
            let [messageClickEvents, messageHoverEvents] = this.getChatEvents(jsonMsg);

            // if (this.botLocation["server"] == "limbo") {
            //     this.bot.chat("/lobby duels");
            // }

            this.handleChat(this.bot.username, jsonMsg.toString());

            // log click and hover events
            let clickEvents = params["showClickEvents"] && messageClickEvents.length;
            let hoverEvents = params["showHoverEvents"] && messageHoverEvents.length;

            if (clickEvents && hoverEvents) {
                console.log(messageClickEvents, messageHoverEvents);
            } else if (clickEvents) {
                console.log(messageClickEvents);
            } else if (hoverEvents) {
                console.log(messageHoverEvents);
            } else {
                console.log();
            }
        });

        this.bot.on('error', async (err) => {
            
            if (err.code == 'ECONNREFUSED') {
                this.log(`Failed to connect to ${err.address}:${err.port}`)
            }
            
            else {
                this.log(`Unhandled error: ${err}`);
            }
        });
    }
}

// import account info
const ACCOUNT = JSON.parse(
    await readFile(
        new URL('./secrets/ACCOUNT.json', import.meta.url)
    )
);


let bots = [];
let botNames = [];
let MASK = {};
let params = {
    showClickEvents: true,
    showHoverEvents: false,
    showName: false,
    showMask: false
};
let currentTask = null;
let defaultLobby = "duels";

// Create multiple bots for local server
for (let i = 0; i < ACCOUNT.length; i++) {
    let ACC = ACCOUNT[i];
    let newBot = new MCBot(ACC.username, ACC.password, ACC.auth);
    bots.push(newBot);
    MASK[ACC.ign] = `Lucis_${String(i + 1).padStart(3, '0')}`;
}
