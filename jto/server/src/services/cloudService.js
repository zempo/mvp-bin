const cloudinary = require("cloudinary");
const { CLOUDINARY } = require("../config").APIS;

cloudinary.config({
  cloud_name: CLOUDINARY.CLOUDINARY_NAME,
  api_key: CLOUDINARY.CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY.CLOUDINARY_API_SECRET,
});

const cloudService = {
  validateSize(filesToUpload) {
    const NO_ERRORS = null;
    const { front, inside } = filesToUpload;

    if (front && front.size / 1024 / 1024 > 0.5) {
      return `Please choose a smaller front image.`;
    }
    if (inside && inside.size / 1024 / 1024 > 0.5) {
      return `Please choose a smaller inside image.`;
    }

    return NO_ERRORS;
  },
  async uploadFront(fileToUpload) {
    let FILES = [];
    const cloudRes = await cloudinary.v2.uploader.upload(
      fileToUpload.front.path,
      {
        moderation: "aws_rek",
      }
    );
    if (cloudRes.moderation[0].status === "rejected") {
      FILES.push("NSFW content added");
    }

    FILES.push(cloudRes.url);
    // console.log(FILES, "front, only");
    return FILES;
  },
  async uploadInside(fileToUpload) {
    let FILES = [];

    let cloudRes = await cloudinary.v2.uploader.upload(
      fileToUpload.inside.path,
      {
        moderation: "aws_rek",
      }
    );
    if (cloudRes.moderation[0].status === "rejected") {
      FILES.push("NSFW content added");
    }

    FILES.push(cloudRes.url);
    // console.log(FILES, "inside, only");
    return FILES;
  },
  async uploadBoth(filesToUpload) {
    let FILES = [];
    let cloudRes1 = await cloudinary.v2.uploader.upload(
      filesToUpload.front.path,
      {
        moderation: "aws_rek",
      }
    );

    if (cloudRes1.moderation[0].status === "rejected") {
      FILES.push("NSFW content added");
    }

    FILES.push(cloudRes1.url);

    let cloudRes2 = await cloudinary.v2.uploader.upload(
      filesToUpload.inside.path,
      {
        moderation: "aws_rek",
      }
    );

    if (cloudRes2.moderation[0].status === "rejected") {
      FILES.push("NSFW content added");
    }

    FILES.push(cloudRes2.url);
    // console.log(FILES, "both");
    return FILES;
  },
  uploadByFilePath(filesToUpload) {
    // conditionally run the previously named functions
    if (filesToUpload.front && !filesToUpload.inside) {
      return cloudService.uploadFront(filesToUpload);
    } else if (!filesToUpload.front && filesToUpload.inside) {
      return cloudService.uploadInside(filesToUpload);
    } else if (filesToUpload.front && filesToUpload.inside) {
      return cloudService.uploadBoth(filesToUpload);
    } else {
      return [];
    }
  },
};

module.exports = cloudService;
