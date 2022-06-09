export default function convertCamelCaseToTitleCase(string) {
  // Also retains case of consecutive uppercase letters:
  // e.g., 'userID' to 'User ID'
  return string
    .replace(/((?<!^)[A-Z](?![A-Z]))(?=\S)/g, ' $1')
    .replace(/^./, s => s.toUpperCase());
}
