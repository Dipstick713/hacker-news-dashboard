# HN DASHBOARD

A real-time Hacker News intelligence dashboard featuring AI-driven sentiment analysis, tech trend monitoring, and velocity tracking.

## Overview

The HN Dashboard provides a high-fidelity view of current technology trends and community sentiment by analyzing the Hacker News front page. It utilizes the Groq AI API to provide deep insights into the underlying narrative of the tech ecosystem.

## Core Features

- Real-Time Live Feed: Direct integration with the Hacker News API for up-to-the-minute story tracking.
- AI Intelligence Pipeline: Sentiment analysis and executive summaries powered by Llama 3 via Groq.
- Social Bias Gauge: Visual representation of community sentiment (Skeptical vs Excited).
- Tech Density Analysis: Automated tracking of trending technologies and frameworks.
- Momentum Tracking: Real-time calculation of story points, comments, and hourly velocity.
- Historical Context: Automated retrieval of significant historical stories for comparative analysis.

## Tech Stack

- Frontend: React 18, TypeScript, Vite
- Styling: Tailwind CSS
- Animation: Framer Motion
- Icons: Lucide React
- AI: Groq Service (Llama-3 model)

## Setup and Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configuration:
   Create a `.env` file in the root directory and add your Groq API key:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```
4. Development Mode:
   ```bash
   npm run dev
   ```
5. Production Build:
   ```bash
   npm run build
   ```

## Black Protocol Architecture

The dashboard implements a high-contrast design language inspired by tactical intelligence systems. It uses a custom bento-grid layout for optimal information density and real-time path animation for waveform visualizations.
