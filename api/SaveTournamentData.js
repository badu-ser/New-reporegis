export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.log('Method not allowed');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    console.log('Received data:', req.body);
    
    const binId = '67e29bd18960c979a577fdbc';
    const apiKey = '$2a$10$nDTGN6HF3fw9qohE1k/uV.KC6T8t4HJUxt4aOmLkN/m7ksJ9HSGvG';

    // Get existing data
    const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      headers: { 'X-Master-Key': apiKey }
    });
    
    console.log('JSONBin GET status:', getResponse.status);
    
    const existingData = (await getResponse.json()).record || [];
    console.log('Existing records:', existingData.length);

    // Create new data
    const newData = [...existingData, req.body];
    console.log('New data to save:', newData);

    // Save data
    const putResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey
      },
      body: JSON.stringify(newData)
    });

    console.log('JSONBin PUT status:', putResponse.status);
    const putResult = await putResponse.json();
    console.log('JSONBin PUT response:', putResult);

    if (!putResponse.ok) {
      throw new Error(`JSONBin error: ${putResult.message}`);
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message,
      stack: error.stack 
    });
  }
}
