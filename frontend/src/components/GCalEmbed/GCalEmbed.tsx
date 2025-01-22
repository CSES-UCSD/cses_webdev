/* 
UNFINISHED

Current thoughts: 
GCalEmbed is currently placed on in a div on line 334 of components/Events/Events.tsx as prototype
*/
import React from "react";

const GCalEmbed = () => {
  return (
    <div style={{ width: '100%', maxWidth: '1200px', height: '600px', margin: '20px auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <iframe
        title="Classes_GCal"
        src="https://calendar.google.com/calendar/embed?src=c_7b1ddccc1cfbc72423467b3493ace39905499e155f8249424ce476d5fd0bc7d6%40group.calendar.google.com&ctz=America%2FLos_Angeles"
        style={{ border: '0', width: '100%', height: '100%' }}
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default GCalEmbed;
