// src/pages/About.js
import './About.css';
import React from "react";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Health Check Pro</h1>
      <p>
        <strong>Health Check Pro</strong> is a comprehensive health management
        platform designed to provide users with personalized health assessments,
        track their well-being over time, and offer valuable insights to improve
        their lifestyle.
      </p>

      <h2>Features of Health Check Pro</h2>
      <ul>
        <li>
          <strong>Personalized Health Assessments:</strong> Receive health
          evaluations based on physical fitness, mental well-being, and nutrition.
        </li>
        <li>
          <strong>Weekly Health Quizzes:</strong> Engage with weekly MCQs to
          test and improve your health knowledge.
        </li>
        <li>
          <strong>Health Status Monitoring:</strong> Monitor your health score
          with regular feedback and suggestions.
        </li>
        <li>
          <strong>Interactive Dashboard:</strong> View your progress through
          visual graphs and track your health trends over time.
        </li>
        <li>
          <strong>AI Chatbot:</strong> An interactive AI chatbot to answer your
          health-related queries and provide instant feedback.
        </li>
        <li>
          <strong>Leaderboard:</strong> Compare your health progress with others
          to stay motivated.
        </li>
        <li>
          <strong>Dark Mode & Light Mode:</strong> Customize the app's theme for
          a comfortable user experience.
        </li>
      </ul>

      <h2>Mission</h2>
      <p>
        The mission of Health Check Pro is to empower users with the tools and
        resources needed to take control of their health. Whether you're
        tracking your fitness, monitoring your nutrition, or just trying to
        improve your mental health, our platform offers a holistic solution for
        managing your well-being.
      </p>

      <h2>Our Vision</h2>
      <p>
        We envision a world where people can easily access personalized health
        information and take proactive steps to improve their overall well-being.
        With the help of modern technology, we aim to make health management
        more accessible, engaging, and effective.
      </p>
    </div>
  );
};

export default About;
