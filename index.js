const express=require("express");
const {MongoClient} =require("mongodb");

const app=express();
const port = 3000;

// midelware
app.use(express.json());
const urlDB="mongodb+srv://achtchy22015:achtchy1234@cluster0.xmprnpg.mongodb.net/?retryWrites=true&w=majority";
const client=new MongoClient(urlDB);

// Creation et lancement de serveur
app.listen(port,()=>{
    console.log("Server is running in port :"+port)
})


// Ouverture d'une connexion avec MongoDB
client.connect()
    .then(()=>{
        console.log("connected  to MongoDB Client")
    })
    .catch(err=>{
        console.error("error de connexion");
    })


// Get all equipes
app.get('/equipes',async (req,res)=>{
    const collection=client.db("cloudDB").collection("equipe");

    try {
        const listeEquipes= await collection.find({}).toArray();
        res.status(200).json(listeEquipes);
        
    } catch (error) {
        console.error(error);
        res.send(error);
    }

})


// Get Equipe By Id
app.get('/equipes/:id',async (req,res)=>{

    const id=parseInt(req.params.id);
    const collection=client.db("cloudDB").collection("equipe");

    try {
        const equipe=await collection.findOne({id});
        res.status(200).json(equipe);
    } catch (error) {
        res.status(500).send(error);
    }
})


app.post('/equipes',async (req,res)=>{

    const addedEquipe=req.body;
    const collection=client.db("cloudDB").collection("equipe");
    try {

       const equipe=await  collection.insertOne(addedEquipe);
        res.status(200).json(equipe);
        
    } catch (error) {
        res.send(error);
    }


})

// Supprimer  equipe by Id
app.delete('/equipes/:id', async (req,res)=>{

    const id=parseInt(req.params.id);
    const collection=client.db("cloudDB").collection("equipe");
    try {
       const deletedEquipe= await collection.deleteOne({id});
       res.status(200).json(deletedEquipe);
    } catch (error) {
        res.send(error);
    }
})


app.put('/equipes/:id',async (req,res)=>{
    const id=parseInt(req.params.id);
    const ModifiedEquipe=req.body;
    const collection= client.db("cloudDB").collection("equipe");
    try {
        const mdEqu=await collection.replaceOne({id},ModifiedEquipe);
        res.status(200).json(mdEqu);
    } catch (error) {
        res.send(error);
    }
})


// Get Equipe By Name
app.get('/equipes/name/:name', async (req, res) => {
    const equipeName = req.params.name;
    const collection = client.db("cloudDB").collection('equipe');
  
    try {
      const equipe = await collection.findOne({ name: equipeName });
      if (equipe) {
        res.status(200).json(equipe);
      } else {
        res.status(404).json({ error: 'Equipe not found' });
      }
    } catch (error) {
      console.error('Error fetching equipe by name:', error);
      res.status(500).json({ error: 'Error fetching equipe by name' });
    }
  });








