
// generates ref no sucesssful for every transaction on the app

export function generateReferenceNumber() {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substr(2, 8);
    const referenceNumber = `${timestamp}-${randomString}`;
    return referenceNumber;
  }
  
  // Example usage
  const referenceNumber = generateReferenceNumber();
  console.log(referenceNumber);
  