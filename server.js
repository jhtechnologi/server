const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  // El mensaje de WhatsApp recibido a través de Auto Reply
  const incomingMessage = req.body;

  try {
    // Envía el mensaje a Botpress usando el webhook proporcionado por Botpress
    const botpressResponse = await axios.post('https://webhook.botpress.cloud/8e3d8c66-9a91-465b-b25d-ed84fd3a9488', incomingMessage);

    // Envía la respuesta de Botpress de vuelta a Auto Reply
    res.json(botpressResponse.data);
  } catch (error) {
    console.error('Error al enviar mensaje a Botpress:', error);
    res.status(500).send('Error procesando el mensaje');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
