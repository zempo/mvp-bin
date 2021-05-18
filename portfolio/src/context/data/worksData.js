export const projectQueries = ["atl-client", "jto-client", "solomon-zelenko"];

export const projects = [
  {
    title: `Blue Witness`,
    tags: [`nodejs`, `fullstack`, `sass`, `data visualization`, `open source`],
    type: `team`,
    desc: `The Blue Witness project tracks and visualizes incidents of police brutality across the United States.
     Together, the Human Rights First's Innovation Lab and Lambda School have partnered to bring this project to life.
     As part of my journey with Lambda, I had the utmost privilege working with this team as a design lead.`,
    live_site: `https://a.humanrightsfirst.dev/`,
    // add guest creds to ATL
    guest_creds: false,
    github_repo: `https://github.com/zempo/atl-client`,
    preview_img: ``,
    screenshots: [``], 
  },
  {
    title: `Above the Line`,
    tags: [`pern`, `fullstack`],
    type: `solo`,
    desc: `Above the Line is your personalized scriptwriting environment.
    Craft scripts and screenplays - as fast as you can think!`,
    live_site: `https://above-the-line.vercel.app`,
    github_repo: `https://github.com/zempo/atl-client`,
    // add guest creds to ATL
    guest_creds: {
      email: "guest@solomonzelenko.dev",
      password: "ForHire1234@!",
    },
    preview_img: ``,
    screenshots: [``], 
  },
  {
    title: `Just the Occasion`,
    tags: [`pern`, `fullstack`],
    type: `solo`,
    desc: `Just the Occasion is the greeting card platform.
     Customize, share, and download greeting cards on your terms.
     Discover a platform that values your experiences.`,
    live_site: `https://just-the-occasion.com/`,
    github_repo: `https://github.com/zempo/jto-client`,
    guest_creds: {
      email: "guest@solomonzelenko.dev",
      password: "ForHire1234@!",
    },
    preview_img: ``,
    screenshots: [``],
  },
  {
    title: `Aeropolis II`,
    tags: [`svelte`, `front end`],
    type: `solo`,
    desc: `
    As with its predecessor, Aeropolis II gives you the full picture of your environment.
    See the air quality, location, health news, and wikipedia for hundreds of major cities across the globe.`,
    live_site: `https://just-the-occasion.com/`,
    github_repo: `https://github.com/zempo/jto-client`,
    guest_creds: false,
    preview_img: ``,
    screenshots: [``],
  },
];
