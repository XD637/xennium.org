// pages/api/hello.js

export default function handler(req, res) {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin'); // Adjust based on your use case
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp'); // Require corp policy
    res.status(200).json({ message: 'Hello from the API!' });
}
