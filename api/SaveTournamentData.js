export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { firstName, lastName, username, email, number, tournament, isNew, refer } = req.body;

        if (!firstName || !lastName || ! username || !email || !number || !tournament || !isNew) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        try {
            const binId = '67e29bd18960c979a577fdbc';
            const apiKey = '$2a$10$nDTGN6HF3fw9qohE1k/uV.KC6T8t4HJUxt4aOmLkN/m7ksJ9HSGvG';

            // Fetch existing tournament data
            const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
                headers: { 'X-Master-Key': apiKey }
            });

            const { record: existingData = [] } = await getResponse.json();

            // Add new tournament registration
            const newData = [...existingData, { firstName, lastName, username, email, number, tournament, isNew, refer: new Date() }];

            // Save updated data
            const putResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'X-Master-Key': apiKey },
                body: JSON.stringify(newData)
            });

            const result = await putResponse.json();

            if (result.metadata) {
                return res.status(200).json({ success: true, message: 'Registration successful!' });
            } else {
                throw new Error('Failed to save tournament data');
            }
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
