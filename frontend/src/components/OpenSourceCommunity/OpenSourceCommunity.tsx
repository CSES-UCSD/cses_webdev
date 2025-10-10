import React, { useState, useEffect } from 'react';
import './OpenSourceCommunity.css';

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
  TritonScript: {
    title: "TritonScript",
    image: project1,
    description: "TritonScript is an open-source, community-driven forum for UCSD students to collaboratively share class notes, study guides, and learning materials.",
    tags: ["TypeScript", "Tooling", "Frontend"],
  },
  TritonSpend: {
    title: "TritonSpend",
    image: project2,
    description: "TritonSpend is designed to help university students manage their personal finances effectively.",
    tags: ["Finance", "React", "Student Life"],
  },
  "Low-Price Center": {
    title: "Low-Price Center",
    image: project3,
    description: "Low-Price Center is designed to help UCSD students exchange and sell goods in a streamlined, centralized way.",
    tags: ["Deals", "Books", "Aggregation"],
  },
  Opportune: {
    title: "Opportune",
    image: project4,
    description: "Opportune is a social platform aiming to connect UC San Diego students and alumni to support their job search, and also provide internship tracking and analytics.",
    tags: ["Jobs", "Internships", "Career"],
  }
};

// 👇 NEW: Grouped team members by team/project
const allTeamMembers: Record<string, any[]> = {
  TritonGrader: [
    { name: "John Doe", role: "Frontend Developer", linkedin: "https://linkedin.com/in/johndoe", email: "john@example.com" },
    { name: "Jane Smith", role: "Backend Developer", linkedin: "https://linkedin.com/in/janesmith", email: "jane@example.com" },
    { name: "Alice Johnson", role: "Fullstack Engineer", linkedin: "https://linkedin.com/in/alicejohnson", email: "alice@example.com" },
  ],
  TritonLegend: [
    { name: "Bob Lee", role: "DevOps Engineer", linkedin: "https://linkedin.com/in/boblee", email: "bob@example.com" },
    { name: "Emma Davis", role: "UI/UX Designer", linkedin: "https://linkedin.com/in/emmadavis", email: "emma@example.com" },
  ],
  "Low-Price Center": [
    { name: "Michael Chen", role: "Product Manager", linkedin: "https://linkedin.com/in/michaelchen", email: "michael@example.com" },
    { name: "Liam Brown", role: "QA Engineer", linkedin: "https://linkedin.com/in/liambrown", email: "liam@example.com" },
  ],
  Opportune: [
    { name: "Sofia Wilson", role: "Project Coordinator", linkedin: "https://linkedin.com/in/sofiawilson", email: "sofia@example.com" },
    { name: "Ethan Miller", role: "Security Analyst", linkedin: "https://linkedin.com/in/ethanmiller", email: "ethan@example.com" },
    { name: "Ava Garcia", role: "Scrum Master", linkedin: "https://linkedin.com/in/avagarcia", email: "ava@example.com" },
  ],
};

const CsesOpenSource: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState("TritonScript");
  const [selectedTeam, setSelectedTeam] = useState("TritonGrader"); // ✅ Fix 1
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

  // ✅ Fix 2: Reset pagination on tab change
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
          What is CSES<span className="highlight"> OpenSource</span>?
        </h1>
        <p className="intro-text">
          CSES <span className='highlight'>Open Source</span>, a proud initiative of the <span className="gold-highlight">Computer Science and Engineering Society (CSES)</span> at UC San Diego, is dedicated to promoting an open-source culture within the university community.
          Our mission is to foster a vibrant ecosystem of collaborative software development, providing students with valuable opportunities to learn, contribute, and make a meaningful impact in the world of open source.
        </p>
      </section>

      {/* OPPORTUNITIES SECTION */}
      <section className="opportunities"> 
        <h2>Opportunities</h2> 
        <div className="open-opportunity-grid"> 
          <div className="opportunity-card"> 
            <h3>Become a Contributor</h3> 
            <img src={contributer} alt="Become a Contributor" /> 
            <p>Explore our open-source projects and apply to join as a developer. We’re always looking for passionate contributors!</p> 
          </div> 
          <div className="opportunity-card"> 
            <h3>Designers</h3> 
            <img src={designer} alt="Designers" /> 
            <p>Designers play a vital role in UI/UX, accessibility, and branding. Your creativity directly shapes how people interact with our tools.</p> 
          </div> 
          <div className="opportunity-card"> 
            <h3>Open Source Cohorts</h3> 
            <img src={cohorts} alt="Open Source Cohorts" /> 
            <p>Participate in our intensive 8-week cohort program where you’ll collaborate on real-world open-source projects.</p> 
          </div> 
          <div className="opportunity-card"> 
            <h3>Technical Workshops</h3> 
            <img src={workshops} alt="Technical Workshops" /> 
            <p>From Git to Figma, we host hands-on workshops all year long to help you learn the tools of open-source engineering.</p> 
          </div> 
          <div className="opportunity-card"> 
            <h3>Connect at Our Socials</h3> 
            <img src={socials} alt="Connect at Our Socials" /> 
            <p>Meet fellow CSES members and chat open source! Our events foster community, learning, and fun.</p> 
          </div> 
          <div className="opportunity-card"> 
            <h3>It’s Easy to Contribute</h3> 
            <img src={contribute} alt="It’s Easy to Contribute" /> 
            <p>Just head to one of our repos, look for good first issues, and open a PR! We’ll help you along the way.</p> 
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