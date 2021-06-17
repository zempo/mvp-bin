export const projectQueries = [
  "atl-client",
  "jto-client",
  "solomon-zelenko",
  "",
];

export const projects = [
  {
    id: `w001`,
    title: `Blue Witness`,
    tags: [
      `show all`,
      `pern stack`,
      `reactjs`,
      `sass`,
      `in progress`,
      `mapping`,
      `open source`,
      `team`,
    ],
    type: `team`,
    role: `Design Lead 🎨`,
    status: `In-Progress 🚧`,
    desc: `
    The Blue Witness project tracks and visualizes incidents of police brutality across the United States.
    Together, the Human Rights First's Innovation Lab and Lambda School have partnered to bring this project to life.
    As part of my journey with Lambda, I had the utmost privilege working with this team as a design lead.
    NOTE: At the time of this writing, this project is being merged with another team's work and might have a different UI and/or URI.
     `,
    live_site: `https://a.humanrightsfirst.dev/`,
    // be sure to fork
    github_repo: `https://github.com/zempo/human-rights-first-police-fe-b`,
    guest_creds: false,
    preview_img: `https://i.ibb.co/5W21Bx1/hrf-blue-witness-preview.png`,
    screenshots: [
      `https://i.ibb.co/5W21Bx1/hrf-blue-witness-preview.png`,
      `https://i.ibb.co/P9w5f5k/blue-witness-landing2.png`,
      `https://i.ibb.co/8r3srS0/blue-witness-cohort.png`,
      `https://i.ibb.co/k9tKrtG/blue-witness-data1.png`,
      `https://i.ibb.co/51Zghhf/blue-witness-data2.png`,
      `https://i.ibb.co/1Xn6YPF/blue-witness-credits.png`,
    ],
    screenshot_captions: [
      `Map of police misconduct (Blue Witness).`,
      `Landing page timeline (Blue Witness).`,
      `Incidents of police misconduct (Blue Witness).`,
      `Data visualizations: part 1 (Blue Witness).`,
      `Data visualizations: part 2 (Blue Witness).`,
      `Cohort credits and roles (Blue Witness).`,
    ],
  },
  {
    id: `w002`,
    title: `Beam Pocket`,
    tags: [`show all`, `client`, `front end`, `in progress`],
    type: `client`,
    role: `Developer 💻`,
    status: `In-Progress 🚧`,
    desc: `
    From Karius Architecture, comes a better way of connecting steel beams to concrete walls.
    The Beam Pocket website was created to give prospective buyers important informaton about this revolutionary product.
    As my first professional developer experiecen,
    I enjoyed helping Karius Architecture bring their product to life. 
    NOTE: At the time of this writing, I am implementing new features for this project.
    `,
    live_site: `https://www.beampocket.com/`,
    github_repo: false,
    guest_creds: false,
    preview_img: `https://i.ibb.co/6DgQh2G/beampocket-preview.png`,
    screenshots: [
      `https://i.ibb.co/6DgQh2G/beampocket-preview.png`,
      `https://i.ibb.co/gvPFPY0/beampocket-about1.png`,
      `https://i.ibb.co/WFcxJKz/beampocket-about2.png`,
      `https://i.ibb.co/mNQwv0d/beampocket-order.png`,
      `https://i.ibb.co/S7QR0kN/beampocket-footer.png`,
    ],
    screenshot_captions: [
      `Desktop view (Beampocket).`,
      `About the product: part 1 (Beampocket).`,
      `About the product: part 2 (Beampocket).`,
      `Order form UI (Beampocket).`,
      `Site footer (Beampocket).`,
    ],
  },
  {
    id: `w003`,
    title: `Above the Line`,
    tags: [`show all`, `solo`, `pern stack`, `reactjs`, `deployed`],
    type: `solo`,
    role: `Developer 💻`,
    status: `Deployed 🚀`,
    desc: `
    Above the Line is your personalized scriptwriting environment.
    Craft scripts and screenplays - as fast as you can think!
    `,
    live_site: `https://above-the-line.vercel.app`,
    github_repo: `https://github.com/zempo/atl-client`,
    guest_creds: {
      email: "guest@solomonzelenko.dev",
      password: "ForHire1234@!",
    },
    preview_img: `https://i.ibb.co/QXjyLmS/atl-preview.png`,
    screenshots: [
      `https://i.ibb.co/QXjyLmS/atl-preview.png`,
      `https://i.ibb.co/2SZDJsj/atl-tablet.png`,
      `https://i.ibb.co/MCcPkJC/atl-mobile.png`,
      `https://i.ibb.co/cL85C6p/atl-dashboard.png`,
      `https://i.ibb.co/gt0gCRf/atl-editor.png`,
      `https://i.ibb.co/jVrppWT/atl-download.png`,
      `https://i.ibb.co/mDkYqnJ/atl-personalize.png`,
    ],
    screenshot_captions: [
      `Desktop view (Above the Line).`,
      `Tablet view (Above the Line).`,
      `Mobile view (Above the Line).`,
      `User dashboard (Above the Line).`,
      `Script editor UI (Above the Line).`,
      `Script download & preview UI (Above the Line).`,
      `Account personalization (Avove the Line).`,
    ],
  },
  {
    id: `w004`,
    title: `Just the Occasion`,
    tags: [
      `show all`,
      `solo`,
      `pern stack`,
      `reactjs`,
      `deployed`,
      `cloud storage`,
    ],
    type: `solo`,
    role: `Developer 💻`,
    status: `Deployed 🚀`,
    desc: `
    Introducing Just the Occasion - the greeting card platform!
     Customize, share, and download greeting cards on your terms.
     Discover a platform that values your experiences.
    `,
    live_site: `https://just-the-occasion.com/`,
    github_repo: `https://github.com/zempo/jto-client`,
    guest_creds: {
      email: "guest@solomonzelenko.dev",
      password: "ForHire1234@!",
    },
    preview_img: `https://i.ibb.co/3fmcs2F/jto-preview.png`,
    screenshots: [
      `https://i.ibb.co/3fmcs2F/jto-preview.png`,
      `https://i.ibb.co/0tLYdBt/jto-tablet.png`,
      `https://i.ibb.co/R0SwkyK/jto-mobile2.png`,
      `https://i.ibb.co/2y3dhbT/jto-mobile1.png`,
      `https://i.ibb.co/xXbPP71/jto-dashboard.png`,
      `https://i.ibb.co/JqDZdHq/jto-addcard.png`,
      `https://i.ibb.co/d2zctHS/jto-download2.png`,
      `https://i.ibb.co/f1s72zh/jto-download1.png`,
      `https://i.ibb.co/jTLG41M/jto-gallery.png`,
      `https://i.ibb.co/kgyD6rc/jto-card.png`,
      `https://i.ibb.co/2kqfkZy/jto-instructions.png`,
    ],
    screenshot_captions: [
      `Desktop view (Just the Occasion).`,
      `Tablet view (Just the Occasion).`,
      `Mobile view (Just the Occasion).`,
      `Mobile menu UI (Just the Occasion).`,
      `User dashboard (Just the Occasion).`,
      `Adding a new greeting card (Just the Occasion).`,
      `Customizing a card further (Just the Occasion)`,
      `Downloading a card (Just the Occasion)`,
      `Gallery of published greeting cards (Just the Occasion).`,
      `Viewing a published card (Just the Occasion).`,
      `Instructions for creating a card (Just the Occasion)`,
    ],
  },
  {
    id: `w005`,
    title: `My Portfolio`,
    tags: [
      `show all`,
      `solo`,
      `sass`,
      `front end`,
      `reactjs`,
      `deployed`,
      `threejs`,
    ],
    type: `solo`,
    role: `Developer 💻`,
    status: `Deployed 🚀`,
    desc: `
    Introducing Just the Occasion - the greeting card platform!
     Customize, share, and download greeting cards on your terms.
     Discover a platform that values your experiences.
    `,
    live_site: `https://solomonzelenko.dev/`,
    github_repo: `https://github.com/zempo/solomon-zelenko`,
    guest_creds: false,
    preview_img: `https://i.ibb.co/fvRmtbn/portfolio-preview.png`,
    screenshots: [
      `https://i.ibb.co/fvRmtbn/portfolio-preview.png`,
      `https://i.ibb.co/6mjqTSN/portfolio-tablet.png`,
      `https://i.ibb.co/JyrT5Sz/portfolio-mobile.png`,
      `https://i.ibb.co/RS3MG85/portfolio-contact.png`,
      `https://i.ibb.co/WfjzW6k/portfolio-bytes.png`,
    ],
    screenshot_captions: [
      `Desktop view (Portfolio).`,
      `Tablet view (Portfolio).`,
      `Mobile view (Portfolio).`,
      `Contact UI & Calendly integration (Portfolio).`,
      `Content components showcasing DRY code (Portfolio).`,
    ],
  },
  // {
  //   title: `Aeropolis II`,
  //   tags: [
  // `show all`,`svelte`, `front end`, `sass`, `deployed`, `mapping`],
  //   type: `solo`,
  //   role: `Developer 💻`,
  //   status: `Deployed 🚀`,
  //   desc: `
  //   As with its predecessor, Aeropolis II gives you the full picture of your environment.
  //   Explore the air quality, local news, and environment for hundreds of major cities across the globe.
  //   `,
  //   live_site: `https://just-the-occasion.com/`,
  //   github_repo: `https://github.com/zempo/aeropolis_2`,
  //   guest_creds: false,
  //   preview_img: ``,
  //   screenshots: [``],
  // screenshot_captions: [``]
  // },
];
