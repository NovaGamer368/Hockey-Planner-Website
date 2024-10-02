const {mongoose, Schema, mongo } = require('mongoose');

const dataBaseCollection = '/OvalHockey' 
const connectionString = `mongodb+srv://dev:PY2dekImYna2dCSf@cluster0.vqku4.mongodb.net${dataBaseCollection}`

mongoose.connect(connectionString, {useUnifiedTopology: true, useNewUrlParser: true })
const connected = mongoose.connection;

//Connecting to MongoDB
connected.once("open", () => {
    console.log("Connected too... Mongo Atlas!" )
})

//Schema's
const team = new Schema(
    {
        Name: String,
        Wins: Number,
        Loses: Number,
        Ties: Number,
        StandingScore: Number, 
        GamesPlayed: Number
    },
    { collection: "Teams"}
) 

const teamModel = mongoose.model('team', team)

const userKey = new Schema(
    {
        Username: String,
        Email: String,
        Password: String,
        Key: String
    },
    { collection: "Users"}
)
const usersModel = mongoose.model("user", userKey)

exports.DAL = {
    CreateTeam: async (newTeam) => {
        if(newTeam.Name != "")
        {
            const team = 
            {
                Name: newTeam.Name,
                Wins: 0,
                Loses: 0,
                Ties: 0,
                StandingScore: 0,
                GamesPlayed: 0
            }
            return await teamModel.collection.insertOne(team)
        }
        else
        {
            return {Message: 'Team needs to have a name'}
        }
    },
    GetAllTeams: async () => {
        let filter = {}
        return await teamModel.find(filter).exec()
    },
    GetTeamById: async(id) => {
        let filter = {
            _id: id
        }
        return await teamModel.findOne(filter).exec()
    },
    UpdateTeamGames: async (id, newScores) => {
        let filter = {
            _id: id
        }
        return await teamModel.updateOne(filter, newScores)
    },
    DeleteTeam: async (id) => {
        let filter = {
            _id: id
        }
        return await teamModel.deleteOne(filter).exec()
    },
    CreateApiUserKey: async (username, email, password, key) => {
        let newUser = {
            Username: username,
            Email: email,
            Password: password,
            Key: key
        }
        await usersModel.collection.insertOne(newUser)
    },
    getUserEmail: async (email) => {
        const filter = {"Email": email}
        let result = await usersModel.findOne(filter).exec();
        return result
    },
    getUser: async (email, password) => {
        const filter = {
            "Email": email,
            "Password": password
        }
        let result = await usersModel.findOne(filter).exec();
        return result
    },
    getUserByKey: async(key) =>
    {
        const filter = {"Key": key}
        let result = await usersModel.findOne(filter).exec()
        return result
    },
    isKeyFound: async (key) => {
        filter = {"Key" : key}
        const result = await usersModel.collection.findOne(filter)
        if (result != null)
        {
            return true
        }
        else
        {
            return false
        }
    }
}
