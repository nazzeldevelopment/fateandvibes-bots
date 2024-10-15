import fs from 'fs';
import path from 'path';

// Define the path to the flashcards file
const flashcardsFile = path.resolve('./flashcards.json');

// Sample USB flashcards data (Optional: Can be removed if using JSON file)
const usbFlashcards = [
    {
        question: "What is USB?",
        answer: "USB (Universal Serial Bus) is a standard for communication between devices and peripherals."
    },
    {
        question: "What are the types of USB connectors?",
        answer: "The main types of USB connectors are USB-A, USB-B, USB-C, Micro USB, and Mini USB."
    },
    {
        question: "What is the maximum data transfer speed of USB 3.0?",
        answer: "The maximum data transfer speed of USB 3.0 is 5 Gbps."
    },
    {
        question: "What does USB OTG stand for?",
        answer: "USB OTG stands for USB On-The-Go, allowing USB devices to act as a host."
    },
    {
        question: "What is the purpose of USB hubs?",
        answer: "USB hubs allow multiple USB devices to connect to a single USB port."
    }
];

// Function to send a random USB flashcard
export async function flashcardCommand(ctx) {
    const randomIndex = Math.floor(Math.random() * usbFlashcards.length);
    const flashcard = usbFlashcards[randomIndex];

    // Send the flashcard to the user
    ctx.reply(`Question: ${flashcard.question}\nAnswer: ${flashcard.answer}`);
}

// Export as default;
export default flashcardCommand;