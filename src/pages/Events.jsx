import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 py-8 px-0">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-center ">
          Legacy of Engagement Events
        </h1>

        <div>
          <p className="text-gray-400 text-center mb-6">
            A detailed chronicle of the impactful events organized and hosted by
            our chapter - including seminars, knowledge sessions, chapter
            launches, and special observances. This archive reflects our
            commitment to fostering continuous learning and innovation.
          </p>
        </div>

        <section>
          <div>
            <h3>First General Meeting</h3>
            <p>
              The first general meeting of ACI UITS Student Chapter was held on
              18 March,2024. This meeting was a discussion session for planning
              for future participation & activities. z
            </p>
            <img src="/Assets/img/events/Picture2.png" alt="" />
            <img src="/Assets/img/events/Picture3.png" alt="" />
          </div>
          <div>
            <h3>ACI UITS Student Chapter Review Meeting: </h3>
            <p>
              ACI UITS Student Chapter successfully conducted a review meeting
              to discuss their chapter activities. The primary focus of the
              meeting was to expand concrete knowledge and technology, organize
              seminars by key resource persons, develop research skills, and
              build collaborations. - On 8 May, 2024
            </p>
            <img src="/Assets/img/events/Picture2.png" alt="" />
            <img src="/Assets/img/events/Picture3.png" alt="" />
          </div>
          <div>
            <h3>
              ACI UITS Student Chapter: Executive Committee Announcement
              session. On 22 May,2025
            </h3>
            <img src="/Assets/img/events/Picture4.png" alt="" />
          </div>
          <div>
            <h3>4. 21 April, 2024: Meet up with Freshers:</h3>
            <p>
              Successful meetup session was held with the students of Level-1,
              Semester-2 from the Department of Civil Engineering, UITS,
              organized by the ACI UITS Student Chapter. The session focused on
              discussing the General Member Recruitment Process, along with the
              vision and upcoming activities of ACI.
            </p>
            <img src="/Assets/img/events/Picture5.png" alt="" />
            <img src="/Assets/img/events/Picture6.png" alt="" />
          </div>
          <div>
            <h3>Networking</h3>
            <img src="/Assets/img/events/Picture7.png" alt="" />
            <img src="/Assets/img/events/Picture8.png" alt="" />
          </div>
        </section>
      </div>
    </div>
  );
};
export default Events;
