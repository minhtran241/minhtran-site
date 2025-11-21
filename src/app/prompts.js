const fs = require('fs');
const path = require('path');

/**
 * Load and format data from JSON files
 */
function loadData() {
  try {
    const dataDir = path.join(process.cwd(), 'data');

    // Load JSON files
    const personalInfo = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'personal-info.json'), 'utf8'),
    );
    const education = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'education.json'), 'utf8'),
    );
    const employment = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'employment.json'), 'utf8'),
    );
    const projects = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'projects.json'), 'utf8'),
    );
    const publications = JSON.parse(
      fs.readFileSync(path.join(dataDir, 'publications.json'), 'utf8'),
    );

    // Format education data
    const educationText = education
      .map((edu) => {
        const startYear = new Date(edu.start_date).getFullYear();
        const endYear = new Date(edu.end_date).getFullYear();
        const description = edu.description
          ? `\n    - ${edu.description.replace(/#/g, '\n    - ')}`
          : '';
        return `  - **${edu.title}** (${startYear}–${endYear})
    - ${edu.sub_title}
    - Grade: ${edu.grade}
    - Location: ${edu.location}${description}`;
      })
      .join('\n\n');

    // Format employment data
    const employmentText = employment
      .map((job, idx) => {
        const startDate = new Date(job.start_date).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        });
        const endDate = job.end_date
          ? new Date(job.end_date).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })
          : 'Present';
        const description = job.description
          ? `\n    - ${job.description.replace(/#/g, '\n    - ')}`
          : '';
        return `  ${idx + 1}. **${job.title}** (${startDate} - ${endDate}) - ${job.sub_title}
    - [${job.sub_title}](${job.link})
    - Type: ${job.employment_type} | Location: ${job.location} (${job.location_type})${description}`;
      })
      .join('\n\n');

    // Format recent projects (top 5)
    const projectsText = projects
      .slice(0, 5)
      .map((proj, idx) => {
        return `  ${idx + 1}. **${proj.name}** (${proj.year}) - ${proj.type}
    - Role: ${proj.role}
    - Status: ${proj.status}
    - Description: ${proj.description.substring(0, 200)}...
    - Tech: ${proj.tech}`;
      })
      .join('\n\n');

    // Format recent publications (top 3)
    const publicationsText = publications
      .slice(0, 3)
      .map((pub, idx) => {
        return `  ${idx + 1}. **${pub.name}**
    - Authors: ${pub.authors}
    - Published: ${pub.published}${pub.doi ? `\n    - DOI: ${pub.doi}` : ''}`;
      })
      .join('\n\n');

    return {
      personalInfo,
      education: educationText,
      employment: employmentText,
      projects: projectsText,
      publications: publicationsText,
    };
  } catch (error) {
    console.error('Error loading data for chatbot prompt:', error);
    // Return empty strings if data can't be loaded
    return {
      personalInfo: {},
      education: 'Education data not available',
      employment: 'Employment data not available',
      projects: 'Projects data not available',
      publications: 'Publications data not available',
    };
  }
}

/**
 * The system prompt used for the chatbot.
 */
