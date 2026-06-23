const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  home: {
    name: { type: String, default: "" },
    subTitle: { type: String, default: "" },
    summary: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    resumeLink: { type: String, default: "" }
  },
  about: {
    whyHire: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" }
      }
    ],
    aboutMeText1: { type: String, default: "" },
    aboutMeText2: { type: String, default: "" },
    stats: [
      {
        value: { type: String, default: "" },
        label: { type: String, default: "" }
      }
    ]
  },
  skills: [
    {
      category: { type: String, default: "" },
      items: [{ type: String }]
    }
  ],
  education: [
    {
      school: { type: String, default: "" },
      degree: { type: String, default: "" },
      grade: { type: String, default: "" },
      timeline: { type: String, default: "" },
      location: { type: String, default: "" }
    }
  ],
  projects: [
    {
      title: { type: String, default: "" },
      timeline: { type: String, default: "" },
      description: { type: String, default: "" },
      tags: [{ type: String }]
    }
  ],
  certifications: [
    {
      title: { type: String, default: "" },
      issuer: { type: String, default: "" },
      date: { type: String, default: "" },
      skills: { type: String, default: "" }
    }
  ],
  experience: [
    {
      title: { type: String, default: "" },
      company: { type: String, default: "" },
      timeline: { type: String, default: "" },
      description: { type: String, default: "" },
      tags: [{ type: String }]
    }
  ],
  achievements: [
    {
      category: { type: String, default: "" },
      items: [{ type: String }]
    }
  ]
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
