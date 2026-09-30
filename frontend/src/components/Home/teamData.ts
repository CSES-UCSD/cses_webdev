// Team members shown in the "Meet the Team!" section on the Home page.
// Edit this file to update the people displayed — no other code changes needed.
import { EventCategory } from '../../utils/types';
import Vaidik from '../../images/meettheteamImages/Vaidik Nadheria.jpg';
import Samantha from '../../images/meettheteamImages/Samantha.jpg';
import Unnati from '../../images/meettheteamImages/Unnati.jpg';
import Sameeksha from '../../images/meettheteamImages/Sameeksha.jpg';
import Vedant from '../../images/meettheteamImages/Vedant.jpg';
import Vihan from '../../images/meettheteamImages/Vihan.jpg';
import Michelle from '../../images/meettheteamImages/michelle_dong.jpg';
import Sanmita from '../../images/meettheteamImages/Sanmita.jpg';
import Sathwika from '../../images/meettheteamImages/Sathwika.jpg';
import Brendan from '../../images/meettheteamImages/Brendan.jpg';
import Himansi from '../../images/meettheteamImages/Himansi.jpg';

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  community: EventCategory;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Unnati Goyal', role: 'President', photo: Unnati, community: 'General' },
  { name: 'Brendan Barber', role: 'Vice President Internal', photo: Brendan, community: 'General' },
  { name: 'Sanmita Babu', role: 'Vice President External', photo: Sanmita, community: 'General' },
  { name: 'Samantha Wang', role: 'Director of Design', photo: Samantha, community: 'General' },
  { name: 'Michelle Dong', role: 'Director of Events', photo: Michelle, community: 'General' },
  { name: 'Sameeksha Vashishtha', role: 'Director of Events', photo: Sameeksha, community: 'General' },
  { name: 'Vihan Goenka', role: 'Director of Finance', photo: Vihan, community: 'General' },
  { name: 'Vaidik Nadheria', role: 'Director of Tech Talks', photo: Vaidik, community: 'General' },
  { name: 'Vedant Vardhaan', role: 'Open Source President', photo: Vedant, community: 'Open-Source' },
  { name: 'Sathwika Peechara', role: 'Innovate President', photo: Sathwika, community: 'Innovate' },
  { name: 'Himansi Gupta', role: 'Dev President', photo: Himansi, community: 'Dev' },
];
