import React, { useState, useEffect } from 'react';
import './InovateCommunity.css';

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
  "ORCA": {
    title: "ORCA",
    image: project1,
    description: "An AI based music production platform for musicians of all skill levels. It is built to streamline and provide solutions to the most challenging problems in the music production industry such as Music Arrangement, Instrument Transposition, Audio Transcription, and sheet music digitization. ORCA utilizes deep learning models to optimize redundant / extraneous processes in music composition and arrangement, allowing musicians of all backgrounds and skill levels to express themselves through music. Outputs include editable sheet music with synchronized audio—not just audio files.",
    tags: ["ORCA"],
  },
  "THIA": {
    title: "THIA",
    image: project2,
    description: "An AI-driven therapy system designed to deliver personalized, emotionally responsive, and contextually aware mental health support, leveraging fine-tuned LLMs, memory tracking, and a lifelike 3-d avatar with natural speaking ability.",
    tags: ["THIA"],
  },
  "SPYRE": {
    title: "SPYRE",
    image: project3,
    description: "An accessible coding platform that translates spoken language into executable code, empowering individuals with physical disabilities or injuries to participate fully in computer science and software development, combining a natural language compiler with a robust speech-to-code interface, supporting multiple programming languages and enabling users to write, edit, and run code entirely through voice commands.",
    tags: ["SPYRE"],
  },
  "Skin Lesion": {
    title: "Skin Lesion",
    image: project3,
    description: "A CNN-based diagnostic tool for classifying skin lesions in dermoscopic images to support early skin cancer detection and clinical decision-making.",
    tags: ["Skin Lesion"],
  },
    "Virtual Try On": {
    title: "Virtual Try On",
    image: project3,
    description: "A virtual try-on system using webcam input and generative models to render real-time, motion-aware garment fits with user-uploaded clothing.",
    tags: ["Virtual Try On"],
  }
};

// 👇 NEW: Grouped team members by team/project
const allTeamMembers: Record<string, any[]> = {
  "ORCA": [
    { name: "John Doe", role: "Frontend Developer", linkedin: "https://linkedin.com/in/johndoe", email: "john@example.com" },
    { name: "Jane Smith", role: "Backend Developer", linkedin: "https://linkedin.com/in/janesmith", email: "jane@example.com" },
    { name: "Alice Johnson", role: "Fullstack Engineer", linkedin: "https://linkedin.com/in/alicejohnson", email: "alice@example.com" },
  ],
  "THIA": [
    { name: "Bob Lee", role: "DevOps Engineer", linkedin: "https://linkedin.com/in/boblee", email: "bob@example.com" },
    { name: "Emma Davis", role: "UI/UX Designer", linkedin: "https://linkedin.com/in/emmadavis", email: "emma@example.com" },
  ],
  "SPYRE": [
    { name: "Michael Chen", role: "Product Manager", linkedin: "https://linkedin.com/in/michaelchen", email: "michael@example.com" },
    { name: "Liam Brown", role: "QA Engineer", linkedin: "https://linkedin.com/in/liambrown", email: "liam@example.com" },
  ],
  "Skin Lesion": [
    { name: "Michael Chen", role: "Product Manager", linkedin: "https://linkedin.com/in/michaelchen", email: "michael@example.com" },
    { name: "Liam Brown", role: "QA Engineer", linkedin: "https://linkedin.com/in/liambrown", email: "liam@example.com" },
  ],
  "Virtual Try On": [
    { name: "Michael Chen", role: "Product Manager", linkedin: "https://linkedin.com/in/michaelchen", email: "michael@example.com" },
    { name: "Liam Brown", role: "QA Engineer", linkedin: "https://linkedin.com/in/liambrown", email: "liam@example.com" },
  ]
};

const CsesOpenSource: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState("ORCA");
  const [selectedTeam, setSelectedTeam] = useState("THIA"); 
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
          What is CSES<span className="inovate-highlight"> Inovate</span>?
        </h1>
        <p className="intro-text">
            CSES <span className='inovate-highlight'>Inovate</span>, a core initiative of the <span className="gold-highlight">Computer Science and Engineering Society (CSES)</span> at UC San Diego, is the university’s first student-led AI research community. 
            Innovate empowers students to explore the intersection of research and entrepreneurship by tackling real-world challenges through cutting-edge technology. Members lead original research projects, present at academic conferences, 
            and prototype technologies with the potential to become impactful startups.
        </p>
      </section>

      {/* OPPORTUNITIES SECTION */}
      <section className="opportunities"> 
        <h2>Opportunities</h2> 
        <div className="inovate-opportunity-grid"> 
          <div className="inovate-opportunity-card"> 
            <h3>Researchers</h3> 
            <p>Contribute to student-led AI research. Tackle real-world challenges, publish papers, and present at conferences.</p> 
          </div> 
          <div className="inovate-opportunity-card"> 
            <h3>Developers</h3> 
            <p>Turn research into reality. Build software prototypes, implement models, and create usable systems.</p> 
          </div> 
          <div className="inovate-opportunity-card"> 
            <h3>Designers</h3>  
            <p>Craft intuitive user experiences for AI products and research tools. From wireframes to polished UI, you’ll shape how users interact with real-world innovations.</p> 
          </div> 
          <div className="inovate-opportunity-card"> 
            <h3>Workshops</h3> 
            <p>Join exclusive workshops focused on research, entrepreneurship, and deep tech innovation. Attend professor panels, VC events, and demo days. </p> 
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