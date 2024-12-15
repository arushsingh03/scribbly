export const templates = [
    {
        id: "blank",
        label: "Blank Document",
        imageUrl: "/blank-document.svg",
        initialContent: ""
    },
    {
        id: "letter",
        label: "Letter",
        imageUrl: "/letter.svg",
        initialContent: `<p>Dear [Recipient's Name],</p>\n\n<p>I hope this message finds you well. I am writing to [state the purpose of your letter].</p>\n\n<p>Thank you for your time and consideration.</p>\n\n<p>Sincerely,<br>[Your Name]</p>`
    },
    {
        id: "cover-letter",
        label: "Cover Letter",
        imageUrl: "/cover-letter.svg",
        initialContent: `<p>Dear [Hiring Manager's Name],</p>\n\n<p>I am excited to apply for the <strong>[Job Title]</strong> position at <strong>[Company Name]</strong>. With my background in [Your Field/Skills], I believe I am well-suited to contribute to your team.</p>\n\n<p>I look forward to the opportunity to discuss how my skills and experiences align with your needs.</p>\n\n<p>Sincerely,<br>[Your Name]</p>`
    },
    {
        id: "business-letter",
        label: "Business Letter",
        imageUrl: "/business-letter.svg",
        initialContent: `<p>Dear [Recipient's Name],</p>\n\n<p>I am writing on behalf of <strong>[Your Company/Organization Name]</strong> to discuss [state the purpose].</p>\n\n<p>Please feel free to contact me at your earliest convenience to discuss this further.</p>\n\n<p>Best regards,<br>[Your Name]<br>[Your Position]</p>`
    },
    {
        id: "presentation",
        label: "Presentation",
        imageUrl: "/project-proposal.svg",
        initialContent: `<h1>[Project Title]</h1>\n\n<h2>Introduction</h2>\n<ul>\n    <li>[Overview of the topic]</li>\n</ul>\n\n<h2>Objectives</h2>\n<ul>\n    <li>[Objective 1]</li>\n    <li>[Objective 2]</li>\n</ul>\n\n<h2>Key Points</h2>\n<ul>\n    <li>[Point 1]</li>\n    <li>[Point 2]</li>\n</ul>\n\n<h2>Conclusion</h2>\n<p>[Summary or call to action]</p>`
    },
    {
        id: "report",
        label: "Report",
        imageUrl: "/software-proposal.svg",
        initialContent: `<h1>[Report Title]</h1>\n\n<h2>Executive Summary</h2>\n<p>[Provide a brief overview of the report's key findings and recommendations.]</p>\n\n<h2>Introduction</h2>\n<p>[Describe the purpose of the report and its scope.]</p>\n\n<h2>Analysis</h2>\n<p>[Provide detailed analysis, data, or research findings.]</p>\n\n<h2>Conclusion</h2>\n<p>[Summarize the main points and suggest next steps or recommendations.]</p>`
    },
    {
        id: "resume",
        label: "Resume",
        imageUrl: "/resume.svg",
        initialContent: `<h1>[Your Name]</h1>\n\n<h2>Contact Information</h2>\n<ul>\n    <li>Phone: [Your Phone Number]</li>\n    <li>Email: [Your Email Address]</li>\n    <li>LinkedIn: [Your LinkedIn Profile]</li>\n</ul>\n\n<h2>Summary</h2>\n<p>[Brief statement summarizing your skills and experiences.]</p>\n\n<h2>Experience</h2>\n<ul>\n    <li><strong>[Job Title]</strong> | [Company Name] | [Start Date - End Date]\n        <ul>\n            <li>[Responsibility/Accomplishment 1]</li>\n            <li>[Responsibility/Accomplishment 2]</li>\n        </ul>\n    </li>\n</ul>\n\n<h2>Education</h2>\n<ul>\n    <li><strong>[Degree]</strong> | [Institution Name] | [Year]</li>\n</ul>\n\n<h2>Skills</h2>\n<ul>\n    <li>[Skill 1]</li>\n    <li>[Skill 2]</li>\n    <li>[Skill 3]</li>\n</ul>`
    }
];
