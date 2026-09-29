import {
  SiFramer,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiShopify,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from '@icons-pack/react-simple-icons';
import MillierStoreImg from '@/assets/images/millier-store.webp';
import MineInUsImg from '@/assets/images/mine-in-us.webp';
import MySimpleRadioImg from '@/assets/images/my-simple-radio.webp';
import ResumeGeneratorImg from '@/assets/images/resume-generator.webp';

/** Fixed header links; `section` matches the target's `data-section` and `id`. */
export const PRIMARY_NAVIGATION = [
  { key: 'about', name: 'About', section: 'about' },
  { key: 'work', name: 'Work', section: 'projects' },
  { key: 'contact', name: 'Contact', section: 'contact' },
];

export const HEADER_NAVIGATION = [
  { key: 'about', name: 'About' },
  { key: 'tech-stack', name: 'Tech Stack' },
  { key: 'projects', name: 'Projects' },
  { key: 'contact', name: 'Contact' },
];

export const SOCIAL_MEDIA_LINKS = [
  {
    key: 'linkedin',
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nguyen-lim-thai-ho/',
  },
  {
    key: 'github',
    name: 'GitHub',
    href: 'https://github.com/holimm',
  },
  {
    key: 'email',
    name: 'Email',
    href: 'mailto:kahn12345678@gmail.com',
  },
];

export const TECH_STACK = [
  {
    name: 'React',
    role: 'UI library',
    icon: SiReact,
    href: 'https://reactjs.org',
  },
  {
    name: 'Next.js',
    role: 'Framework',
    icon: SiNextdotjs,
    href: 'https://nextjs.org',
  },
  {
    name: 'TypeScript',
    role: 'Language',
    icon: SiTypescript,
    href: 'https://www.typescriptlang.org',
  },
  {
    name: 'Node.js',
    role: 'Runtime',
    icon: SiNodedotjs,
    href: 'https://nodejs.org',
  },
  {
    name: 'Tailwind CSS',
    role: 'Styling',
    icon: SiTailwindcss,
    href: 'https://tailwindcss.com',
  },
  {
    name: 'Framer Motion',
    role: 'Motion',
    icon: SiFramer,
    href: 'https://www.framer.com/motion',
  },
  {
    name: 'Vercel',
    role: 'Hosting',
    icon: SiVercel,
    href: 'https://vercel.com',
  },
  {
    name: 'Shopify',
    role: 'Commerce',
    icon: SiShopify,
    href: 'https://www.shopify.com',
  },
  {
    name: 'Redux',
    role: 'State',
    icon: SiRedux,
    href: 'https://redux.js.org',
  },
];

export const SELECTED_PROJECTS = [
  {
    title: 'Millier Store',
    category:
      'ReactJS, NextJS, TypeScript, Ant Design, TailwindCSS, Redux, Framer Motion, Axios, Lodash, Google OAuth, ',
    href: 'https://github.com/holimm/millierstore',
    image: MillierStoreImg,
    liveSite: 'https://millierstore.vercel.app/',
  },
  {
    title: 'Mine In Us',
    category: 'HTML, CSS, JavaScript, jQuery, PHP, ',
    href: 'https://github.com/holimm/MineInUs',
    image: MineInUsImg,
  },
  {
    title: 'My Simple Radio',
    category: 'ReactJS, TypeScript, YouTube API, TailwindCSS, Framer Motion, ',
    href: 'https://github.com/holimm/MySimpleRadio',
    image: MySimpleRadioImg,
    liveSite: 'https://holimm.github.io/MySimpleRadio/',
  },
  {
    title: 'Resume Generator',
    category: 'ReactJS, TailwindCSS, ',
    href: 'https://github.com/holimm/MyResume',
    image: ResumeGeneratorImg,
    liveSite: 'https://github.com/holimm/MyResume',
  },
];
