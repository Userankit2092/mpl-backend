async function handleRegistration(event) {
    event.preventDefault();

    const startDate = new Date('2026-10-01');
    const endDate = new Date('2026-10-15T23:59:59');
    const currentDate = new Date();

    if (currentDate < startDate || currentDate > endDate) {
        alert("पंजीकरण की समय सीमा समाप्त हो गई है या अभी शुरू नहीं हुई है।");
        return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const regNumber = `MPL2026-${randomNum}`;

    const formData = {
        regNumber: regNumber,
        playerName: document.getElementById('playerName').value,
        mobile: document.getElementById('mobile').value,
        age: document.getElementById('age').value,
        address: document.getElementById('address').value,
        role: document.getElementById('role').value,
        tshirtSize: document.getElementById('tshirtSize').value,
        utrNumber: document.getElementById('utrNumber').value
    };

    try {
        // जब आप Render पर बैकएंड लाइव करेंगे, तो यहाँ Render का लिंक डालेंगे
        const response = await fetch('https://your-backend-name.onrender.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (result.success) {
            document.getElementById('regNumberDisplay').innerText = regNumber;
            document.getElementById('successModal').style.display = 'block';
        } else {
            alert("पंजीकरण में कुछ समस्या, कृपया पुनः प्रयास करें।");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("सर्वर से कनेक्ट नहीं हो पा रहा है।");
    }
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
    document.getElementById('registrationForm').reset();
}
