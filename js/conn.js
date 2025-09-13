const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  try {
    const res = await fetch('/.netlify/functions/submit-form', { // ✅ updated URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Sent!',
        text: 'Your message has been sent successfully.',
        showConfirmButton: false,
        timer: 2000
      });
      form.reset(); // Clear form
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'There was a problem sending your message. Please try again.',
      });
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Something went wrong. Please check your connection.',
    });
    console.error(err);
  }
});
