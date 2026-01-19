
// Random Cart Code Generator Function
function generateRandomAlphanumeric(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

// Component to Display Generated Code
const GenerateCartCode = () => {
  const cartCode = generateRandomAlphanumeric();

  return (
    <div>
      <h3>Your Cart Code:</h3>
      <p>{cartCode}</p>
    </div>
  );
};

export default GenerateCartCode;

// Export function separately (if needed somewhere else)
export { generateRandomAlphanumeric };
