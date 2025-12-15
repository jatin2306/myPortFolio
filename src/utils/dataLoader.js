import data from '../data/data.json';

// Import all icons
import {
  html, css, javascript, typescript, react, nextjs, redux, mui, tailwindcss,
  bootstrap, sass, motion, nodejs, express, mysql, mongodb, supabase,
  superset, chart, git, github, bitbucket, jira, confluence, restfulapi,
  graphql, jwt, oauth, jest, reacttesting, docker, Kubernetes, gitlab,
  codesplitting, lazyloading, imageopt, linkedin, contact, phone, profileImage
} from '../assets/icons';

// Import all images
import {
  hero, meta, shopify, starbucks, tesla, logo, nuvamawealth, deopersindia
} from '../assets/images';

// Create icon mapping
const iconMap = {
  html, css, javascript, typescript, react, nextjs, redux, mui, tailwindcss,
  bootstrap, sass, motion, nodejs, express, mysql, mongodb, supabase,
  superset, chart, git, github, bitbucket, jira, confluence, restfulapi,
  graphql, jwt, oauth, jest, reacttesting, docker, Kubernetes, gitlab,
  codesplitting, lazyloading, imageopt, linkedin, contact, phone, profileImage
};

// Create image mapping
const imageMap = {
  hero, meta, shopify, starbucks, tesla, logo, nuvamawealth, deopersindia,
  profile2: profileImage // Map profile2 to profileImage
};

// Function to get icon by key
export const getIcon = (key) => {
  return iconMap[key] || null;
};

// Function to get image by key (supports both local keys and external URLs)
export const getImage = (key) => {
  // If key is an external URL, return it directly
  if (key && (key.startsWith('http://') || key.startsWith('https://'))) {
    return key;
  }
  return imageMap[key] || null;
};

// Function to enrich skills with icon URLs
export const getSkills = () => {
  return data.skills.map(skill => ({
    ...skill,
    imageUrl: getIcon(skill.iconKey)
  }));
};

// Function to enrich experiences with icon URLs
export const getExperiences = () => {
  return data.experiences.map(exp => ({
    ...exp,
    icon: getImage(exp.iconKey),
    company_name: exp.companyName
  }));
};

// Function to enrich projects with image and icon URLs
export const getProjects = () => {
  return data.projects.map(project => ({
    ...project,
    imageUrl: getImage(project.imageKey),
    iconUrl: getIcon(project.iconKey),
    techStack: project.techStack.map(tech => ({
      ...tech,
      icon: getIcon(tech.iconKey)
    }))
  }));
};

// Function to enrich social links with icon URLs
export const getSocialLinks = () => {
  return data.socialLinks.map(link => ({
    ...link,
    iconUrl: getIcon(link.iconKey)
  }));
};

// Function to enrich services with icon URLs
export const getServices = () => {
  return data.services.map(service => ({
    ...service,
    icon: getIcon(service.iconKey)
  }));
};

// Export all data with enriched assets
export const getData = () => {
  return {
    ...data,
    skills: getSkills(),
    experiences: getExperiences(),
    projects: getProjects(),
    socialLinks: getSocialLinks(),
    services: getServices(),
    personal: {
      ...data.personal,
      profileImage: getImage(data.personal.profileImage)
    }
  };
};

// Export raw data for direct access
export default data;

