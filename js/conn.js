const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      const res = await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      // Check if response is actually JSON before parsing
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response. Function may not be deployed.');
      }

      const result = await res.json();

      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Sent!',
          text: 'Your message has been sent successfully.',
          showConfirmButton: false,
          timer: 2000
        });
        form.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: result.message || 'There was a problem sending your message.',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: err.message || 'Something went wrong. Please check your connection.',
      });
      console.error(err);
    }
  });
}