export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const binId = '67e29bd18960c979a577fdbc'; // Your JSONBin ID
    const apiKey = '$2a$10$nDTGN6HF3fw9qohE1k/uV.KC6T8t4HJUxt4aOmLkN/m7ksJ9HSGvG'; // Your JSONBin key

    // Get existing data
    const getResponse = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      headers: { 'X-Master-Key': apiKey }
    });

    const existingData = (await getResponse.json()).record || [];

    // Add new entry
    const newData = [...existingData, req.body];

    // Save updated data
    await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': apiKey
      },
      body: JSON.stringify(newData)
    });

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ success: false, message: 'Database error' });
  }
}
