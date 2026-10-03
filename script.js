document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm') || document.querySelector('form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Form ke input fields se data lena (apne HTML IDs ke hisaab se check kar lein)
      const teamName = document.getElementById('teamName')?.value.trim() || '';
      const captainName = document.getElementById('captainName')?.value.trim() || '';
      const phone = document.getElementById('phone')?.value.trim() || '';
      const utr = document.getElementById('utr')?.value.trim() || '';

      if (!teamName || !captainName || !phone || !utr) {
        alert('कृपया सभी अनिवार्य जानकारी (टीम का नाम, कप्तान का नाम, मोबाइल नंबर, UTR) भरें।');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'सबमिट हो रहा है...';
      }

      try {
        const response = await fetch('https://mpl-backend-7y18.onrender.com/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ teamName, captainName, phone, utr })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          alert('बधाई हो! रजिस्ट्रेशन सफलतापूर्वक हो गया है। आपका रजिस्ट्रेशन आईडी है: ' + data.registrationId);
          form.reset();
          window.location.reload();
        } else {
          alert(data.message || 'रजिस्ट्रेशन में त्रुटि हुई, कृपया पुनः प्रयास करें।');
        }
      } catch (error) {
        console.error('Connection Error:', error);
        alert('सर्वर स्लीप मोड से जाग रहा है। कृपया 10-20 सेकंड इंतज़ार करके दोबारा 'पंजीकरण जमा करें' पर क्लिक करें।');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'पंजीकरण जमा करें';
        }
      }
    });
  }
});
