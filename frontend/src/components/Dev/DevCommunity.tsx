import React, { useState, useEffect } from 'react';
import './DevCommunity.css';

import contributer from "../../images/Become_A_Contributer.png";
import designer from "../../images/Designers.png";
import cohorts from "../../images/OpenSourceCohorts.png";
import workshops from "../../images/WorkShops.png";
import socials from "../../images/Socials.png";
import contribute from "../../images/EasyContributions.png";
import project1 from "../../images/LogoComingSoon.png";
import project2 from "../../images/LogoComingSoon.png";
import project3 from "../../images/LogoComingSoon.png";
import project4 from "../../images/LogoComingSoon.png";
import defaultimage from "../../images/defaultprofileicon.png";

// Project data (same as before)
const projectData: any = {
  "WebClicker++": {
    title: "WebClicker++",
    image: project1,
    description: "WebClicker++ is a mobile‑friendly classroom response system that enables instructors to create courses, deploy timed questions, track attendance, and access detailed analytics, and is widely used in CSE courses at UC San Diego.",
    tags: ["WebClicker++"],
  },
  "Lakewood Heating and AC": {
    title: "Lakewood Heating and AC",
    image: project2,
    description: "Lakewood Heating and Air Conditioning is a website revamp that modernizes the company’s online presence, showcasing HVAC services, community involvement, success stories, integrated reviews, and a custom admin portal for staff.",
    tags: ["Lakewood Heating and AC"],
  },
  "Paesani MBX": {
    title: "Paesani MBX",
    image: project3,
    description: "Paesani MBX Website is a professional platform that showcases the MBX software, a C++ library enabling molecular dynamics drivers to simulate chemical systems using the lab’s potential energy functions, with tutorials, contributor profiles, and publication listings.",
    tags: ["Paesani MBX Website"],
  }
};

// 👇 NEW: Grouped team members by team/project
const allTeamMembers: Record<string, any[]> = {
  "WebClicker++": [
    { name: "John Doe", role: "Frontend Developer", linkedin: "https://linkedin.com/in/johndoe", email: "john@example.com" },
    { name: "Jane Smith", role: "Backend Developer", linkedin: "https://linkedin.com/in/janesmith", email: "jane@example.com" },
    { name: "Alice Johnson", role: "Fullstack Engineer", linkedin: "https://linkedin.com/in/alicejohnson", email: "alice@example.com" },
  ],
  "Lakewood Heating and AC": [
    { name: "Bob Lee", role: "DevOps Engineer", linkedin: "https://linkedin.com/in/boblee", email: "bob@example.com" },
    { name: "Emma Davis", role: "UI/UX Designer", linkedin: "https://linkedin.com/in/emmadavis", email: "emma@example.com" },
  ],
  "Paesani MBX": [
    { name: "Michael Chen", role: "Product Manager", linkedin: "https://linkedin.com/in/michaelchen", email: "michael@example.com" },
    { name: "Liam Brown", role: "QA Engineer", linkedin: "https://linkedin.com/in/liambrown", email: "liam@example.com" },
  ]
};

