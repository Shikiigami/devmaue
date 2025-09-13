// netlify/functions/submit-form.js
exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    console.log("Form data received:", data);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // allow frontend
      },
      body: JSON.stringify({
        success: true,
        message: "Form submitted successfully!",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: false,
        message: "Server error. Please try again later.",
      }),
    };
  }
};
