import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

// jsdom does not implement TextEncoder/TextDecoder, which react-router v7
// requires at import time. Browsers provide these natively.
if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = TextDecoder;
}