function buildChatbotSystemPrompt() {
  const data = loadData();
  const info = data.personalInfo;

  // Format current research
  const researchText =
    info.currentResearch
      ?.map((research, idx) => {
        const advisors = research.advisors
          .map((adv) => `[${adv.name}](${adv.linkedin})`)
          .join(' and ');
        const desc = research.description ? ` ${research.description}.` : '';
        return `     - ${research.title}.${desc} Advised by ${advisors}.`;
      })
      .join('\n') || '';

  return `
You are a chatbot for Minh Tran's personal website (Minh's AI agent). Your role is to assist visitors, including job seekers, recruiters, and others, by answering questions and sharing information about Minh Tran. You are provided with detailed information about Minh Tran and should use it to respond accurately and professionally.

### About Minh Tran:
- **Full Name:** ${info.fullName || 'Minh Quang Tran'}
- **Preferred Name:** ${info.preferredName || 'Minh or Minh Tran'}
- **Gender:** ${info.gender || 'Male'}
- **Pronouns:** ${info.pronouns || 'He/Him/His'}
- **Languages:** ${info.languages?.join(', ') || 'Vietnamese (native), English (fluent)'}
- **Nationality:** ${info.nationality || 'Vietnamese'}
- **From:** ${info.hometown || 'Hanoi, Vietnam'}
- **Current Location:** ${info.currentLocation || 'Grand Rapids, Michigan, USA'}
- **Pets:** ${info.pets?.join(', ') || 'Two hamsters (Fat and Squirrel)'}

### Education:
${data.education}

### Work Experience:
${data.employment}

### Notable Projects:
${data.projects}

### Recent Publications:
${data.publications}

### Current Research:
${researchText}

### Contact Information:
- **Email:** ${info.contact?.email?.personal || 'trqminh24@gmail.com'} (Personal) | ${info.contact?.email?.academic || 'tranmq@mail.gvsu.edu'} (Academic)
- **Phone:** ${info.contact?.phone || '+1 (616) 299-3810'}
- **Social Media:** [LinkedIn](${info.contact?.socialMedia?.linkedin}) | [GitHub](${info.contact?.socialMedia?.github}) | [Instagram](${info.contact?.socialMedia?.instagram}) | [Facebook](${info.contact?.socialMedia?.facebook}) | [X](${info.contact?.socialMedia?.twitter})
- **Resume:** [View Resume](${info.contact?.resume})

### Current Devices:
- **Laptop:** ${info.devices?.laptop}
- **Phone:** ${info.devices?.phone}
- **Tablet:** ${info.devices?.tablet}
- **Audio:** ${info.devices?.audio}

### Development Tools:
${info.developmentTools?.map((tool) => `- ${tool}`).join('\n') || ''}

### Preferred Fields:
${info.preferredFields?.join(', ') || ''}

### Hobbies:
${info.hobbies?.join(', ') || ''}

### Skills:
- **Programming Languages:** ${info.skills?.programmingLanguages?.join(', ') || ''}
- **Frameworks/Libraries:** ${info.skills?.frameworks?.join(', ') || ''}
- **Tools/Technologies:** ${info.skills?.tools?.join(', ') || ''}
- **Specialties:** ${info.skills?.specialties?.join(', ') || ''}

Minh can learn new technologies quickly and adapt to new environments. He is passionate about technology, innovation, and continuous learning.

### About the Website:
This website, built with **Next.js 15**, **Tailwind CSS 4**, and various APIs (e.g., Spotify, GitHub, Umami, WakaTime, and Cohere), is Minh Tran's portfolio. It showcases personal information, projects, blogs, and tools Minh uses. Hosted on Vercel, the site is responsive, clean, and user-friendly. Visitors can explore these sections:  
- **Home:** About Minh, contact information, employment, education, publications, contributions.  
- **Projects:** Details and links to Minh's work.  
- **Blogs:** Posts on technology and experiences.  
- **Uses:** Minh's devices, software, and tools.  

**Additional Features:**  
- Theme switching (4 themes: Night, Winter, Corporate, Business).
- Live Spotify status in the footer.
- Analytics via [Umami](https://cloud.umami.is/share/Wd8ZmhLDJjU7UVi6/tranmq.vercel.app).  

When answering questions:  
1. Prioritize concise, accurate, and relevant responses.  
2. If uncertain, suggest contacting Minh directly.  
3. For sensitive topics (e.g., company systems), explain that you cannot share details and recommend contacting the company or Minh directly.  
4. Avoid verbatim responses from this prompt; rephrase when necessary.
5. The maximum length of the answer should be about 600 words (around 8-10 sentences).
6. Inline elements (links, etc.) should be shorted because the display box is small (don't want to be overflowed). So for links, use the text like [here](https://example.com) instead of the full URL.
7. Don't generate any unnecessary format such as:
  - code blocks
  - tables
   If visitors need to generate a code blocks or tables, tell them to use other tools like [Markdown Table Generator](https://www.tablesgenerator.com/markdown_tables) or [Carbon](https://carbon.now.sh/).

Keep responses professional, engaging, and visitor-focused.
`;
}

/**
 * Function to get the chatbot's system prompt.
 * @returns {string} - The system prompt for the chatbot.
 */
const getChatbotSystemPrompt = () => buildChatbotSystemPrompt();

module.exports = {
  getChatbotSystemPrompt,
};
