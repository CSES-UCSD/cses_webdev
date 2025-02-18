import template1 from "../../images/templatepage/template1.png"


export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const projects : Project[] = [
    {
      id: 1,
      name: "TritonScript",
      description: "TritonScript is an open-source, community-driven forum for UCSD students to collaboratively share class notes, study guides, and learning materials.",
      image: template1,
    },
    {
      id: 2,
      name: "Opportune",
      description: "Opportune is a social platform aiming to connect UC San Diego students and alumni to support their job search, and also provide internship tracking and analytics.",
      image: template1,
    },
    {
      id: 3,
      name: "Low-Price Center",
      description: "Low-Price Center is designed to help UCSD students exchange and sell goods in a streamlined, centralized way.",
      image: template1,
    },
    {
      id: 4,
      name: "TritonSpend",
      description: "TritonSpend is designed to help university students manage their personal finances effectively.",
      image: template1,
    },
  ];