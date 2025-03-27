const cpfInput = document.getElementById("cpf");
const phoneInput = document.getElementById("phone");

const cpfError = document.getElementById("cpfError");
const phoneError = document.getElementById("telefoneError");
const form = document.getElementById("cadastroForm");

async function request_api(cpf, phone) {
    cpfError.style.display = 'none'
    phoneError.style.display='none'

  try {
    // Send POST request to the API
    const response = await fetch("http://localhost:5000/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cpf: cpf,
        phone: phone,
      }),
    });

    // Parse the JSON response
    const data = await response.json();

    // Check the response status
    if (response.ok) {
      alert("Login Successful!");
      console.log(data);
    } else {
      alert("Falhou");

      if(data.message.slice(0, 3) === 'CPF')
      {
        cpfError.style.display = 'block'
      }
      else phoneError.style.display = 'block'
    }
    
  } catch (error) {
    // Network error or other issues
    console.error("Error:", error);
  }
}

// Evento de submit do formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const cpf = cpfInput.value;
  const phone = phoneInput.value;

  request_api(cpf, phone);
});
