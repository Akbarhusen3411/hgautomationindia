/**
 * Post-build Obfuscation Script
 * Obfuscates all JavaScript files in the build folder
 */

const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build', 'static', 'js');

// Obfuscation configuration - High security settings
const obfuscatorConfig = {
  // Compact code into single line
  compact: true,

  // Control flow flattening makes code flow harder to understand
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,

  // Dead code injection adds fake code
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,

  // Debug protection prevents debugging
  debugProtection: true,
  debugProtectionInterval: 2000,

  // Disable console output
  disableConsoleOutput: true,

  // Domain lock - restricts code execution to specific domains
  domainLock: ['hgautomationindia.com', 'www.hgautomationindia.com', 'akbarhusen3411.github.io'],

  // Identifier names generator
  identifierNamesGenerator: 'hexadecimal',

  // Log protection
  log: false,

  // Numbers to expressions
  numbersToExpressions: true,

  // Rename globals
  renameGlobals: false,

  // Self defending - code becomes non-functional if formatted
  selfDefending: true,

  // Simplify code
  simplify: true,

  // Split strings into chunks
  splitStrings: true,
  splitStringsChunkLength: 5,

  // String array encoding
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayCallsTransformThreshold: 0.75,
  stringArrayEncoding: ['base64', 'rc4'],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 2,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 4,
  stringArrayWrappersType: 'function',
  stringArrayThreshold: 0.75,

  // Transform object keys
  transformObjectKeys: true,

  // Unicode escape sequence
  unicodeEscapeSequence: false,
};

// Function to obfuscate a single file
function obfuscateFile(filePath) {
  try {
    console.log(`Obfuscating: ${path.basename(filePath)}`);

    const code = fs.readFileSync(filePath, 'utf8');

    // Skip already minified vendor chunks that might cause issues
    if (code.length > 500000) {
      console.log(`  Skipping large file: ${path.basename(filePath)}`);
      return;
    }

    const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, obfuscatorConfig);

    fs.writeFileSync(filePath, obfuscatedCode.getObfuscatedCode());
    console.log(`  ✓ Completed: ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`  ✗ Error obfuscating ${filePath}:`, error.message);
  }
}

// Main function
function main() {
  console.log('\n🔒 Starting code obfuscation...\n');

  if (!fs.existsSync(BUILD_DIR)) {
    console.error('Build directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  // Get all JS files in build directory
  const files = fs.readdirSync(BUILD_DIR).filter(file => file.endsWith('.js'));

  if (files.length === 0) {
    console.log('No JavaScript files found to obfuscate.');
    return;
  }

  console.log(`Found ${files.length} JavaScript file(s) to obfuscate.\n`);

  // Obfuscate each file
  files.forEach(file => {
    const filePath = path.join(BUILD_DIR, file);
    obfuscateFile(filePath);
  });

  console.log('\n✅ Obfuscation complete!\n');
  console.log('Security features applied:');
  console.log('  • Control flow flattening');
  console.log('  • Dead code injection');
  console.log('  • Debug protection');
  console.log('  • Console output disabled');
  console.log('  • Self-defending code');
  console.log('  • String array encoding (Base64 + RC4)');
  console.log('  • Identifier obfuscation');
  console.log('\n');
}

main();
