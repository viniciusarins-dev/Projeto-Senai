// =========================================
// CONFIGURAÇÃO
// =========================================
// Número de WhatsApp de destino, no formato DDI + DDD + número (somente dígitos).
// Ex: 55 (Brasil) + 47 (DDD) + 999999999 (número)
const WHATSAPP_NUMBER = "5547999999999"; // TODO: substitua pelo número real

// =========================================
// REFERÊNCIAS DOS ELEMENTOS
// =========================================
const form = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const descriptionInput = document.getElementById("description");

const nameField = nameInput.closest(".field");
const phoneField = phoneInput.closest(".field");
const descriptionField = descriptionInput.closest(".field");

const nameError = document.getElementById("name-error");
const phoneError = document.getElementById("phone-error");
const descriptionError = document.getElementById("description-error");

// =========================================
// MÁSCARA DE TELEFONE: (99) 99999-9999
// =========================================
function applyPhoneMask(value) {
  // Mantém apenas dígitos e limita a 11 (DDD + 9 dígitos)
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

phoneInput.addEventListener("input", (event) => {
  event.target.value = applyPhoneMask(event.target.value);
});

// =========================================
// FUNÇÕES DE VALIDAÇÃO
// =========================================
function setFieldError(field, errorSpan, message) {
  field.classList.add("invalid");
  errorSpan.textContent = message;
}

function clearFieldError(field, errorSpan) {
  field.classList.remove("invalid");
  errorSpan.textContent = "";
}

function validateName() {
  const value = nameInput.value.trim();
  if (value === "") {
    setFieldError(nameField, nameError, "Por favor, informe seu nome completo.");
    return false;
  }
  clearFieldError(nameField, nameError);
  return true;
}

function validatePhone() {
  const digits = phoneInput.value.replace(/\D/g, "");
  if (digits.length !== 11) {
    setFieldError(phoneField, phoneError, "Informe um telefone válido: (99) 99999-9999.");
    return false;
  }
  clearFieldError(phoneField, phoneError);
  return true;
}

function validateDescription() {
  const value = descriptionInput.value.trim();
  if (value === "") {
    setFieldError(descriptionField, descriptionError, "Descreva o serviço que você precisa.");
    return false;
  }
  clearFieldError(descriptionField, descriptionError);
  return true;
}

// =========================================
// ENVIO DO FORMULÁRIO
// =========================================
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isNameValid = validateName();
  const isPhoneValid = validatePhone();
  const isDescriptionValid = validateDescription();

  if (!isNameValid || !isPhoneValid || !isDescriptionValid) {
    return;
  }

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const description = descriptionInput.value.trim();

  const message =
    `Olá! Meu nome é ${name}. ` +
    `Telefone: ${phone}. ` +
    `Serviço desejado: ${description}`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
});

// =========================================
// LIMPA O ERRO ASSIM QUE O USUÁRIO CORRIGE O CAMPO
// =========================================
nameInput.addEventListener("input", () => {
  if (nameField.classList.contains("invalid")) validateName();
});

phoneInput.addEventListener("input", () => {
  if (phoneField.classList.contains("invalid")) validatePhone();
});

descriptionInput.addEventListener("input", () => {
  if (descriptionField.classList.contains("invalid")) validateDescription();
});
