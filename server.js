const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Schema & Model
const registrationSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  captainName: { type: String, required: true },
  phone: { type: String, required: true },
  utr: { type: String, required: true, unique: true },
  registrationId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model('Registration', registrationSchema);

// Registration Route
app.post('/api/register', async (req, res) => {
  try {
    const { teamName, captainName, phone, utr } = req.body;

    if (!teamName || !captainName || !phone || !utr) {
      return res.status(400).json({ success: false, message: 'सभी जानकारी भरना अनिवार्य है।' });
    }

    // Generate Unique Registration ID (MPL2026-XXXX)
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const registrationId = `MPL2026-${randomNum}`;

    const newRegistration = new Registration({
      teamName,
      captainName,
      phone,
      utr,
      registrationId
    });

    await newRegistration.save();

    res.status(201).json({
      success: true,
      message: 'रजिस्ट्रेशन सफलतापूर्वक हो गया है!',
      registrationId
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'यह UTR नंबर पहले से इस्तेमाल हो चुका है।' });
    }
    res.status(500).json({ success: false, message: 'सर्वर में समस्या है, कृपया बाद में प्रयास करें।' });
  }
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
