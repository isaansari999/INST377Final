const express = require('express')
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const path = require('path'); 
require('dotenv').config();


const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname)));

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY

)

app.post('/api/log', async (req, res) => {
    const { breed } = req.body;

    const { error } = await supabase

        .from('search_logs')
        .insert([{ breed }]);


    if (error) {
        return res.status(500).json({ error });
    }

    res.json({ message: 'Search logged'});
})


app.listen(port, () => {

    console.log(`Server is running on port ${port}`)
});