const CsesOpenSource: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState("WebClicker++");
  const [selectedTeam, setSelectedTeam] = useState("Lakewood Heating and AC"); 
  const [currentPage, setCurrentPage] = useState(0);
  const [membersPerPage, setMembersPerPage] = useState(() => getMembersPerPage());

  function getMembersPerPage() {
    return window.innerWidth <= 768 ? 2 : 6;
  }

  useEffect(() => {
    const handleResize = () => {
      setMembersPerPage(getMembersPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTeam]);

  const { title, image, description, tags } = projectData[selectedProject];

  const teamMembers = allTeamMembers[selectedTeam] || [];
  const totalPages = Math.ceil(teamMembers.length / membersPerPage);
  const startIdx = currentPage * membersPerPage;
  const visibleMembers = teamMembers.slice(startIdx, startIdx + membersPerPage);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="cses-container">

      {/* INTRO SECTION */}
      <section className="intro">
        <h1 className="intro-title">
          What is <span className="dev-highlight"> CSES DEV</span>?
        </h1>
        <p className="intro-text">
            <span className='dev-highlight'>CSES DEV</span>, a core initiative of the <span className="gold-highlight">Computer Science and Engineering Society (CSES)</span> at UC San Diego, bridges the gap between academics and industry 
            by giving students their first real‑world software development experience. Through hands‑on projects with startups, research labs, and businesses, members gain technical skills, collaborate in an agile environment, and build the problem‑solving and teamwork 
            abilities needed to thrive in their future careers.
        </p>
      </section>

      {/* OPPORTUNITIES SECTION */}
      <section className="opportunities"> 
        <h2>Opportunities</h2> 
        <div className="dev-opportunity-grid"> 
          <div className="dev-opportunity-card"> 
            <h3>Developers</h3> 
            <p>Developers build software products for companies, startups, research labs, gaining industry-ready skills.</p> 
          </div> 
          <div className="dev-opportunity-card"> 
            <h3>UI/UX Designers</h3> 
            <p>Design polished user experiences for clients, building a portfolio tailored to company needs.</p> 
          </div> 
          <div className="dev-opportunity-card"> 
            <h3>Product Managers</h3>  
            <p>Define goals, manage timelines, and lead teams building software for external partners, gaining leadership and product strategy skills along the way.</p> 
          </div> 
          <div className="dev-opportunity-card"> 
            <h3>Workshops</h3> 
            <p>Get started with Git workshops, development sessions, and kickoff events, connecting with team leads, learning tools and workflows.</p> 
          </div> 
          <div className="dev-opportunity-card"> 
            <h3>Recruitment & Intern Panels</h3> 
            <p>Learn how to land top internships through panels with FAANG interns, startup founders, researchers, and recruiters.</p> 
          </div> 
        </div> 
        <div className="cta-container"> 
          <button className="cta-button">Become a member now!</button> 
        </div> 
      </section>

      {/* PROJECTS SECTION */}
      <section className="projects">
        <h2>Current Projects</h2>
        <div className="project-tabs-wrapper">
          <div className="project-tabs-container">
            <div className="project-tabs">
              {Object.keys(projectData).map((projectKey) => (
                <button
                  key={projectKey}
                  className={selectedProject === projectKey ? "active-tab" : ""}
                  onClick={() => setSelectedProject(projectKey)}
                >
                  {projectKey}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="project-showcase">
          <div className="project-image-border">
            <img className="project-image" src={image} alt={title} />
          </div>
          <div className="project-details">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team">
        <h2>Meet the Team</h2>
        <div className="project-tabs-wrapper">
          <div className="project-tabs-container">
            <div className="project-tabs team-tabs">
              {Object.keys(allTeamMembers).map((team) => (
                <button
                  key={team}
                  className={`project-tab ${selectedTeam === team ? "active-tab" : ""}`}
                  onClick={() => setSelectedTeam(team)}
                >
                  {team}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="team-carousel">
          <button className="arrow-button left" onClick={handlePrev} disabled={currentPage === 0}>
            &lt;
          </button>

          <div className="team-members-wrapper">
            <div className="team-members">
              {visibleMembers.map((member, index) => (
                <div className="member-card" key={index}>
                  <div className="avatar-square-border clean">
                    <img className="member-image" src={defaultimage} alt={member.name} />
                    <div className="corner-icons">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                      <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer" aria-label="Email">
                        <i className="fa-solid fa-envelope"></i>
                      </a>
                    </div>
                  </div>
                  <h3 className="member-name clean-name">{member.name}</h3>
                  <p className="member-role clean-role">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="arrow-button right" onClick={handleNext} disabled={currentPage >= totalPages - 1}>
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default CsesOpenSource;