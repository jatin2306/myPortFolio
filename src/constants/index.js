// Centralized data imports
import { getSkills, getExperiences, getProjects, getSocialLinks, getServices, getData } from '../utils/dataLoader';

// Export enriched data
export const skills = getSkills();
export const experiences = getExperiences();
export const projects = getProjects();
export const socialLinks = getSocialLinks();
export const services = getServices();

// Export full data object for components that need access to all data
export const portfolioData = getData();